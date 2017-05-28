
class ToDo {

    constructor() {
        this.listOfTasks = [];
        this.todoList = document.getElementById('todo-list');
    }

    addTask() {
        let inputContent = document.getElementById('add-task');
        let newTask = inputContent.value;

        if (newTask) {
            this.listOfTasks.push(newTask);
            inputContent.value = '';
            this.listTasks();
        }
    }

    updateTask() {}

    deleteTask(taskId) {
        let task = this.listOfTasks[taskId];
        console.log(task, taskId);
    }

    listTasks() {

        this.todoList.innerHTML = '';

        for (let [taskIndex, task] of this.listOfTasks.entries()) {
            let newTaskNode = ToDo.createNode(taskIndex, task);
            this.todoList.appendChild(newTaskNode);
        }

        this.consolePrint();
    }

    static createNode(nodeId, nodeContent) {
        let newNode = document.createElement('li');

        let deleteButton = document.createElement('button');
        let deleteText = document.createTextNode('x');
        deleteButton.appendChild(deleteText);
        deleteButton.setAttribute('onClick', `obj.deleteTask(${nodeId});`);

        newNode.appendChild(deleteButton);

        let textNode = document.createTextNode(" " + nodeContent);
        newNode.appendChild(textNode);

        newNode.id = nodeId;


        return newNode;
    }

    consolePrint() {
        console.log(this.listOfTasks);
    }

}


let obj = new ToDo();