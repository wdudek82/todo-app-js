
class ToDo {
    constructor() {
        this.listOfTasks = [];
        this.todoList = document.getElementById('todo-list');
    }

    addTask() {
        let task = document.getElementById('add-task');
        let taskContent = task.value;

        if (taskContent) {
            this.listOfTasks.push(taskContent);
            this.redrawList(taskContent);
        }
    }

    redrawList(content) {
        console.log('redrawing...');
        this.todoList.innerHtml = null;

        for (let task of this.listOfTasks) {
            let newTask = document.createElement('li');
            let textNode = document.createTextNode(content);
            newTask.appendChild(textNode);
            newTask.id = this.listOfTasks.indexOf(task);
            this.todoList.appendChild(newTask);

            console.log(task);
        }
    }

}

let obj = new ToDo();