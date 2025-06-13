let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = null;

const form = document.getElementById("employee-form");
const saveBtn = document.getElementById("save-btn");
const updateBtn = document.getElementById("update-btn");

function displayEmployees() {
  const list = document.getElementById("employee-list");
  list.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>₹${emp.salary.toFixed(2)}</td>
      <td>
        <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const department = document.getElementById("department").value.trim();
  const salary = parseFloat(document.getElementById("salary").value);

  if (!name || !department || salary <= 0) {
    alert("Please enter valid employee details.");
    return;
  }

  const employee = { name, department, salary };
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
  form.reset();
  displayEmployees();
});


updateBtn.addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const department = document.getElementById("department").value.trim();
  const salary = parseFloat(document.getElementById("salary").value);

  if (!name || !department || salary <= 0) {
    alert("Please enter valid employee details.");
    return;
  }

  const updatedEmployee = { name, department, salary };
  employees[editIndex] = updatedEmployee;
  localStorage.setItem("employees", JSON.stringify(employees));
  form.reset();
  editIndex = null;


  saveBtn.style.display = "inline-block";
  updateBtn.style.display = "none";

  displayEmployees();
});

function editEmployee(index) {
  const emp = employees[index];
  document.getElementById("name").value = emp.name;
  document.getElementById("department").value = emp.department;
  document.getElementById("salary").value = emp.salary;
  editIndex = index;


  saveBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
  }
}
displayEmployees();