let myImage = document.querySelector(".start");
let arrayImages = ["01.jpeg", "02.jpeg", "03.jpg", "04.jpg"];

let backgroundOptions = true;
let backgroundInterval;
let backgroundOpt = localStorage.getItem("background-option");
if (backgroundOpt !== null) {
  if (backgroundOpt === "true") {
    backgroundOptions = true;
  } else {
    backgroundOptions = false;
  }
  document.querySelectorAll(".rand span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (backgroundOpt === "true") {
    document.querySelector(".rand .yes").classList.add("active");
  } else {
    document.querySelector(".rand .no").classList.add("active");
  }
}
let appear =document.querySelectorAll(".rand.bullet span")
let bulletAppear = document.querySelector(".nav-bullets");
let localStorageBullet = localStorage.getItem('bullet-opt')
if(localStorageBullet !== null){
  appear.forEach(span=>{
    span.classList.remove("active")
  })
  if(localStorageBullet === 'true'){
          bulletAppear.classList.remove("appear");
          document.querySelector(".cont .rand.bullet .yes").classList.add("active")
    
  }else{
              bulletAppear.classList.add("appear");
              document.querySelector(".cont .rand.bullet .no").classList.add("active");

  }
}
appear.forEach(ele=>{
  ele.addEventListener("click",e=>{
    setActive(e)
    if(e.target.dataset.appear =='yes'){
      bulletAppear.classList.remove("appear")
      localStorage.setItem('bullet-opt','true')
    }else {
      bulletAppear.classList.add("appear")
      localStorage.setItem("bullet-opt", 'false');    
    }
  })
})
function randomImage() {
  if (backgroundOptions === true) {
    backgroundInterval = setInterval(() => {
      let getNumber = Math.floor(Math.random() * arrayImages.length);
      myImage.style.backgroundImage = `url("images/${arrayImages[getNumber]}")`;
    }, 1000);
  }
}

document.querySelector(".toggle .icon").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".sitting-box").classList.toggle("open");
};

let lis = document.querySelectorAll(".color li");
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );
  document.querySelectorAll(".color li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.set === mainColor) {
      ele.classList.add("active");
    }
  });
}
lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.set
    );
        // e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
        //   ele.classList.remove("active");
        // });
        // e.target.classList.add("active");
        setActive(e);
    localStorage.setItem("color-option", e.target.dataset.set);
  });
});

let rand = document.querySelectorAll(".rand span");
rand.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    setActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOptions = true;
      randomImage();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOptions = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillOffest = ourSkills.offsetTop;
  let skillOuter = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScroll = this.pageYOffset;
  if (windowScroll > skillOffest + skillOuter - windowHeight) {
    let our = document.querySelectorAll(".skills .prog .box div span");
    our.forEach((e) => {
      e.style.width = e.dataset.set;
    });
  }
};

let img = document.querySelectorAll(".gallery .cont img")

img.forEach(image => {
  image.addEventListener("click",e=>{
    let pup = document.createElement("div")
    pup.className = "popup-overlay"
    document.body.appendChild(pup)
    let popupBox = document.createElement("div")
    popupBox.className = "popup-box"
    let popupImage = document.createElement("img")
    popupImage.src = image.src
    popupBox.appendChild(popupImage)
    document.body.appendChild(popupBox)
    if(image.alt !== null){
      let head = document.createElement("h3")
      let title = document.createTextNode(image.alt)
      head.appendChild(title)
      popupBox.prepend(head)
      head.style.marginBottom = "10px"
    }
    let closeTag = document.createElement("span")
    closeTag.className = "close-tag"
    let cross = document.createTextNode("X")
    closeTag.appendChild(cross)
    popupBox.appendChild(closeTag)  
  })
})

document.addEventListener("click",e =>{
  if(e.target.className == "close-tag"){
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove()
  }
})

let bullets = document.querySelectorAll(".nav-bullets .bullet");
let links = document.querySelectorAll(".links li");


function scrollInto(element){
element.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
}

  scrollInto(bullets)
  scrollInto(links)

function setActive(ev){
  ev.target.parentElement.querySelectorAll(".active").forEach(e=>{
    e.classList.remove("active")    
  })
  ev.target.classList.add("active")
}

document.querySelector(".sitting-box .reset").onclick = function(){
  localStorage.clear()
  window.location.reload()
}


let menu = document.querySelector(".cont-links button");
let link = document.querySelector(".header .links");
menu.addEventListener("click",function(){
  this.classList.toggle("active")
  link.classList.toggle("open")
    // this.stopPropagation()
  })




