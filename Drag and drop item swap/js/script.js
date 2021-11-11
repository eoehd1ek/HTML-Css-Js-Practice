// reference from "https://www.youtube.com/watch?v=7HUCAYMylCQ"
const boxElements = document.querySelectorAll(".box");

boxElements.forEach((elem) => {
    elem.addEventListener("dragstart", dragStart);
    elem.addEventListener("dragend", dragEnd);
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
});

// Drag and Drop Functions
function dragStart(event) {
    event.target.classList.add("drag-start");
    event.dataTransfer.setData("target", event.target.id);
}

function dragEnd(event) {
    event.target.classList.remove("drag-start");
}

// 선택한 요소 이외 다른 요소 안에 들어가면 기울어지는 효과
function dragEnter(event) {
    if (!event.target.classList.contains("drag-start")) {
        event.target.classList.add("drag-enter");
    }
}

function dragOver(event) {
    event.preventDefault();
}

function dragLeave(event) {
    event.target.classList.remove("drag-enter");
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("drag-enter");

    const draggableElementId = event.dataTransfer.getData("target");
    const droppableElementId = event.target.id;
    if (draggableElementId !== droppableElementId) {
        const draggableElement = document.getElementById(draggableElementId);
        const droppableElement = document.getElementById(droppableElementId);
        // drag 데이터 백업
        const draggableElementByColor = draggableElement.style.color;
        const draggableElementTextContent = draggableElement.querySelector("span").textContent;
        // drag 데이터에 drop 데이터 덮어 쓰기
        draggableElement.style.color = droppableElement.style.color;
        draggableElement.querySelector("span").textContent = droppableElement.querySelector("span").textContent;
        draggableElement.id = droppableElementId;
        // dop 데이터에 백업한 drag 데이터 덮어 쓰기
        droppableElement.style.color = draggableElementByColor;
        droppableElement.querySelector("span").textContent = draggableElementTextContent;
        droppableElement.id = draggableElementId;
    }
}