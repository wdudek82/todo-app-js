
class ToDo {

    constructor() {
        this.listOfTasks = [];
        this.todoList = document.getElementById('todo-list');
    }

    addTask() {
        let inputContent = document.getElementById('add-task');
        let newTask = inputContent.value;

        if (newTask) {
            this.listOfTasks.push([newTask, 0]);
            inputContent.value = '';
            this.listTasks();
        }
    }

    updateTask() {
        // TODO: change buttons to: "save" and "cancel"
        // TODO: change task item to input box with a text of a task
    }

    deleteTask(taskId) {
        let task = this.listOfTasks[taskId];
        console.log(task, taskId);
    }

    listTasks() {

        this.todoList.innerHTML = '';

        for (let [taskIndex, task] of this.listOfTasks.entries()) {
            let newTaskNode = ToDo.createNode(taskIndex, task);
            this.todoList.insertBefore(newTaskNode, this.todoList.firstChild);
        }

        this.consolePrint();
    }

    static createNode(nodeId, nodeContent) {
        let newNode = document.createElement('li');
        let textNode = document.createTextNode(' ' + nodeContent[0]);
        let textColor = nodeContent[1] ? 'blue' : 'red';
        newNode.style.color = textColor;
        newNode.id = nodeId;

        // TODO: add some way to mark tasks as completed
        let isCompleted = document.createElement('input');
        isCompleted.setAttribute('type', 'checkbox');
        isCompleted.setAttribute('id', `taskCheckbox${nodeId}`);
        isCompleted.setAttribute('onClick', `obj.changeStatus(${nodeId})`);
        newNode.appendChild(isCompleted);

        let editButton = ToDo.createButtonNode('edit', `obj.updateTask(${nodeId})`);
        let deleteButton = ToDo.createButtonNode('x', `obj.deleteTask(${nodeId})`);
        editButton.style.color = 'black';
        deleteButton.style.color = 'black';
        newNode.appendChild(editButton);
        newNode.appendChild(deleteButton);

        newNode.appendChild(textNode);

        return newNode;
    }

    static createButtonNode(text, event) {
        let button = document.createElement('button');
        let label = document.createTextNode(text);
        button.appendChild(label);
        button.setAttribute('onClick', event);

        return button;
    }

    changeStatus(taskId) {
        let taskCheckbox = document.getElementById(`taskCheckbox${taskId}`).checked;
        document.getElementById(taskId).style.color = taskCheckbox ? 'green' : 'red';
    }

    consolePrint() {
        console.log(this.listOfTasks);
    }

}


let obj = new ToDo();


// TODO: Future imporovements
// 1. Create Django backend (API) and save todo-list to the database
// 2. generate urls for user to enable logging to his/her lists
