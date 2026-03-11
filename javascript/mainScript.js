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

const iconsList=[];

function openPopups(appId, iconImg){
  document.getElementById(appId).classList.add("open-popup")

  if(!document.getElementById('task-'+appId)){
    const newIcon = document.createElement('button');
    newIcon.className = 'icon active-app';

    newFocus();
    iconsList.push(newIcon);

    newIcon.classList.add('is-focused');
    
  
    newIcon.id = 'task-'+appId;

    const appImg = document.createElement('img')
    appImg.src = iconImg;
    appImg.width=24;

    newIcon.appendChild(appImg);
   
    newIcon.onclick = function(){
    };

    elements.taskbar.appendChild(newIcon);
  }
}

function newFocus()
{
  console.log(iconsList);
  for(const element of iconsList){
    element.classList.remove('is-focused');
  }
}

function closePopups(appId){
  document.getElementById(appId).classList.remove("open-popup");

  const icon = document.getElementById('task-'+appId);
  if(icon){
      icon.remove();
      newFocus(); // This doesnt work because i need to find a way to update whatever the next highest index is - fixing the clicking of icons should hopefully fix this too. 
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