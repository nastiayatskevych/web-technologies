const API = "https://jsonplaceholder.typicode.com";

// Основні елементи сторінки
const usersContainer = document.querySelector("#users");
const statusEl = document.querySelector("#status");

// Завантаження списку користувачів при відкритті сторінки
async function loadUsers() {
  try {
    const response = await fetch(`${API}/users`);

     // Перевірка HTTP-статусу відповіді
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const users = await response.json();
    renderUsers(users);
    statusEl.textContent = "";
  } catch (error) {
    statusEl.textContent = "Не вдалося завантажити користувачів";
    console.error(error);
  }
}

// Відображення всіх користувачів
function renderUsers(users) {
  usersContainer.textContent = "";

  users.forEach((user) => {
    const card = createUserCard(user);
    usersContainer.appendChild(card);
  });
}

// Створення картки одного користувача
function createUserCard(user) {
  const card = document.createElement("article");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = user.name;

  const email = document.createElement("p");
  email.classList.add("meta");
  email.textContent = `Email: ${user.email}`;

  const city = document.createElement("p");
  city.classList.add("meta");
  city.textContent = `Місто: ${user.address.city}`;

  const company = document.createElement("p");
  company.classList.add("meta");
  company.textContent = `Компанія: ${user.company.name}`;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Завантажити пости";

  // Контейнер для постів користувача
  const postsContainer = document.createElement("div");
  postsContainer.classList.add("posts");

  // Повідомлення про помилки
  const error = document.createElement("p");
  error.classList.add("error");

  // Завантаження постів по кліку
  button.addEventListener("click", () => {
    loadPosts(user.id, button, postsContainer, error);
  });

  card.append(title, email, city, company, button, error, postsContainer);

  return card;
}

// Завантаження постів конкретного користувача
async function loadPosts(userId, button, postsContainer, error) {
  try {
    // Блокуємо повторний клік під час запиту
    button.disabled = true;
    button.textContent = "Завантаження...";
    error.textContent = "";
    postsContainer.textContent = "";

    const response = await fetch(`${API}/posts?userId=${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const posts = await response.json();
    renderPosts(posts, postsContainer);

    button.textContent = "Пости завантажено";
  } catch (err) {
    error.textContent = "Не вдалося завантажити пости";
    button.disabled = false;
    button.textContent = "Завантажити пости";
    console.error(err);
  }
}

// Відображення списку постів
function renderPosts(posts, container) {
  const title = document.createElement("h4");
  title.textContent = "Пости користувача:";

  const list = document.createElement("ul");

  posts.forEach((post) => {
    const li = document.createElement("li");

     // textContent захищає від XSS
    li.textContent = post.title;
    list.appendChild(li);
  });

  container.append(title, list);
}

// Старт програми
loadUsers();