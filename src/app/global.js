window.onload = function(){
    let navList = document.getElementById("main-nav");
    let navBarToggle = document.getElementById("navbar-toggle");
    navBarToggle.addEventListener("click",function(){
        navList.classList.toggle("active");
    });
} 