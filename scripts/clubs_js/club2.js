// Store students in local storage to persist data
let students = JSON.parse(localStorage.getItem('club2Students')) || [];

// Function to render students in the table
function renderStudents() {
  const tableBody = document.querySelector('#studentsTable tbody');
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.universityNumber}</td>
      <td>${student.college}</td>
      <td>${student.gpa}</td>
      <td>${student.phone}</td>
      <td>${student.email}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to add a student
function addStudent() {
  const name = document.getElementById('name').value;
  const universityNumber = document.getElementById('universityNumber').value;
  const college = document.getElementById('college').value;
  const gpa = document.getElementById('gpa').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const newStudent = {
    name,
    universityNumber,
    college,
    gpa,
    phone,
    email
  };

  students.push(newStudent);
  localStorage.setItem('club2Students', JSON.stringify(students));
  renderStudents();
  clearForm();
}

// Function to clear the form after adding a student
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('universityNumber').value = '';
  document.getElementById('college').value = '';
  document.getElementById('gpa').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
}

// Function to delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('club2Students', JSON.stringify(students));
  renderStudents();
}

// Function to edit a student
function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('universityNumber').value = student.universityNumber;
  document.getElementById('college').value = student.college;
  document.getElementById('gpa').value = student.gpa;
  document.getElementById('phone').value = student.phone;
  document.getElementById('email').value = student.email;

  // Update student after editing
  document.querySelector('button[onclick="addStudent()"]').onclick = function () {
    updateStudent(index);
  };
}

// Function to update a student
function updateStudent(index) {
  students[index].name = document.getElementById('name').value;
  students[index].universityNumber = document.getElementById('universityNumber').value;
  students[index].college = document.getElementById('college').value;
  students[index].gpa = document.getElementById('gpa').value;
  students[index].phone = document.getElementById('phone').value;
  students[index].email = document.getElementById('email').value;

  localStorage.setItem('club2Students', JSON.stringify(students));
  renderStudents();
  clearForm();

  // Restore the add student function
  document.querySelector('button[onclick="updateStudent()"]').onclick = addStudent;
}

// Initial rendering of students
renderStudents();
