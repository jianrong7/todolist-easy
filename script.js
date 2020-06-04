const listContainer = document.querySelector(".lists");
const listAddBtn = document.querySelector(".addIcon");
const listAddForm = document.querySelector("[data-new-list-form]")
const input = document.getElementById("listAdder");
const closeBtn = document.querySelector(".close");
const listDisplayContainer = document.querySelector(".mainBar");
const tasksContainer = document.querySelector(".tasks");
const taskTemplate = document.getElementById("task-template");
const taskAddBtn = document.querySelector(".addTaskIcon")
const newTaskForm = document.querySelector("#taskAdder");

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
taskAddBtn.addEventListener("click", addList);
newTaskForm.addEventListener("submit", e => {
    e.preventDefault();
    const taskName = newTaskForm.value;
    if (taskName == null || taskName == "") return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task)
    saveAndRender();
})
tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'img') {
        const selectedList = lists.find(list => list.id === selectedListId)
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
    }
})
render();
function render() {
    clearElement(listContainer)
    renderList()

    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none'
    } else {
        listDisplayContainer.style.display = ""
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}
function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('.checkbox')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const todo = taskElement.querySelector('.todo')
        todo.htmlFor = task.id
        todo.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}
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
function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
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