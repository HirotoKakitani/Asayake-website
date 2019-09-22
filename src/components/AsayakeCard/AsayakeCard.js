

class AsayakeCard extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    :host{
      display: flex; 
      justify-content: center;  
    }

    #image-cont{
      position:relative;
      display: inline-block;
      border: 2px solid black;
      margin:4px;
      background: rgb(80, 80, 80);
      border-radius: .5em;
    }
    #image-cont ::slotted(img) {
      width:100%;
      height:auto;
      -webkit-transition: opacity 1s ease-in-out;
      -moz-transition: opacity 1s ease-in-out;
      -o-transition: opacity 1s ease-in-out;
      transition: opacity 1s ease-in-out; 
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
      <slot name="memberName"> No Name</slot>
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
    //creates shadow root
    var shadow = this.attachShadow({mode:'open'});
    shadow.appendChild(template.content.cloneNode(true));

    this.addEventListener("click", ()=>{
      console.log("Card clicked, opening modal");
      this.shadowRoot.querySelector("#info-modal").classList.toggle("inactive");
    });

    this.addEventListener("mouseover", ()=>{

    });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    // 'norm-image','alt-image','mem-name'
    console.log(attrName);
    console.log(oldVal);
    console.log(newVal);
    if (attrName == 'norm-image') {
      var image = document.createElement('img');
      image.src = newVal;
      image.alt = "testing";
      image.slot = "memberImage";
      image.setAttribute("class","top");
      imageWidth = image.width;
      imageHeight = image.height;
      console.log(this.shadowRoot);
      this.appendChild(image);
    }
    
    else if (attrName == 'alt-image'){
      var image2 = document.createElement('img');
      image2.src = newVal;
      image2.alt = "testing2";
      image2.slot = "altImage";
      this.appendChild(image2);    
    }

    else if(attrName == 'mem-name'){
      var name = document.createElement('p');
      name.innerHTML = newVal;
      name.slot = "memberName";
      this.appendChild(name);
    }

  }
}

if (!window.customElements.get('asayake-card')) {
  window.AsayakeCard = AsayakeCard;
  window.customElements.define('asayake-card', AsayakeCard);
}
