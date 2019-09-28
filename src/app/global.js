window.onload = function(){
    let navList = document.getElementById("main-nav");
    let navBarToggle = document.getElementById("navbar-toggle");
    navBarToggle.addEventListener("click",function(){
        navList.classList.toggle("active");
    });

    setTimeout(showContent, 2500);
} 

function showContent(){
    document.querySelector(".lds-circle").style.display = "none";
    document.querySelector(".page-content").style.display = "block";
    document.querySelector("body").style.backgroundColor = "white";
    //#fff0d6
}

