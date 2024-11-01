
// Store students in local storage to persist data
let LocalStorage;
let students = [];

if (typeof localStorage === "undefined" || localStorage === null) {
  LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

students = JSON.parse(localStorage.getItem('ArtClubStudents')) || [];


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
  localStorage.setItem('ArtClubStudents', JSON.stringify(students));
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
  localStorage.setItem('ArtClubStudents', JSON.stringify(students));
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

  localStorage.setItem('ArtClubStudents', JSON.stringify(students));
  renderStudents();
  clearForm();

  // Restore the add student function
  document.querySelector('button[onclick="updateStudent()"]').onclick = addStudent;
}

// Initial rendering of students
renderStudents();
// دالة لتعبئة قائمة الطلاب
function populateStudentSelect() {
  const studentSelect = document.getElementById('studentSelect');
  studentSelect.innerHTML = '<option value="">اختر الطالب</option>'; // خيار افتراضي

  students.forEach((student, index) => {
      const option = document.createElement('option');
      option.value = index; // استخدم index للربط بالطالب
      option.textContent = student.name; // عرض اسم الطالب
      studentSelect.appendChild(option);
  });
}

// استدعاء الدالة لتعبئة القائمة عند تحميل الصفحة
window.onload = function() {
  renderStudents(); // لتحديث جدول الطلاب
  populateStudentSelect(); // لتحديث القائمة المنسدلة
};

async function sendMessageToStudent() {
  const studentIndex = document.getElementById('studentSelect').value;
  const message = document.getElementById('messageContent').value;

  if (studentIndex === "" || !message) {
    alert("يرجى اختيار الطالب وكتابة رسالة.");
    return;
  }

  const email = students[studentIndex].email;

  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }),
    });

    if (response.ok) {
      alert("تم إرسال الرسالة بنجاح");
    } else {
      alert("حدث خطأ أثناء إرسال الرسالة");
    }
  } catch (error) {
    alert("حدث خطأ أثناء الاتصال بالخادم");
    console.error(error);
  }
}

async function sendMessageToAllStudents() {
  const message = document.getElementById('messageContent').value;
  const emails = students.map(student => student.email);

  if (!message) {
    alert("يرجى كتابة الرسالة لإرسالها إلى جميع الطلاب.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/send-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emails, message }),
    });

    if (response.ok) {
      alert("تم إرسال الرسائل بنجاح");
    } else {
      alert("حدث خطأ أثناء إرسال الرسائل");
    }
  } catch (error) {
    alert("حدث خطأ أثناء الاتصال بالخادم");
    console.error(error);
  }
}
