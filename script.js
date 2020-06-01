const listContainer = document.querySelector(".lists");
const listAddBtn = document.querySelector(".addIcon");
const input = document.getElementById("listAdder");

let lists = [];

function addList() {
    const listName = input.value;
    const list = createList(listName)
    lists.push(list)
    renderList();
}
//<li class="list">Get Started<img src="assets/close.png" class="close"></li>
function renderList() {
    listContainer.innerHTML = "";
    lists.forEach(list => {
        const listElement = document.createElement("li")
        listElement.classList.add("list")
        listElement.innerHTML = list.name + '<img src="assets/close.png" class="close">'
        listContainer.appendChild(listElement)
    })
    input.value = ""
}
function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] }
}
listAddBtn.addEventListener("click", addList);
