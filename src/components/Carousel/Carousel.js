const template = document.createElement('template');
template.innerHTML = 
`
  <style>
  :host{
    position:relative;
    overflow:hidden;
    height:100%;
  }
  #imgCont{
    -position:absolute;
    position: relative;
    padding:0px;
    height:100%;
    -display:flex;
    -display:table;
  }
  ::slotted(.active){
    display:block;
  }
  ::slotted(img){
    display:none;
    height:auto;
    width:100%;
    -margin:0 auto;

    box-sizing: content-box;    
  }

  button{
    position:absolute;
    top:0px;
    z-index:2;
    height:100%;
    opacity:0.4;
    width:30px;    
  }

  button:hover{
    opacity: 0.7;
  }

  #button-cont{
    position:absolute;
    top:0;
  }

  #backButton{
    left:0px;
  }
  #forwardButton{
    right:0px;
  }
</style>
<div id="imgCont">
  <slot>This is a carousel</slot>

</div>
<div id="button-cont">
  <button id="backButton"></button>
  <button id="forwardButton"></button>
</div>

`;
/**
 * TODOs
 * Animated transitions
 * Add blurred background for undersized images
 * buttons in imgCont will make it full size
 */

class Carousel extends HTMLElement {
  constructor() {
    super();  

    //creates shadow root
    var shadow = this.attachShadow({mode:'open'});
    shadow.appendChild(template.content.cloneNode(true));
    
    this.shadowRoot.getElementById("backButton").addEventListener("click", ()=>{
      for(let index=0; index < this.children.length; index++){
        let el = this.children.item(index);
        if (el.className == "active"){
          el.classList.toggle("active");
          if(index == 0){
            this.children[this.children.length-1].classList.toggle("active");
          }
          else{
            this.children[index-1].classList.toggle("active");
          }
          break;
        }
      };
    });

    this.shadowRoot.getElementById("forwardButton").addEventListener("click", ()=>{
      for(let index=0; index < this.children.length; index++){
        let el = this.children.item(index);
        if (el.className == "active"){
          el.classList.toggle("active");
          if(index == this.children.length-1){
            this.children[0].classList.toggle("active");
          }
          else{
            this.children[index+1].classList.toggle("active");
          }
          break;
        }
      };
    });
  }
  getActiveUrl(){
    let active = this.shadowRoot.querySelector("img.active").src;
    console.log("getActiveUrl: ", active);
    return src;
  }
}

if (!window.customElements.get('asayake-carousel')) {
  window.MemberCard = Carousel;
  window.customElements.define('asayake-carousel', Carousel);
}
