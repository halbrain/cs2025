document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading software graduates...');
  loadStudents();
});

async function loadStudents() {
  const studentsContainer = document.getElementById('studentsContainer');
  const loadingElement = document.getElementById('loading');
  
  try {
    console.log('Loading students-data.json...');
    
    const response = await fetch('students-data.json?' + new Date().getTime());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('JSON loaded successfully! Found', data.students.length, 'students');

    loadingElement.style.display = 'none';
    studentsContainer.innerHTML = '';
    
    data.students.forEach(student => {
      createStudentButton(student);
    });
    
  } catch (error) {
    console.error('Error loading JSON:', error);
    showError('Failed to load students: ' + error.message);
    loadingElement.style.display = 'none';
  }
}

function createStudentButton(student) {
  const studentsContainer = document.getElementById('studentsContainer');
  
  const studentButton = document.createElement('button');
  studentButton.className = 'student-button';
  studentButton.onclick = () => viewStudent(student.id);
  
  // Create avatar with fallback to initial
  const avatarContent = createAvatar(student);
  
  studentButton.innerHTML = `
    ${avatarContent}
    <div class="student-name">${student.name}</div>
  `;
  
  studentsContainer.appendChild(studentButton);
}

function createAvatar(student) {
  // If avatar path exists, try to use image
  if (student.avatar) {
    return `
      <div class="student-avatar-container">
        <img src="${student.avatar}" alt="${student.name}" class="student-avatar"
             onerror="this.remove(); this.parentElement.textContent='${student.name.charAt(0)}'">
      </div>
    `;
  }
  
  // Fallback to initial
  return `
    <div class="student-avatar-container">
      ${student.name.charAt(0)}
    </div>
  `;
}

function viewStudent(studentId) {
  console.log('Viewing student:', studentId);
  window.location.href = `student-details.html?id=${studentId}`;
}

function showError(message) {
  const studentsContainer = document.getElementById('studentsContainer');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <p>${message}</p>
    <small>Check browser console for details</small>
  `;
  studentsContainer.appendChild(errorDiv);
}