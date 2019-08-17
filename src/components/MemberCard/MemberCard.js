const template = document.createElement('template');
var imageWidth = 0;
var imageHeight = 0;
template.innerHTML = `
  <div id = "imageCont">
    <slot name="memberName"> No Name</slot>
    <slot name="altImage">No Alt Image</slot>
    <slot name="memberImage">No Image</slot>
  </div>
  <!--<h1>${imageWidth} ${imageHeight}</h1>-->
  <style>
    ::slotted(#imageCont){
      position:relative;
      display: block;
    }
    ::slotted(img) {
      position:absolute;
      -left:0;
      -webkit-transition: opacity 1s ease-in-out;
      -moz-transition: opacity 1s ease-in-out;
      -o-transition: opacity 1s ease-in-out;
      transition: opacity 1s ease-in-out; 
    }
    ::slotted(img.top:hover){
      opacity : 0;
    }

    ::slotted(p){
      color: white;
      z-index: 1;
      position: absolute; 
      background: rgb(0, 0, 0); /* fallback color */
      background: rgba(0, 0, 0, 0.7);
    }
  </style>
`;

class MemberCard extends HTMLElement {
  static get observedAttributes() {
    return ['norm-image','alt-image','mem-name'];
  }
  constructor() {
    super();

    //TODO flip the image when hovering over 
    this.addEventListener('mouseover',function flipImage(){
      console.log('Image Flip!');
    });
    //TODO show modal info window when clicked
    this.addEventListener('click',function showInfo(){
      console.log('Showing info!');
    });

    //creates shadow root
    var shadow = this.attachShadow({mode:'open'});
    shadow.appendChild(template.content.cloneNode(true));
  }
  /*
  connectedCallback() {
    this.textContent = ':wave:';
  }

  disconnectedCallback() {};
  */
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

if (!window.customElements.get('member-card')) {
  window.MemberCard = MemberCard;
  window.customElements.define('member-card', MemberCard);
}
