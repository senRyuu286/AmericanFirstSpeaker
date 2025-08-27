// Live chat functionality
function initLiveChat() {
    const chatLinks = document.querySelectorAll('a[href="#"]');
    chatLinks.forEach(link => {
        if (link.textContent.includes('Chat with us now')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Live chat feature coming soon! For now, please email us at howdy@americafirstspeakers.com');
            });
        }
    });
}

// Sign in/Sign up functionality
function initAuthButtons() {
    const signInBtn = document.querySelector('.button-signin');
    const signUpBtn = document.querySelector('.button-signup');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            showAuthModal('signin');
        });
    }
    
    if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
            showAuthModal('signup');
        });
    }
}

// Show auth modal
function showAuthModal(type) {
    const modalHtml = `
        <div id="authModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; padding: 40px; border-radius: 8px; max-width: 400px; width: 90%; position: relative;">
                <button onclick="closeAuthModal()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                <h2 style="color: #0C2249; margin-bottom: 20px;">${type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
                <form onsubmit="handleAuthSubmit(event, '${type}')">
                    ${type === 'signup' ? '<div style="margin-bottom: 20px;"><label style="display: block; margin-bottom: 5px; font-weight: 700; color: #0C2249;">Name</label><input type="text" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></div>' : ''}
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 700; color: #0C2249;">Email</label>
                        <input type="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 700; color: #0C2249;">Password</label>
                        <input type="password" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <button type="submit" style="width: 100%; background: #B64A32; color: white; padding: 12px; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 16px;">${type === 'signin' ? 'Sign In' : 'Sign Up'}</button>
                </form>
                <p style="text-align: center; margin-top: 20px; color: #666;">
                    ${type === 'signin' ? "Don't have an account? " : "Already have an account? "}
                    <a href="#" onclick="switchAuthType('${type === 'signin' ? 'signup' : 'signin'}')" style="color: #B64A32; font-weight: 700;">
                        ${type === 'signin' ? 'Sign Up' : 'Sign In'}
                    </a>
                </p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.remove();
    }
}

// Switch auth type
function switchAuthType(type) {
    closeAuthModal();
    showAuthModal(type);
}

// Handle auth submit
function handleAuthSubmit(event, type) {
    event.preventDefault();
    alert(`${type === 'signin' ? 'Sign in' : 'Sign up'} functionality will be implemented soon!`);
    closeAuthModal();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLiveChat();
    initAuthButtons();
});

// Make functions globally available
window.closeAuthModal = closeAuthModal;
window.switchAuthType = switchAuthType;
window.handleAuthSubmit = handleAuthSubmit;