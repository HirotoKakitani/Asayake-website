const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
:host{
  display: flex; 
  justify-content: center;  
}

#image-cont{
  position:relative;
  display: inline-block;
  border: 1px solid black;
  margin:4px;
  background: rgb(80, 80, 80);
  border-radius: .5em;
}
#image-cont ::slotted(img) {
  width:100%;
  height:auto;
  -webkit-transition: opacity 0.3s ease-in-out;
  -moz-transition: opacity 0.3s ease-in-out;
  -o-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out; 
  margin:0;
  border-bottom: 2px solid black;
  border-top-left-radius: .5em;
  border-top-right-radius: .5em;

}

#image-cont  ::slotted(img.top){
  position:absolute;
  z-index:1;
}

#image-cont  ::slotted(img.top:hover){
  opacity : 0;
}

#image-cont ::slotted(span){
  color: white;
  z-index: 1;
  display:block;
  text-align:center;
  width:100%;
}

.inactive{
  opacity: 0;
  visibility: hidden;
  top: -50% !important;
}

#info-modal{
  left: 33%;
  z-index:30;
  position: fixed;
  top: 33%;
  width: 33%;
  box-shadow: 0 3px 7px rgba(0,0,0,.25);
  box-sizing: border-box;
  transition: all .4s ease-in-out;
  -moz-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out
  -o-transition: opacity all .4s ease-in-out;
}

#info-modal-content{
  z-index:999;
  position: fixed;
  background-color: #fff0d6;
  width:33%;
  height: 33%;
  overflow-y: auto;
  padding:2%;
  border-radius: 0.5em; 
}

#info-modal-overlay{
  background-color: #000;
  background: rgba(0,0,0,.8);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20
}

</style>
<div id = "image-cont">
  <slot class="top" name="memberImage">No Image</slot>
  <slot  name="altImage">No Alt Image</slot>
  <slot name="memberName">No Name</slot>
</div>
<div id="info-modal" class="inactive">
  <div id="info-modal-content">
    <slot name="introImage">No images</slot>
    <slot name="introText">No text</slot>
  </div>
  <div id="info-modal-overlay">
  </div>
</div>
`;
window.ShadyCSS &&
window.ShadyCSS.prepareTemplate(template, 'asayake-card');

class AsayakeCard extends HTMLElement {
  constructor() {
    super();
    
    //creates shadow root
    var shadow = this.attachShadow({mode:'open'});
    shadow.appendChild(template.content.cloneNode(true));

    this.addEventListener("click", ()=>{
      this.shadowRoot.querySelector("#info-modal").classList.toggle("inactive");
    });

    this.addEventListener("mouseover", ()=>{

    });
  }
  connectedCallback() {
    // for polyfill
    window.ShadyCSS && window.ShadyCSS.styleElement(this)
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      //this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.shadowRoot.appendChild(
        document.importNode(myElementTemplate.content, true));
    }
  }
}

if (!window.customElements.get('asayake-card')) {
  window.AsayakeCard = AsayakeCard;
  window.customElements.define('asayake-card', AsayakeCard);
}
