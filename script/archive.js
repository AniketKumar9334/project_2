const inputTodo = document.getElementById("todo-inp");
const priorityOption = document.getElementById("priority");
const addTodoBtn = document.getElementById("addTodo");
let todoList = document.querySelector(".todo-lists");

let archiveTodoArray = JSON.parse(localStorage.getItem("archive")) || [];
let todoArray = JSON.parse(localStorage.getItem("todos")) || [];

const displayTodo = (todos) => {
  console.log(todos);
  todos.map((item) => {
    todoList.innerHTML += `
            <tr>
            <td>${item.name}</td>
            <td class='priority'>${item.priority}</td>
            <td>
                <button onclick='toggleStauts(${item.id})' class="stauts-toggle bg-none">${item.status}</button>
            </td>
            <td>
                <button onclick='restoreTodo(${item.id})' class="white">restore</button>
            </td>
            <td>
                <button onclick='deleteTodo(${item.id})' class="archive red" >delete</button>
            </td>
        </tr>
    `;
  });
};
const priorityColor = () => {
  const prio = document.querySelectorAll(".priority");
  for (let index = 0; index < archiveTodoArray.length; index++) {
    if (prio[index]?.innerHTML === "low") {
      prio[index].style.background = "";
    } else if (prio[index]?.innerHTML === "medium") {
      prio[index].style.background = "yellow";
    } else {
      prio[index].style.background = "red";
    }
  }
};

const deleteTodo = (id) => {
  let deleteTodoItem = archiveTodoArray.filter((i) => i.id === id);
  let index = archiveTodoArray.indexOf(deleteTodoItem[0]);
  archiveTodoArray.splice(index, 1);
  localStorage.setItem("archive", JSON.stringify(archiveTodoArray));
  archiveTodoArray = JSON.parse(localStorage.getItem("archive"));
  todoList.innerHTML = "";
  filterTodosTask(archiveTodoArray);
  priorityColor();
};

const restoreTodo = (id) => {
  let archiveTodoItem = archiveTodoArray.filter((i) => i.id === id);
  todoArray.push(archiveTodoItem[0]);
  let index = archiveTodoArray.indexOf(archiveTodoItem[0]);
  archiveTodoArray.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoArray));
  localStorage.setItem("archive", JSON.stringify(archiveTodoArray));
  archiveTodoArray = JSON.parse(localStorage.getItem("archive"));
  todoList.innerHTML = "";
  filterTodosTask(archiveTodoArray);
  priorityColor();
};

const toggleStauts = (id) => {
  let todo = archiveTodoArray.filter((i) => i.id === id);

  let status = todo[0].status;
  if (status === "Panding🔁") {
    todo[0].status = "Completed✅";
  } else {
    todo[0].status = "Panding🔁";
  }
  let index = archiveTodoArray.indexOf(todo[0]);
  archiveTodoArray.splice(index, 1);
  archiveTodoArray.push(todo[0]);
  localStorage.setItem("archive", JSON.stringify(archiveTodoArray));
  archiveTodoArray = JSON.parse(localStorage.getItem("archive"));
  todoList.innerHTML = "";
  filterTodosTask(archiveTodoArray);
  priorityColor();
};
document.getElementById("priority-filter").addEventListener("change", () => {
  filterTodosTask(archiveTodoArray);
  priorityColor();
});

const filterTodos = (todoArr) => {
  let filterInput = document.getElementById("priority-filter").value;
  let filteredTodos = [];
  if (filterInput === "low") {
    filteredTodos = todoArr.filter((i) => i.priority === "low");
  } else if (filterInput === "medium") {
    filteredTodos = todoArr.filter((i) => i.priority === "medium");
  } else if (filterInput === "high") {
    filteredTodos = todoArr.filter((i) => i.priority === "high");
  } else {
    filteredTodos = todoArr;
  }
  todoList.innerHTML = "";
  displayTodo(filteredTodos);
};
document.getElementById('status-filter').addEventListener('change', ()=>{
  filterTodosTask(archiveTodoArray);
  priorityColor()
})
const filterTodosTask = () => {
  let filterInput = document.getElementById("status-filter").value;
  let filteredTodos = [];
  if (filterInput === "Panding🔁") {
    filteredTodos = archiveTodoArray.filter((i) => i.status === "Panding🔁");
  } else if (filterInput === "Completed✅") {
    filteredTodos = archiveTodoArray.filter((i) => i.status === "Completed✅");
  } else {
    filteredTodos = archiveTodoArray;
  }
  todoList.innerHTML = ''
  filterTodos(filteredTodos)
};
filterTodosTask()
filterTodos(archiveTodoArray);
priorityColor();
