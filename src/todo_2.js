class ToDo {

    constructor() {
        this.state = {
            list: [],
            uList: document.getElementById('todo-list')
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


            let newNode = document.createElement('div');
            let textNode = document.createTextNode(taskContent);

            newNode.classList.add('task');
            if (taskCompleted) {
                newNode.classList.add('completed')
            } else {
                newNode.classList.remove('completed');
            }

            newNode.id = 'task-' + taskIndex;
            newNode.setAttribute('onClick', `todo.taskClicked(${taskIndex})`);
            newNode.appendChild(textNode);

            let ol = this.state.uList;
            ol.insertBefore(newNode, ol.firstChild);

        }

    }

    clearList() {
        this.state.uList.innerHTML = null;
    }
}


let todo = new ToDo();
