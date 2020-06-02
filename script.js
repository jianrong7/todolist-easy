const listContainer = document.querySelector(".lists");
const listAddBtn = document.querySelector(".addIcon");
const listAddForm = document.querySelector("[data-new-list-form]")
const input = document.getElementById("listAdder");
const closeBtn = document.querySelector(".close");

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

closeBtn.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
    console.log('hi')
})
listContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender();
        console.log("lol")
    }
})
listAddBtn.addEventListener("click", addList);
listAddForm.addEventListener("submit", e => {
    e.preventDefault();
    addList();
})
renderList();

function addList() {
    const listName = input.value;
    const list = createList(listName)
    lists.push(list)
    saveAndRender();
}
function renderList() {
    clearElement(listContainer)
    lists.forEach(list => {
        const listElement = document.createElement("li")
        listElement.dataset.listId = list.id
        listElement.classList.add("list")
        if (list.id === selectedListId) {
            listElement.classList.add('active-list')
        }
        listElement.innerHTML = list.name

        listContainer.appendChild(listElement)
    })
    input.value = null
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
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}