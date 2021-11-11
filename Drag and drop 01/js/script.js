// reference from "https://www.youtube.com/watch?v=7HUCAYMylCQ"
const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    // elem.addEventListener("drag", drag);
    // elem.addEventListener("dragend", dragEnd);
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
});

//Drag and Drop Funcions

function dragStart(event) {
    event.dataTransfer.setData("target", event.target.id);
}

function dragEnter(event) {
    if (!event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
}

function dragLeave(event) {
    event.target.classList.remove("droppable-hover");
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");

    const draggableElementId = event.dataTransfer.getData("target");
    const droppableElementId = event.target.getAttribute("data-draggable-id");
    if (draggableElementId === droppableElementId) {
        event.target.classList.add("dropped");
        const draggableElement = document.getElementById(draggableElementId);
        event.target.style.backgroundColor = draggableElement.style.color;
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        event.target.insertAdjacentHTML("afterBegin", `<i class="fas fa-${draggableElementId}"></i>`);
    }
}