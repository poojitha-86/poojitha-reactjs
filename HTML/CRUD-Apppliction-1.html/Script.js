 let students = JSON.parse(localStorage.getItem("students")) || [];
let editingIndex = null;


function renderStudents() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";

  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <strong>${student.name}</strong> (Age: ${student.age}, Gender: ${
      student.gender
    })             <br> Courses: ${student.coursesEnrolled.join(
      ", "
    )}
            <br>
            <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button> 
        `;
    studentList.appendChild(li);
  });

  localStorage.setItem("students", JSON.stringify(students));
}


function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const courses = document.getElementById("coursesEnrolled").value.split(",");

  if (name && age && gender && courses.length > 0) {
    students.push({ name, age, gender, coursesEnrolled: courses });
    renderStudents();
    clearForm();
  } else {
    alert("Please fill in all fields.");
  }
}
function deleteStudent(index) {
  students.splice(index, 1);
  renderStudents();
}


function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("gender").value = student.gender;
  document.getElementById("coursesEnrolled").value =
    student.coursesEnrolled.join(",");

  editingIndex = index;
  
  document.getElementById("updateBtn").style.display = "inline-block";
}


function updateStudent() {
  if (editingIndex !== null) {
    students[editingIndex].name = document.getElementById("name").value;
    students[editingIndex].age = document.getElementById("age").value;
    students[editingIndex].gender = document.getElementById("gender").value;
    students[editingIndex].coursesEnrolled = document
      .getElementById("coursesEnrolled")
      .value.split(",");

    renderStudents();
    clearForm();
    document.getElementById("updateBtn").style.display = "none";
    editingIndex = null;
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("coursesEnrolled").value = "";
}


renderStudents();
