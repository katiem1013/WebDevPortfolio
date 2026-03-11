const elements = {
  // popups
  about: document.getElementById('about'),
  experience: document.getElementById('experience'),
  education: document.getElementById('education'),
  skills: document.getElementById('skills'),
  toDo: document.getElementById('toDo'),
  music: document.getElementById('musicPlayer'),

  // to do list
  input: document.getElementById('inputBox'),
  listContainer: document.getElementById('list-container'),

  // taskbar 
  taskbar: document.getElementById('taskbar-icons'),
  time: document.getElementById('currentTime'),
};

dragElement(document.getElementById("about"));
dragElement(document.getElementById("experience"));
dragElement(document.getElementById("education"));
dragElement(document.getElementById("skills"));
dragElement(document.getElementById("toDo"));
dragElement(document.getElementById("musicPlayer"));

function getTopElementByClass(className) {
  const popups = document.querySelectorAll(`.${className}`);
    let highest = null;
    let maxZ = -1;

    popups.forEach(el => {
        // Use parseInt to handle "auto" (becomes NaN) and provide a fallback of 0
        const z = parseInt(window.getComputedStyle(el).zIndex, 10) || 0;
        if (z > maxZ) {
            maxZ = z;
            highest = el;
        }
    });
    return highest;
}


const iconsList=[];
let highestZ = 10;

function openPopups(appId, iconImg){
  const popup = document.getElementById(appId);
  popup.classList.add("open-popup");
  resetIndex();
  popup.style.zIndex = "1";


  if(!document.getElementById('task-'+appId)){
    const newIcon = document.createElement('button');
    newIcon.className = 'icon active-app';

    newIcon.id = 'task-'+appId;
   

    const appImg = document.createElement('img')
    appImg.src = iconImg;
    appImg.width=24;

    newIcon.appendChild(appImg);
    elements.taskbar.appendChild(newIcon);

    iconsList.push(newIcon); 

    updateFocus();
    

    newIcon.onclick = function() {
    highestZ++;
    popup.style.zIndex = highestZ;

    popup.classList.add("open-popup");
    updateFocus();
  };
  }

  
}

function newFocus()
{
  const allIcons = document.querySelectorAll('.icon');
  allIcons.forEach(icon => icon.classList.remove('is-focused'));
}

function updateFocus()
{

  const topRef = getTopElementByClass('popup');
    
    // Clear all existing focus first
    newFocus();

    if (topRef && topRef.id) {
        const iconId = 'task-' + topRef.id;
        const iconElement = document.getElementById(iconId); 
        
        if (iconElement) {
            iconElement.classList.add('is-focused');
        } else {
            console.warn(`Focus failed: No icon found with ID ${iconId}`);
        }
    }
}

function closePopups(appId){
   const popup = document.getElementById(appId);
  popup.classList.remove("open-popup");
  
  // Reset its z-index so it doesn't "win" while hidden
  popup.style.zIndex = "0";

  const icon = document.getElementById('task-' + appId);
  if (icon) {
    // Remove it from your tracking array
    const index = iconsList.indexOf(icon);
    if (index > -1) iconsList.splice(index, 1);
    
    icon.remove();
    
    // Clear all focus and recalculate who is the new "Top"
    newFocus();
    updateFocus(); 
  }
}

//draggable windows

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }

    // get cursor pos
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    
    document.onmousemove = elementDrag;

    elmnt.classList.add("dragging");
  }

  function elementDrag(e) {
    e = e || window;
    if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    elmnt.classList.remove("dragging");
  }
}

// brings clicked windows to the front

document.querySelectorAll('.popup').forEach(el => {
  el.addEventListener('mousedown', () => { 
    highestZ++; 
    el.style.zIndex = highestZ;
    updateFocus();
  });
});

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


// taskbar 

function setTime(){
    const d = new Date();
    const formatter = new Intl.DateTimeFormat([], {
        hour: '2-digit', 
        minute: '2-digit',
    });

    const parts = formatter.formatToParts(d);

    elements.time.innerHTML = parts.map(({type, value}) => {
        return value;
    }).join('');
};

setInterval(setTime, 1000);




