const inputTodo = document.getElementById("todo-inp");
const priorityOption = document.getElementById("priority");
const addTodoBtn = document.getElementById("addTodo");
let todoList = document.querySelector(".todo-lists");

let archiveTodoArray = JSON.parse(localStorage.getItem("archive")) || [];
let todoArray = JSON.parse(localStorage.getItem("todos")) || [];
addTodoBtn.addEventListener("click", (e) => {
  let obj = {};
  const todo = inputTodo.value;
  const priority = priorityOption.value;
  if (todo == "") {
    alert("Filed can't be empty");
    return;
  }
  obj.id = generateSerialNumbers();
  obj.name = todo;
  obj.priority = priority;
  obj.status = "Panding🔁";
  todoArray.push(obj);
  localStorage.setItem("todos", JSON.stringify(todoArray));
  todoArray = JSON.parse(localStorage.getItem("todos"));
  todoList.innerHTML = "";
  displayTodo(todoArray);
  priorityColor()
});

const displayTodo = (todos) => {
  todos.map((item) => {
    todoList.innerHTML += `
            <tr>
            <td>${item.name}</td>
            <td class='priority'>${item.priority}</td>
            <td>
                <button onclick='toggleStauts(${item.id})' class="stauts-toggle">${item.status}</button>
            </td>
            <td>
                <button onclick='archiveTodo(${item.id})' class="archive" >archive</button>
            </td>
        </tr>
    `;
  });
};
const archiveTodo = (id) => {
  let archiveTodoItem = todoArray.filter((i) => i.id === id);
  archiveTodoArray.push(archiveTodoItem[0]);
  let index = todoArray.indexOf(archiveTodoItem[0]);
  todoArray.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoArray));
  localStorage.setItem("archive", JSON.stringify(archiveTodoArray));
  todoArray = JSON.parse(localStorage.getItem("todos"));
  todoList.innerHTML = "";
  displayTodo(todoArray);
  priorityColor()
};

const toggleStauts = (id) => {
  let todo = todoArray.filter((i) => i.id === id);
  
  let status = todo[0].status
  if(status === "Panding🔁"){
    todo[0].status = "Completed✅";
  }else{
    todo[0].status = "Panding🔁";
  }
  let index = todoArray.indexOf(todo[0])
  todoArray.splice(index, 1)
  console.log(index)
  
  todoArray.push(todo[0])
  localStorage.setItem('todos', JSON.stringify(todoArray))
  todoArray = JSON.parse(localStorage.getItem('todos'))
  todoList.innerHTML = ''
  displayTodo(todoArray)
  priorityColor()

};

displayTodo(todoArray);

// generate unice id

function generateSerialNumbers() {
  let length = todoArray.length + archiveTodoArray.length;
  length = length + 1;
  return length;
}
const priorityColor = () =>{
  const prio = document.querySelectorAll(".priority")
for (let index = 0; index < todoArray.length; index++) {
  if(prio[index]?.innerHTML === 'low'){
    prio[index].style.background = ''
  }
  else if(prio[index]?.innerHTML === 'medium'){
    prio[index].style.background = "yellow"
  }else{
    prio[index].style.background = "red"
  }
  
}
}

priorityColor()