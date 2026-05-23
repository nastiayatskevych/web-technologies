const STORAGE_KEY = "buyListProducts";

const form = document.querySelector(".add-form");
const input = document.querySelector("#product-name");
const productsList = document.querySelector(".products-list");

const notBoughtSummary = document.querySelector("#not-bought-summary");
const boughtSummary = document.querySelector("#bought-summary");

let products = loadProducts();

render();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = input.value.trim();

  if (name === "") {
    input.focus();
    return;
  }

  products.push({
    id: Date.now(),
    name: name,
    amount: 1,
    bought: false
  });

  input.value = "";
  input.focus();

  saveAndRender();
});

function render() {
  productsList.innerHTML = "";
  notBoughtSummary.innerHTML = "";
  boughtSummary.innerHTML = "";

  products.forEach(function (product) {
    productsList.appendChild(createProductRow(product));
    addToSummary(product);
  });
}

function createProductRow(product) {
  const row = document.createElement("div");
  row.classList.add("product-row");

  const name = document.createElement("span");
  name.classList.add("product-name");
  name.textContent = product.name;

  if (product.bought) {
    name.classList.add("bought");
  } else {
    name.addEventListener("click", function () {
      editProductName(product, name);
    });
  }

  const amountControl = document.createElement("div");
  amountControl.classList.add("amount-control");

  if (!product.bought) {
    const minusButton = document.createElement("button");
    minusButton.className = "round-button minus tooltip";
    minusButton.type = "button";
    minusButton.textContent = "-";
    minusButton.dataset.tooltip = "Зменшити кількість";
    minusButton.disabled = product.amount === 1;

    minusButton.addEventListener("click", function () {
      if (product.amount > 1) {
        product.amount--;
        saveAndRender();
      }
    });

    const number = document.createElement("span");
    number.classList.add("number");
    number.textContent = product.amount;

    const plusButton = document.createElement("button");
    plusButton.className = "round-button plus tooltip";
    plusButton.type = "button";
    plusButton.textContent = "+";
    plusButton.dataset.tooltip = "Збільшити кількість";

    plusButton.addEventListener("click", function () {
      product.amount++;
      saveAndRender();
    });

    amountControl.append(minusButton, number, plusButton);
  } else {
    const number = document.createElement("span");
    number.classList.add("number");
    number.textContent = product.amount;
    amountControl.appendChild(number);
  }

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const statusButton = document.createElement("button");
  statusButton.className = "status-button tooltip";
  statusButton.type = "button";

  if (product.bought) {
    statusButton.textContent = "Не куплено";
    statusButton.dataset.tooltip = "Повернути у список";
  } else {
    statusButton.textContent = "Куплено";
    statusButton.dataset.tooltip = "Позначити як куплено";
  }

  statusButton.addEventListener("click", function () {
    product.bought = !product.bought;
    saveAndRender();
  });

  actions.appendChild(statusButton);

  if (!product.bought) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button tooltip";
    deleteButton.type = "button";
    deleteButton.textContent = "x";
    deleteButton.dataset.tooltip = "Видалити товар";

    deleteButton.addEventListener("click", function () {
      products = products.filter(function (item) {
        return item.id !== product.id;
      });

      saveAndRender();
    });

    actions.appendChild(deleteButton);
  }

  row.append(name, amountControl, actions);

  return row;
}

function editProductName(product, nameElement) {
  const editInput = document.createElement("input");
  editInput.classList.add("edit-input");
  editInput.type = "text";
  editInput.value = product.name;

  nameElement.replaceWith(editInput);
  editInput.focus();

  editInput.addEventListener("blur", function () {
    const newName = editInput.value.trim();

    if (newName !== "") {
      product.name = newName;
    }

    saveAndRender();
  });

  editInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      editInput.blur();
    }
  });
}

function addToSummary(product) {
  const item = document.createElement("span");
  item.classList.add("product-item");

  if (product.bought) {
    item.classList.add("bought");
  }

  item.textContent = product.name + " ";

  const amount = document.createElement("span");
  amount.classList.add("amount");
  amount.textContent = product.amount;

  item.appendChild(amount);

  if (product.bought) {
    boughtSummary.appendChild(item);
  } else {
    notBoughtSummary.appendChild(item);
  }
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  render();
}

function loadProducts() {
  const savedProducts = localStorage.getItem(STORAGE_KEY);

  if (savedProducts) {
    return JSON.parse(savedProducts);
  }

  return [
    { id: 1, name: "Помідори", amount: 2, bought: true },
    { id: 2, name: "Печиво", amount: 2, bought: false },
    { id: 3, name: "Сир", amount: 1, bought: false }
  ];
}