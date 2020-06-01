const listContainer = document.querySelector(".lists");
const listAddBtn = document.querySelector(".addIcon");
const listAddForm = document.querySelector("[data-new-list-form]")
const input = document.getElementById("listAdder");
const closeBtns = document.querySelectorAll(".close");

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];


listAddBtn.addEventListener("click", addList);
listAddForm.addEventListener("submit", e => {
    e.preventDefault();
    addList();
})

function addList() {
    const listName = input.value;
    const list = createList(listName)
    lists.push(list)
    saveAndRender();
}
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
function saveAndRender() {
    save();
    renderList();
}
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}