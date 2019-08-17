const template = document.createElement('template');
template.innerHTML = 
`
  <style>
  :host{
    position:relative;
    overflow:hidden;
  }
  #imgCont{
    border: 1px black solid; 
    position:relative;
    margin:0px;
    padding:0px;
    overflow:hidden;

  }
  ::slotted(.active){
    display:block;
  }
  ::slotted(img){
    display:none;
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
  #backButton{
    left:0px;
  }

  #forwardButton{
    right:0px;
  }
</style>
<div id="imgCont">
  <button id="backButton"></button>
  <button id="forwardButton"></button>
  <slot>This is a carousel</slot>
</div>
`;

/**
 * TODOs
 * Animated transitions
 * Entire element expands if image dimentions are different.
 * Add blurred background for undersized images
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
}

if (!window.customElements.get('asayake-carousel')) {
  window.MemberCard = Carousel;
  window.customElements.define('asayake-carousel', Carousel);
}
