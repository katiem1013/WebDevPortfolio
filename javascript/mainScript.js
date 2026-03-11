const elements = {
    about: document.getElementById('about'),
    experience: document.getElementById('experience'),
    education: document.getElementById('education'),
    skills: document.getElementById('skills'),
    toDo: document.getElementById('toDo'),
    music: document.getElementById('musicPlayer'),
    input: document.getElementById('inputBox'),
    listContainer: document.getElementById('list-container'),
};

dragElement(document.getElementById("about"));
dragElement(document.getElementById("experience"));
dragElement(document.getElementById("education"));
dragElement(document.getElementById("skills"));
dragElement(document.getElementById("toDo"));
dragElement(document.getElementById("musicPlayer"));

//popup controls 
function openAbout(){elements.about.classList.add("open-popup");}
function closeAbout(){elements.about.classList.remove("open-popup");}

function openExperience(){elements.experience.classList.add("open-popup");}
function closeExperience(){elements.experience.classList.remove("open-popup");}

function openEducation(){elements.education.classList.add("open-popup");}
function closeEducation(){elements.education.classList.remove("open-popup");}

function openSkills(){elements.skills.classList.add("open-popup");}
function closeSkills(){elements.skills.classList.remove("open-popup");}

function openToDo(){elements.toDo.classList.add("open-popup");}
function closeToDo(){elements.toDo.classList.remove("open-popup");}

function openMusic(){elements.music.classList.add("open-popup");}
function closeMusic(){elements.music.classList.remove("open-popup");}


//draggable windows

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    elmnt.classList.add("dragging");
  }

  function elementDrag(e) {
    e = e || window;
    if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;

    elmnt.classList.remove("dragging");s
  }
}

// brings clicked windows to the front

document.querySelectorAll('.popup').forEach(el => {
  el.addEventListener('click', () => {
        resetIndex();
    el.style.zIndex = "1"
  })
})
function resetIndex() {
  document.querySelectorAll('.popup').forEach(el => {
    el.style.zIndex = "auto"
})} 

// to do list 

function newElement() {
  if(elements.input.value === ''){
        alert("You must write something!");
    }

    else{
        let li = document.createElement("li");
        li.innerHTML = elements.input.value;
        elements.listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    elements.input.value = "";
    saveData()
}

inputBox.addEventListener("keyup", function(e) {
  if (e.key === "Enter") { 
      e.preventDefault();
      newElement();
  }
}, false)

elements.listContainer.addEventListener("click", function(e){
  console.log("You clicked on:", e.target.tagName);
  if(e.target.tagName.toLowerCase() === "li"){
      e.target.classList.toggle("checked");
      saveData()
  }
  else if(e.target.tagName.toLowerCase() === "span"){
      e.target.parentElement.remove();
      saveData()
  }
  
},false)

function saveData(){
    localStorage.setItem("data", elements.listContainer.innerHTML);
}

function loadData(){
    elements.listContainer.innerHTML = localStorage.getItem("data");
}

loadData()