const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasksArr = [];
if(localStorage.getItem('tasks')){
   tasksArr =  JSON.parse(localStorage.getItem('tasks'));
}

tasksArr.forEach(function(task){
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                        </div>
                    </li>`;
                    tasksList.insertAdjacentHTML('beforeend', taskHtml);

});

checkEmptyList();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function deleteTask (event){

    if(event.target.dataset.action !== 'delete'){
        return;
    }

    
        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);
        const index =  tasksArr.findIndex(function(task){
            if(task.id === id){
                return true;
            }
        });

        tasksArr.splice(index, 1);
        saveToLocalStarage();

        parentNode.remove();
        checkEmptyList();
        
    

    
}

function doneTask (event){

    if(event.target.dataset.action !== 'done'){
        return;
    }

    
        const perentNode = event.target.closest('.list-group-item');
        const id = Number(perentNode.id);
        const taskF = tasksArr.find(function(task){
            if(task.id === id){
                return true;
            }
        });

        taskF.done = !taskF.done;
        saveToLocalStarage();
        const taskTittle = perentNode.querySelector('.task-title');
        taskTittle.classList.toggle('task-title--done');
    
}

function addTask (event){
    event.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id : Date.now(),
        text : taskText,
        done : false,
    };

    tasksArr.push(newTask);
    saveToLocalStarage(); 

    const cssClass = newTask.done ? "task-title task-title--done" : "task-title";  

    const taskHtml = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${newTask.text}</span>
                        <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                        </div>
                    </li>`;

      tasksList.insertAdjacentHTML('beforeend', taskHtml);
      
      taskInput.value = '';
      taskInput.focus();
      checkEmptyList();
      
}

function checkEmptyList (){
    if(tasksArr.length === 0){
        const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
                                 <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                                 <div class="empty-list__title">Список дел пуст</div>
                                </li>`;

                                tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
    }

    

    if(tasksArr.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStarage (){
    localStorage.setItem('tasks', JSON.stringify(tasksArr));

}