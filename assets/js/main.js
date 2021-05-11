//Init du local Storage
var myStockToDo = localStorage;

//Variables
const btnAdd = document.getElementById("add");
const btnReset = document.getElementById("reset");
const ToDoList = document.getElementById("container");
const ToDoDone = document.getElementById("done");
const ToDoInput = document.getElementById("element");
var count = 0;

//Boucle d'affichage des éléments
(function myLoop(i) {
    setTimeout(function() {     
    count += 1;

    //Création d'un élément
    let toDoElement = document.createElement("div");
    let toDoSuppr = document.createElement("img");
    
    toDoElement.classList.add("draggable");
    toDoElement.id = "draggable" + count;
    toDoElement.draggable = true;
    toDoElement.setAttribute("ondragstart", "onDragStart(event);");
    toDoElement.setAttribute("ondragend", "onDragEnd(event);");
    toDoElement.innerText = myStockToDo.key(i);

    
    toDoSuppr.src = "assets/img/croix.png"
    toDoSuppr.setAttribute("onclick", `supprElement(${toDoElement.id});`);
    //Test du positionnement du ToDo (A faire ou Finis)
    if(myStockToDo.getItem(myStockToDo.key(i)) == "false"){
        ToDoList.appendChild(toDoElement);
        toDoElement.appendChild(toDoSuppr);
    }
    else if (myStockToDo.getItem(myStockToDo.key(i)) == "true"){
        ToDoDone.appendChild(toDoElement);
        toDoElement.style.backgroundColor = 'green';
        toDoElement.appendChild(toDoSuppr);
    }
      
      if (i >=0){
        i--;
        myLoop(i);
      }    //  decrement i and call myLoop again if i > 0
    }, 150)
  })(myStockToDo.length); 




setTimeout(function() {  
           
}, 1000);
//Evénement quand on commence le drag
function onDragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
    event.currentTarget.style.backgroundColor = 'yellow';
}

//Eviter l'annulation du drag (exemple : les divs ne sont pas draggables)
function onDragOver(event) {
    event.preventDefault();

}

//Evénement quand lache le drag
function onDragEnd(event){
    event.currentTarget.style.backgroundColor = '';
}

//Transfert des informations
function onDrop(event) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    dropzone.id == "done" ? dropzone.appendChild(draggableElement): 
    dropzone.id == "container" ? dropzone.appendChild(draggableElement): 
    dropzone.parentNode.insertBefore(draggableElement, dropzone);
    event.dataTransfer.clearData();
}

//Quand un ToDo est fait
function done(event){
    myStockToDo.setItem(event.target.innerText, true);
    event.target.style.backgroundColor = 'green';
}

//Quand un ToDo n'est pas fait
function notDone(event){
    myStockToDo.setItem(event.target.innerText, false);
    event.target.style.backgroundColor = '';
}
const create = () =>{
    if (ToDoInput.value != ""){
        count += 1;
        let toDoElement = document.createElement("div");
        let toDoSuppr = document.createElement("img");

        toDoElement.classList.add("draggable");
        toDoElement.id = "draggable" + count;
        toDoElement.draggable = true;
        toDoElement.setAttribute("ondragstart", "onDragStart(event);");
        toDoElement.setAttribute("ondragend", "onDragEnd(event);");
        toDoElement.innerHTML = ToDoInput.value;
        myStockToDo.setItem(toDoElement.innerText, false);
        ToDoList.appendChild(toDoElement);
        
        toDoSuppr.src = "assets/img/croix.png";
        toDoSuppr.setAttribute("onclick", `supprElement(${toDoElement.id});`);
        toDoElement.appendChild(toDoSuppr);

        ToDoInput.value = "";
    }
}


//Ajout d'un ToDo
btnAdd.addEventListener("click", function(){
    create();
});

ToDoInput.addEventListener('keydown', (e) => {
    e.key == "Enter" ? create() : 0;
});

//reset global
btnReset.addEventListener("click", function(){
    myStockToDo.clear();
});

//Suppression d'un élément
function supprElement(element){
    let select = document.getElementById(element.id);
    select.remove();
    myStockToDo.removeItem(element.innerText);
}