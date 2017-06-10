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
        let taskContent = inputField.value;

        this.state.list[taskId].content = taskContent;
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
        if (event.keyCode === 13) {
            console.log(action);
            if (action === 'add') {
                this.addTask();
            } else if (action === 'save') {
                console.log(itemId);
                this.saveTask(itemId);
            }
        }
    }

    displayList() {
        this.clearList();

        let listOfTasks = this.state.list;

        for (let task of listOfTasks.entries()) {
            let taskIndex = task[0];
            let taskContent = task[1].content;
            let taskCompleted = task[1].done;

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
