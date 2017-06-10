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

    editTask(taskId) {
        // redrawing allows editing one item at a time
        this.displayList();

        let task = document.getElementById('task-item-'+taskId);

        console.log(task);
        for (let child of task.childNodes) {
            if (child.classList.contains('task-edit')) {
                console.log(child);
                child.remove();

                let saveNode = this.createItem('div', {
                    classNames: ['task-save'],
                    attributes: [
                        ['onClick', `todo.saveTask(${taskId})`]
                    ]
                });
                let saveIcon = this.createItem('i', {
                    classNames: ['fa', 'fa-floppy-o'],
                    attributes: [['aria-hidden', 'true']]
                });
                saveNode.appendChild(saveIcon);

                let cancelNode = this.createItem('div', {
                    classNames: ['task-cancel'],
                    attributes: [
                        ['onClick', `todo.cancelEdit('task-item-${taskId}')`]
                    ]
                });
                let cancelIcon = this.createItem('i', {
                    classNames: ['fa', 'fa-ban'],
                    attributes: [['aria-hidden', 'true']],
                });
                cancelNode.appendChild(cancelIcon);

                task.appendChild(saveNode);
                task.appendChild(cancelNode);
            }
        }
    }

    saveTask(taskId) {
        console.log('savind task ' + taskId);
    }

    cancelEdit(taskItemId) {
        console.log('cancelling editing task ' + taskItemId)
    }

    deleteTask(taskId) {
        this.state.list.splice(taskId, 1);
        this.displayList();
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
            let taskIndex = task[0];
            let taskContent = task[1][0];
            let taskCompleted = task[1][1];
            let taskId = 'task-' + taskIndex;

            let taskNode = this.createItem('div', {id: 'task-item-' + taskIndex, classNames: ['task-item']});

            let deleteNode = this.createItem('div', {
                classNames: ['task-delete'],
                attributes: [['onClick', `todo.deleteTask(${taskIndex})`]]
            });
            let deleteIcon = this.createItem('i', {
                classNames: ['fa', 'fa-trash-o'],
                attributes: [['aria-hidden', 'true']]
            });
            deleteNode.appendChild(deleteIcon);

            let contentNode = this.createItem('div', {
                text: taskContent,
                id: taskId,
                classNames: ['task-content']
            });

            let editNode = this.createItem('div', {
                classNames: ['task-edit'],
                attributes: [['onClick', `todo.editTask(${taskIndex})`]]
            });
            let editIcon = this.createItem('i', {
                classNames: ['fa', 'fa-pencil'],
                attributes: [['aria-hidden', 'true']]
            });
            editNode.appendChild(editIcon);

            if (taskCompleted) {
                contentNode.classList.add('completed')
            } else {
                contentNode.classList.remove('completed');
            }

            contentNode.setAttribute('onClick', `todo.taskClicked(${taskIndex})`);

            taskNode.appendChild(deleteNode);
            taskNode.appendChild(contentNode);
            taskNode.appendChild(editNode);

            let list = this.state.uList;
            list.insertBefore(taskNode, list.firstChild);

        }

    }

    createItem(selector, {
        text = null,
        id = null,
        classNames = null,
        attributes = null}) {
        let newNode = document.createElement(selector);

        if (text) {
            let newNodeText = document.createTextNode(text);
            newNode.appendChild(newNodeText);
        }
        if (id) {
            newNode.id = id;
        }
        if (classNames) {
            for (let className of classNames) {
                newNode.classList.add(className);
            }
        }
        if (attributes) {
            for (let [attrName, attrValue] of attributes) {
                newNode.setAttribute(attrName, attrValue);
            }
        }

        return newNode;
    }

    clearList() {
        this.state.uList.innerHTML = null;
    }
}


let todo = new ToDo();
