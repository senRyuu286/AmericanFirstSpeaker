/**
 * America First Speakers - Lightweight JavaScript
 * Handles mobile navigation, scroll effects, and smooth scrolling
 */

(function() {
  'use strict';

  // DOM elements
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  /**
   * Mobile Navigation Toggle
   * Handles opening/closing mobile menu and updating ARIA attributes
   */
  function initMobileNav() {
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded attribute
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle active class on menu
      navMenu.classList.toggle('active');
      
      // Manage focus for accessibility
      if (!isExpanded) {
        // Menu is opening - focus first link
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
          firstLink.focus();
        }
      }
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
      
      if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /**
   * Header Scroll Effect
   * Adds shadow and border to header when scrolled past threshold
   */
  function initScrollEffects() {
    if (!header) return;

    let isScrolled = false;
    const scrollThreshold = 8;

    function updateHeaderState() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const shouldBeScrolled = currentScroll > scrollThreshold;

      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        header.classList.toggle('scrolled', isScrolled);
      }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function() {
          updateHeaderState();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Check initial state
    updateHeaderState();
  }

  /**
   * Smooth Scroll for Anchor Links
   * Handles smooth scrolling to sections with offset for fixed header
   */
  function initSmoothScroll() {
    // Only handle internal anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          event.preventDefault();
          
          // Calculate offset for fixed header
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 16; // 16px extra padding
          
          // Smooth scroll to target
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
          
          // Update active nav link
          updateActiveNavLink(href);
        }
      });
    });
  }

  /**
   * Update Active Navigation Link
   * Updates the active state of navigation links
   */
  function updateActiveNavLink(activeHref) {
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === activeHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Intersection Observer for Navigation
   * Updates active nav link based on which section is in view
   */
  function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -70% 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          updateActiveNavLink('#' + sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

  /**
   * Handle Resize Events
   * Cleanup mobile nav state when switching to desktop
   */
  function initResizeHandler() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        // Close mobile menu if window becomes wide enough
        if (window.innerWidth >= 768 && navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }, 250);
    });
  }

  /**
   * Lazy Loading for Images
   * Simple lazy loading implementation for speaker images
   */
  function initLazyLoading() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      return; // Fallback: images will load normally
    }

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Remove loading attribute to trigger load
          img.removeAttribute('loading');
          
          // Stop observing this image
          imageObserver.unobserve(img);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    initMobileNav();
    initScrollEffects();
    initSmoothScroll();
    initSectionObserver();
    initResizeHandler();
    initLazyLoading();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Prevent FOUC (Flash of Unstyled Content)
  document.documentElement.classList.add('js-loaded');

})();