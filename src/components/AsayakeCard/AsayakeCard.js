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
  border-top-right-radius:0.5em;
  border-top-left-radius:0.5em;
  -border-radius: .5em;
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
  cursor: pointer;
}

#image-cont ::slotted(span){
  color: white;
  z-index: 1;
  display:block;
  text-align:center;
  width:100%;
}

#info-table{
  padding:0.5em;
  font-size: 0.75em;
  text-align:center;
  color:white;
  background-color:rgba(40, 40, 40, 0.75);
  position: absolute;
  z-index:100;
  top:50%; /* TODO Set to 100% when clicked to show info*/
  visibility:hidden;
  opacity: 0;
  transition-property: top, opacity, visibility;
  transition-duration: 0.5s;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
}

.inactive{
  opacity: 0;
  visibility: hidden;
  top: -50% !important;
}

</style>
<div id = "image-cont">
  <slot class="top" name="memberImage">No Image</slot>
  <slot name="altImage">No Alt Image</slot>
  <slot name="memberName">No Name</slot>
  <table id="info-table">
    <tr>
        <th>Major: </th><td><slot name="major"></slot></td>
    </tr>
    <tr>
        <th>Year: </th><td><slot name="year"></slot></td>
    </tr>
    <tr>
        <th>Favorite Song: </th><td><slot name="favSong"></slot></td>
    </tr>
    <tr>
        <td colspan="2"><slot name="quote"></slot></td>
    </tr>
  </table>
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

    // TODO check this, not actually reading css
    this.shadowRoot.addEventListener("click", () =>{
      let table = this.shadowRoot.getElementById("info-table");
      if (table.style.top == "100%"){
        table.style.top = "50%";
        table.style.opacity = "0";
        table.style.visibility = "hidden";
      }
      else{
        table.style.top = "100%";
        table.style.opacity = "1";
        table.style.visibility = "visible";
      }
    });
  }
}

if (!window.customElements.get('asayake-card')) {
  window.AsayakeCard = AsayakeCard;
  window.customElements.define('asayake-card', AsayakeCard);
}
