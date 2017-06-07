
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
        let isCompleted = nodeContent[1];
        let newNode = document.createElement('li');
        let textNode = document.createTextNode(' ' + nodeContent[0]);
        newNode.style.color = nodeContent[1] ? 'green' : 'red';
        newNode.id = nodeId;

        newNode.appendChild(ToDo.createCheckbox(nodeId, isCompleted));

        // TODO: Add new button to reveal more content
        // TODO: Allow sending properly formated todo-list via mail
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

    static createCheckbox(taskId, status) {
        let isCompleted = document.createElement('input');
        isCompleted.setAttribute('type', 'checkbox');
        isCompleted.setAttribute('id', `taskCheckbox${taskId}`);
        isCompleted.setAttribute('onClick', `ToDo.changeStatus(${taskId})`);
        return isCompleted;
    }

    // TODO: Fix the bug with droping "completed" status if node were added to the queue
    static changeStatus(taskId) {
        let isChecked = this.listOfTasks[taskId][1];
        console.log("Dupa :" + isChecked);
        let taskCheckbox = document.getElementById(`taskCheckbox${taskId}`);
        let textColor = document.getElementById(taskId).style.color;
        if (isChecked) {
            taskCheckbox.checked = false;
            isChecked = 0;
            textColor = 'blue';
        } else {
            taskCheckbox.checked = true;
            isChecked = 1;
            textColor = 'pink';
        }

    }

    consolePrint() {
        console.log(this.listOfTasks);
    }

}


let obj = new ToDo();


// TODO: Future imporovements
// 1. Create Django backend (API) and save todo-list to the database
// 2. generate urls for user to enable logging to his/her lists
