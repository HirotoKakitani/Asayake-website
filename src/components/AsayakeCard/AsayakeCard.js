

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
    }
    ::slotted(img) {
      -width:20vw;
      width:100%;
      height:auto;
      -webkit-transition: opacity 1s ease-in-out;
      -moz-transition: opacity 1s ease-in-out;
      -o-transition: opacity 1s ease-in-out;
      transition: opacity 1s ease-in-out; 
      margin:0;
      border-bottom: 2px solid black;

    }

    ::slotted(img.top){
      position:absolute;
      -left:0;
      z-index:1;
    }

    ::slotted(img.top:hover){
      opacity : 0;
    }
    
    ::slotted(span){
      color: white;
      z-index: 1;
      display:block;
      text-align:center;
      width:100%;
    }

    </style>
      <div id = "image-cont">
        <slot class="top" name="memberImage">No Image</slot>
        <slot  name="altImage">No Alt Image</slot>
        <slot name="memberName"> No Name</slot>
      </div>
     
    `;
    //creates shadow root
    var shadow = this.attachShadow({mode:'open'});
    shadow.appendChild(template.content.cloneNode(true));
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

//export default MemberCard;

if (!window.customElements.get('asayake-card')) {
  window.AsayakeCard = AsayakeCard;
  window.customElements.define('asayake-card', AsayakeCard);
}
