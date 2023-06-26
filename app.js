/* -------------------------- selectors -------------------------- */

const addNewItemInput = document.querySelector("#add-list-item-input");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const todoList = document.querySelector("#todo-list");
const itemsCountDisplay = document.querySelector("#items-left-display");
const itemsCount = parseInt(itemsCountDisplay.innerHTML);
const removeButtons = document.querySelectorAll(".remove-item-button");
const addButton = document.querySelector(".add-button");
const completedChecks = document.querySelectorAll(".complete-item-radiobox");
const clearButton = document.querySelector("#clear-completed-items");
const itemCountDisplay = document.getElementById("items-left-display");

/* -------------------------- adding a new item -------------------------- */

const addNewTodoItem = (e) => {
  e.preventDefault();
  const newItem = addNewItemInput.value;

  if (newItem === "") {
    addNewItemInput.placeholder = "No todo added";
  } else {
    let html = "";

    html += `
      <li class="todo-list-item">
        <div class="todo">
          <input type="radio" class="complete-item-radiobox" />
          <span>${newItem}</span>
          <button type="reset" class="remove-item-button"></button>
        </div>
      </li>
    `;

    todoList.innerHTML += html;
    addNewItemInput.value = "";

    updateItemCount();
  }
};

addButton.addEventListener("click", addNewTodoItem);

/* -------------------------- completed -------------------------- */

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("complete-item-radiobox")) {
    const todoDiv = event.target.closest(".todo");
    todoDiv.classList.toggle("completed-item");

    updateItemCount();
  }
});

/* -------------------------- removing an item -------------------------- */

const removeTodoItem = (event) => {
  if (event.target.classList.contains("remove-item-button")) {
    const listItem = event.target.closest(".todo-list-item");
    listItem.remove();
  }

  updateItemCount();
};

todoList.addEventListener("click", removeTodoItem);

/* -------------------------- clear completed -------------------------- */

const clearCompletedTodos = () => {
  const completedItems = document.querySelectorAll(".completed-item");

  completedItems.forEach((item) => {
    item.remove();
  });

  updateItemCount();
};

clearButton.addEventListener("click", clearCompletedTodos);

/* -------------------------- items count -------------------------- */

const updateItemCount = () => {
  const itemCount = document.querySelectorAll(
    ".todo-list-item:not(.completed-item)"
  ).length;
  itemCountDisplay.textContent = itemCount;
};

/* -------------------------- drag and drop -------------------------- */

const sortable = new Sortable(todoList, {
  animation: 150,
  ghostClass: "dragging",
});

sortable.option("onStart", (event) => {
  event.item.classList.add("dragging");
});

sortable.option("onEnd", (event) => {
  event.item.classList.remove("dragging");
});
