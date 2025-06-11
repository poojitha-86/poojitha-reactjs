let events = JSON.parse(localStorage.getItem("events")) || [];
let editIndex = null;

const form = document.getElementById("event-form");
const saveBtn = document.getElementById("save-btn");
const updateBtn = document.getElementById("update-btn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value.trim();

  if (!title || !date || !location) {
    alert("All fields are required.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    alert("Please select a future date.");
    return;
  }

  const event = { title, date, location };
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
  form.reset();
  displayEvents();
});

updateBtn.addEventListener("click", function () {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value.trim();

  if (!title || !date || !location) {
    alert("All fields are required.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    alert("Please select a future date.");
    return;
  }

  events[editIndex] = { title, date, location };
  localStorage.setItem("events", JSON.stringify(events));
  form.reset();
  editIndex = null;

  saveBtn.style.display = "inline-block";
  updateBtn.style.display = "none";

  displayEvents();
});

function editEvent(index) {
  const event = events[index];
  document.getElementById("title").value = event.title;
  document.getElementById("date").value = event.date;
  document.getElementById("location").value = event.location;
  editIndex = index;

  saveBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
}

function deleteEvent(index) {
  if (confirm("Are you sure you want to delete this event?")) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
  }
}

function displayEvents() {
  const list = document.getElementById("event-list");
  list.innerHTML = "";

  events.forEach((event, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${event.title}</td>
      <td>${event.date}</td>
      <td>${event.location}</td>
      <td>
        <button class="edit-btn" onclick="editEvent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteEvent(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

displayEvents();
