let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

const form = document.getElementById("contact-form");
const saveBtn = document.getElementById("save-btn");
const updateBtn = document.getElementById("update-btn");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!validateEmail(email) || !validatePhone(phone)) {
    alert("Enter a valid email and phone number.");
    return;
  }

  const contact = { name, email, phone };
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  form.reset();
  displayContacts();
});

updateBtn.addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!validateEmail(email) || !validatePhone(phone)) {
    alert("Enter a valid email and phone number.");
    return;
  }

  contacts[editIndex] = { name, email, phone };
  localStorage.setItem("contacts", JSON.stringify(contacts));
  form.reset();
  editIndex = null;

  saveBtn.style.display = "inline-block";
  updateBtn.style.display = "none";

  displayContacts();
});

function displayContacts() {
  const list = document.getElementById("contact-list");
  list.innerHTML = "";

  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button class="edit-btn" onclick="editContact(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById("name").value = contact.name;
  document.getElementById("email").value = contact.email;
  document.getElementById("phone").value = contact.phone;
  editIndex = index;

  saveBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
}

function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
  }
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhone(phone) {
  const regex = /^\d{10}$/;
  return regex.test(phone);
}

displayContacts();
