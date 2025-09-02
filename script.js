document.addEventListener("DOMContentLoaded", function(event){
    var navmobilejs = document.getElementsByClassName("nav-burger");
    var navmobilejscontent = document.getElementsByClassName("nav-mobile-nav");
    var medwidthtablet = window.matchMedia("(max-width: 770px)");
    var medwidthcp = window.matchMedia("(max-width: 670px)");


    
    navmobilejs[0].addEventListener("click", function() {
        if (navmobilejscontent[0].style.maxHeight) {
            navmobilejscontent[0].style.maxHeight = null;
            navmobilejscontent[0].style.padding = "0px";
        } else {
             if (medwidthcp.matches) {
                navmobilejscontent[0].style.padding = "0px";
                navmobilejscontent[0].style.maxHeight = navmobilejscontent[0].scrollHeight + "px";
                navmobilejscontent[0].style.flexDirection = "column";
                navmobilejscontent[0].style.width = "30vw";
            } else if (medwidthtablet.matches) {
                navmobilejscontent[0].style.maxHeight = navmobilejscontent[0].scrollHeight + "px";
                navmobilejscontent[0].style.padding = "20px 30px 20px 30px";
                navmobilejscontent[0].style.flexDirection = "row";
                navmobilejscontent[0].style.width = "50vw";
            }
        }
    });
});                     