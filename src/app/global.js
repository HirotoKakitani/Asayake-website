window.addEventListener("load", function(){
    let navList = document.getElementById("main-nav");
    let navBarToggle = document.getElementById("navbar-toggle");
    navBarToggle.addEventListener("click",function(){
        navList.classList.toggle("active");
    });

    setTimeout(showContent, 2500);
});

function showContent(){
    document.querySelector(".lds-circle").style.display = "none";
    document.querySelector(".page-content").style.display = "flex";
    document.querySelector(".page-content").style["flex-direction"] = "column";
    document.querySelector("body").style.backgroundColor = "#dedede";
    /*
    if(window.location.pathname == '/src/gallery.html'){
        let images = document.querySelectorAll("#grid > img");
    
        images.forEach(img => {
            console.log(img.src);
        });      
    }
    */
    //#fff0d6
}

