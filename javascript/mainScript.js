const elements = {
    about: document.getElementById('about'),
    experience: document.getElementById('experience'),
    education: document.getElementById('education'),
};

dragElement(document.getElementById("about"));
dragElement(document.getElementById("experience"));
dragElement(document.getElementById("education"));

//popup controls 
function openAbout(){
    elements.about.classList.add("open-popup");
}

function closeAbout(){
    elements.about.classList.remove("open-popup");
}

function openExperience(){
    elements.experience.classList.add("open-popup");
}

function closeExperience(){
    elements.experience.classList.remove("open-popup");
}

function openEducation(){
    elements.education.classList.add("open-popup");
}

function closeEducation(){
    elements.education.classList.remove("open-popup");
}

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
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    elmnt.classList.add("dragging");
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
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