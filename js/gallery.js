window.addEventListener("load",galleryLoadHandler);
function galleryLoadHandler(){
   /* document.getElementById("image-exit").addEventListener("click", function(){
        document.getElementById("modal-background").style.display="none";
    });
    */
   // only show modal when screen is large
   if (window.innerWidth > 950){
    let modalBackground = document.getElementById("modal-background");
    // toggle modal backgrounds
    modalBackground.addEventListener("click", function(){
         document.getElementById("modal-background").style="none";
         modalBackground.innerHTML='';
    });
     let images = document.querySelectorAll("#grid > img");
     console.log(images);
     images.forEach(img => {
         img.addEventListener("click", function(){
             console.log(this.src);
             modalBackground.style.display="block";
             let newImage = document.createElement("img");
             newImage.setAttribute("src", this.src);
             newImage.setAttribute("class", "large-image");
             modalBackground.appendChild(newImage);
         });
     }); 
   }
}