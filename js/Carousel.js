/**
 * TODOs
 * Animated transitions
 * Add blurred background for undersized images
 * buttons in imgCont will make it full size
 */
const template = document.createElement('template');
    template.innerHTML = /*html*/`
      <style>
      :host{
        overflow:hidden;
        height:100%;
      }
      #imgCont{
        position: relative;
        padding:0px;
        height:40vh;
      }
      #background{
        position:absolute;
        width:100%;
        height:100%;
        background-color:black;
        background-image:url("res/photos/carousel_12.jpg");
        background-size:cover;
        filter:grayscale(100%) blur(5px);
      }
      #imgCont ::slotted(.active){
          opacity:1;
      }
      #imgCont ::slotted(img){
        z-index: 1;
        opacity:0;
        position: absolute;
        max-height:100%;
        transition: opacity 1s ease-in-out;
        -webkit-transition: opacity 1s ease-in-out;
        -moz-transition: opacity 1s ease-in-out;
        -o-transition: opacity 1s ease-in-out;
        box-sizing: content-box;  
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 8px 8px black inset;
        box-sizing: border-box;


      }
      @media screen and (min-width: 768px) {
        #imgCont{
          height:80vh;
        }
      }
    </style>
    <div id="imgCont">
      <div id="background"></div>
      <slot>This is a carousel</slot>
    </div>
    `;

window.ShadyCSS &&
window.ShadyCSS.prepareTemplate(template, 'asayake-carousel');
// polyfill cant handle ::slotted() by itself, needs to be a child of an element
class Carousel extends HTMLElement {
  constructor() {
    super();  
    //creates shadow root
    var shadow = this.attachShadow({mode:'open'});
    shadow.appendChild(template.content.cloneNode(true));
    
    //repeatedly calls changeImage every 7 secs
    setInterval(()=>{this.changeImage()}, 4000);
  }
  changeImage(){
    for(let index=0; index < this.children.length; index++){
      let el = this.children.item(index);
      if (el.className == "active"){
        el.classList.toggle("active");
        //console.log(this.shadowRoot.querySelector("#imgCont").style);
        let newActive;
        if(index == this.children.length-1){
          newActive = this.children[0];
        }
        else{
          newActive = this.children[index+1];
        }
        newActive.classList.toggle("active");
        console.log(newActive.src);
        //window.getComputedStyle(this.shadowRoot.querySelector("#imgCont")).backgroundImage = `url(${newActive.src})`;
        break;
      }
    }
  }

  getActiveUrl(){
    let active = window.getComputedStyle(this.shadowRoot.querySelector(".active"));
    console.log("getActiveUrl: ", active);
    return src;
  }
  
  connectedCallback() {
    // Let's give the polyfill a leg-up
    window.ShadyCSS && window.ShadyCSS.styleElement(this)
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }
}

if (!window.customElements.get('asayake-carousel')) {
  window.MemberCard = Carousel;
  window.customElements.define('asayake-carousel', Carousel);
}
