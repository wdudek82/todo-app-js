class ToDo {

    constructor() {
        this.state = {
            list: [],
            orderedList: document.getElementById('todo-list')
        }
    }

    addTask() {
        let inputField = document.getElementById('add-task');
        let inputContent = inputField.value;

        if (inputContent) {
            this.state.list.push([inputContent, 0]);
            inputField.value = null;

            this.displayList();
        }

    }

    taskClicked(taskId) {
        // Changes 1 to 0 and vice versa
        this.state.list[taskId][1] = 1 - this.state.list[taskId][1];

        todo.displayList();
    }

    isEnter() {
        if (event.keyCode === 13) {
            this.addTask();
        }
    }

    displayList() {
        this.clearList();

        let listOfTasks = this.state.list;

        for (let task of listOfTasks.entries()) {
            console.log(task);

            let taskIndex = task[0];
            let taskContent = task[1][0];
            let taskCompleted = task[1][1];


            let newNode = document.createElement('li');
            let textNode = document.createTextNode(taskContent);

            newNode.setAttribute('onClick', `todo.taskClicked(${taskIndex})`);

            newNode.style.color = taskCompleted === 1 ? 'green' : 'red';

            newNode.id = 'task-' + taskIndex;
            newNode.appendChild(textNode);

            let ol = this.state.orderedList;
            ol.insertBefore(newNode, ol.firstChild);

            // this.state.orderedList.appendChild(newNode);

        }

    }

    clearList() {
        this.state.orderedList.innerHTML = null;
    }
}


let todo = new ToDo();
