const listContainer = document.querySelector(".lists");
const listAddBtn = document.querySelector(".addIcon");
const listAddForm = document.querySelector("[data-new-list-form]")
const input = document.getElementById("listAdder");
const closeBtns = document.querySelectorAll(".close");

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", e => {
        lists = lists.filter(list => list.id !== selectedListId)
        selectedListId = null
        saveAndRender();
        console.log("hi")
    })
})
// listContainer.addEventListener("click", e => {
//     if (e.target.tagName.towLowerCase() === 'li') {
//         selectedListId = e.target.dataset.selectedListId
//         saveAndRender();
//     }
// })
listAddBtn.addEventListener("click", addList);
listAddForm.addEventListener("submit", e => {
    e.preventDefault();
    addList();
})

renderList();
function deleteList() {

}
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
        if (list.id === selectedListId) {
            listElementclassList.add('active-list')
        }
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