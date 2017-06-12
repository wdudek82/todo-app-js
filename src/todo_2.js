class ToDo {

    constructor() {
        this.state = {
            list: [],
            uList: document.getElementById('todo-list'),
            filter: -1  // filters: -1 -> all, 0 -> incomplete; 1 -> completed
        }
    }

    filterTasks(num) {
        this.state.filter = num;

        for (let i = -1; i < 2; i++) {
            let item = document.getElementById(`filter${i}`);

            if (i === num) {
                item.classList.add('filter-active');
            } else {
                item.classList.remove('filter-active');
            }
        }
        this.displayList();
    }

    countTasks() {
        let status = document.getElementById('tasks-count');
        let taskList = this.state.list;
        let taskCompleted = taskList.filter(x => x.done === 1);
        let tasksLeft = taskList.length - taskCompleted.length;

        let msg = '';
        if (taskList.length === 0) {
            msg = 'The list is empty';
        } else if (tasksLeft > 0) {
            msg = `${tasksLeft}/${taskList.length} items left`;
        } else {
            msg = 'Done!';
        }

        status.innerText = msg;
    }

    addTask() {
        let inputField = document.getElementById('add-task');
        let inputContent = inputField.value;

        if (inputContent) {
            this.state.list.push({
                content: inputContent,
                done: 0,
                edited: 0,
            });
            inputField.value = null;

            this.displayList();
        }
    }

    editTask(taskId) {
        this.toggleClicked(taskId, 'edited');
    }

    saveTask(taskId) {
        let task = document.getElementById('task'+taskId);
        let inputField = task.childNodes[0];

        this.state.list[taskId].content = inputField.value;
        this.state.list[taskId].edited = 0;
        this.displayList();
    }

    cancelEdit(taskId) {
        let isEdited = this.state.list[taskId].edited;
        this.toggleClicked(taskId, isEdited);
        this.displayList();
    }

    deleteTask(taskId) {
        this.state.list.splice(taskId, 1);
        this.displayList();
    }

    toggleClicked(taskId, mapKey) {
        // Changes selected key' value 1 to 0 and vice versa
        this.state.list[taskId][mapKey] = 1 - this.state.list[taskId][mapKey];

        todo.displayList();
    }

    isEnter(action, {itemId = null}) {
        let keyPressed = event.keyCode;
        let active = document.activeElement;
        if (keyPressed === 13) {
            if (action === 'add') {
                this.addTask();
            } else if (action === 'save') {
                this.saveTask(itemId);
            }
        } else if (keyPressed === 27 && active.nodeName === 'INPUT') {
            // TODO: Fix canceling ediding task by pressing esc button
            let itemId = active.id.replace('task-field-', '');
            this.cancelEdit(itemId);
        }
    }

    displayList() {
        this.clearList();
        this.countTasks();

        let listOfTasks = this.state.list;
        let filter = this.state.filter;

        for (let task of listOfTasks.entries()) {
            let taskIndex = task[0];
            let taskContent = task[1].content;
            let taskCompleted = task[1].done;

            if (filter !== -1 && filter !== taskCompleted) {
                continue;
            }

            let taskNode = this.createItem('div', {
                id: 'task-item-' + taskIndex,
                classNames: ['task-item']
            });

            let deleteNode = this.createItem('div', {
                classNames: ['task-delete'],
                attributes: [['onClick', `todo.deleteTask(${taskIndex})`]]
            });
            let deleteIcon = this.createItem('i', {
                classNames: ['fa', 'fa-trash-o'],
                attributes: [['aria-hidden', 'true']]
            });
            deleteNode.appendChild(deleteIcon);

            let edited = this.state.list[taskIndex].edited;
            let contentNode = this.createItem('div', {
                text: taskContent,
                id: 'task' + taskIndex,
                classNames: ['task-content']
            });

            if (!edited) {
                contentNode.setAttribute('onClick', `todo.toggleClicked(${taskIndex}, 'done')`);
            } else {
                contentNode.classList.add('edited');
                contentNode.innerText = null;

                let inputField = document.createElement('input');
                inputField.id = 'task-field-' + taskIndex;
                inputField.type = 'text';
                inputField.value = taskContent;
                inputField.size = taskContent.length * 1.01;
                inputField.setAttribute('onkeydown', `todo.isEnter('save', {itemId: ${taskIndex}})`);
                contentNode.appendChild(inputField);
            }

            if (taskCompleted) {
                contentNode.classList.add('completed');
            } else {
                contentNode.classList.remove('completed');
            }

            taskNode.appendChild(deleteNode);
            taskNode.appendChild(contentNode);

            for (let button of this.createEdit(taskIndex)) {
                taskNode.appendChild(button);
            }


            let list = this.state.uList;
            list.insertBefore(taskNode, list.firstChild);
        }
    }

    createEdit(taskId) {
        let edited = this.state.list[taskId].edited;
        let buttons = [];

        if(!edited) {
            let editNode = document.createElement('div');
            editNode.classList.add('task-edit');
            editNode.setAttribute('onClick', `todo.editTask(${taskId})`);

            let editIcon = document.createElement('i');
            editIcon.classList.add('fa');
            editIcon.classList.add('fa-pencil');
            editIcon.setAttribute('aria-hidden', 'true');

            editNode.appendChild(editIcon);

            buttons.push(editNode);
        } else {
            let saveNode = document.createElement('div');
            saveNode.classList.add('task-save');
            saveNode.setAttribute('onClick', `todo.saveTask(${taskId})`);

            let saveIcon = document.createElement('i');
            saveIcon.classList.add('fa');
            saveIcon.classList.add('fa-floppy-o');
            saveIcon.setAttribute('aria-hidden', 'true');

            saveNode.appendChild(saveIcon);

            let cancelNode = this.createItem('div', {
                classNames: ['task-cancel'],
                attributes: [
                    ['onClick', `todo.toggleClicked(${taskId}, 'edited')`]
                ]
            });
            let cancelIcon = this.createItem('i', {
                classNames: ['fa', 'fa-ban'],
                attributes: [['aria-hidden', 'true']],
            });
            cancelNode.appendChild(cancelIcon);

            buttons.push(saveNode, cancelNode);
        }

        return buttons;
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

// TODO: make the app responsive
// TODO: change bin icon to checkbox - now it's too easy to delete items by mistake