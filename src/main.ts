import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = document.querySelector(".todoInput") as HTMLInputElement;

const myForm = document.querySelector("#myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.floor(Math.random() * 1000)),
  };
  todos.push(todo);

  todoInput.value = "";
  renderTodos(todos);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);

  todos.splice(idx, 1);
  renderTodos(todos);
};

const renderTodos = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo";

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "isCompleted";
    checkbox.checked = item.isCompleted;
    checkbox.onchange = () => {
      todos.find((itm) => {
        if (itm.id === item.id) {
          item.isCompleted = checkbox.checked;
        }
      });
      paragraph.className = checkbox.checked ? "textCut" : "";
    };

    const paragraph: HTMLParagraphElement = document.createElement("p");
    paragraph.innerText = item.title;
    paragraph.className = item.isCompleted ? "textCut" : "";
    const btn: HTMLButtonElement = document.createElement("button");

    btn.innerText = "X";
    btn.className = "deleteBtn";
    btn.onclick = () => {
      deleteTodo(item.id);
    };

    todoItem.append(checkbox, paragraph, btn);
    todoContainer.appendChild(todoItem);
  });
};
