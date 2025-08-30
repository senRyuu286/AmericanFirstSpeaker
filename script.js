document.addEventListener("DOMContentLoaded", function(event){
    var navmobilejs = document.getElementsByClassName("nav-burger");
    var navmobilejscontent = document.getElementsByClassName("nav-mobile-nav");
    var headernav = document.getElementsByClassName("header-nav");
    
    navmobilejs[0].addEventListener("click", function() {
        if (navmobilejscontent[0].style.maxHeight) {
            navmobilejscontent[0].style.maxHeight = null;
            navmobilejscontent[0].style.padding = "0px";
        } else {
            navmobilejscontent[0].style.maxHeight = navmobilejscontent[0].scrollHeight + "px";
            navmobilejscontent[0].style.padding = "10px 15px 10px 15px";
        }
    });
});