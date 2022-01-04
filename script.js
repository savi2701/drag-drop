"use strict";

const addItemModal = document.getElementById("addItemModal");
let  key=0;

getCards(0);

function addItem(id){
    let parentList = document.getElementById(id);
    let parentForm = parentList.querySelector(".add-item");
    let itemHeading = parentForm.querySelector("#item-heading").value;
    let itemDescription = parentForm.querySelector("#item-description").value;
    var itemPriority = parentForm.querySelectorAll('input[type="radio"]');
    var itemPriorityValue;
    for (var i = 0; i < itemPriority.length; i++) {
        if (itemPriority[i].type === 'radio' && itemPriority[i].checked) {
            itemPriorityValue = itemPriority[i].value;       
        }
    }
    let cardObj = {
        id: id,
        heading : itemHeading,
        desc: itemDescription,
        priority: itemPriorityValue
    }

    localStorage.setItem(++key,JSON.stringify(cardObj));

    getCards(key-1);

    parentForm.reset();
}

function openAddItemModal(id){
    let modalToOpen = document.getElementById(id);
    if(modalToOpen.style.display === "none"){
        modalToOpen.style.display = "block";
    }
    else{
        modalToOpen.style.display = "none";
    }
}



const draggables = document.querySelectorAll(".card");
const dragContainers = document.querySelectorAll(".col__list");
let draggableCard = null;

draggables.forEach((draggable)=>{
    draggable.addEventListener("dragstart",  dragStart);
    draggable.addEventListener("dragend", dragEnd);
});

function dragStart(){
    draggableCard = this;
}
function dragEnd(){
    draggableCard = null;
}

dragContainers.forEach((dragContainer)=>{
    dragContainer.addEventListener("dragover",dragOver);
    dragContainer.addEventListener("dragenter",dragEnter);
    dragContainer.addEventListener("dragleave",dragLeave);
    dragContainer.addEventListener("drop",dragDrop);
});

function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(){
}
function dragDrop(){
    console.log(draggableCard);
    this.appendChild(draggableCard);
}


function getCards(num){
    console.log(num);
    let j;
    for(j=num;j<localStorage.length;j++){
        let tempCardObj= JSON.parse(localStorage.getItem(j+1));
        console.log(tempCardObj);
        const card_div  = document.createElement("div");
        card_div.classList.add("card");
        card_div.setAttribute("draggable","true");
    
        const badge = document.createElement("div");
        const badge_txt = document.createTextNode(tempCardObj.priority);
        badge.appendChild(badge_txt);
        badge.classList.add("card__badge");
        badge.classList.add("card__badge--"+tempCardObj.priority);
        card_div.appendChild(badge);
    
    
        const h5 = document.createElement("h5");
        const h5_txt = document.createTextNode(tempCardObj.heading);
        h5.appendChild(h5_txt);
        card_div.appendChild(h5);
    
        const p = document.createElement("p");
        const p_txt = document.createTextNode(tempCardObj.desc);
        p.appendChild(p_txt);
        card_div.appendChild(p);

        let parentList = document.getElementById(tempCardObj.id);
        let parentCardList  = parentList.querySelector(".col__list");
        parentCardList.appendChild(card_div);

        card_div.addEventListener("dragstart",  dragStart);
        card_div.addEventListener("dragend", dragEnd);
    }
    key = j;
}

function clearAll(){
    localStorage.clear();
}