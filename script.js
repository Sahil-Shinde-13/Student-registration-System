document.addEventListener('DOMContentLoaded', () => {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const form = document.getElementById('registrationForm');
    
    // Initialize table
    renderTable();

    //from submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            const student = {
                id: Date.now(),
                name: document.getElementById('name').value.trim(),
                studentId: document.getElementById('studentId').value.trim(),
                email: document.getElementById('email').value.trim(),
                contact: document.getElementById('contact').value.trim()
            };
            
            students.push(student);
            updateLocalStorage();
            renderTable();
            form.reset();
        }
    });

    //validation function
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const studentId = document.getElementById('studentId');
        const email = document.getElementById('email');
        const contact = document.getElementById('contact');

        // Name validation
        if (!/^[A-Za-z\s]+$/.test(name.value.trim())) {
            showError(name, 'Invalid name - letters only');
            isValid = false;
        }

        // Student ID validation
        if (!/^\d+$/.test(studentId.value.trim())) {
            showError(studentId, 'Invalid Student ID - numbers only');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Invalid email format');
            isValid = false;
        }

        // Contact validation
        if (!/^\d+$/.test(contact.value.trim())) {
            showError(contact, 'Invalid contact number');
            isValid = false;
        }

        return isValid;
    }

    //Error function
    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
        input.focus();
        setTimeout(() => errorSpan.style.display = 'none', 3000);
    }

    function renderTable() {
        const tbody = document.getElementById('studentsList');
        tbody.innerHTML = '';
        
        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">✏️ Edit</button>
                    <button onclick="deleteStudent(${index})">🗑️ Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    //delete confirmation
    window.deleteStudent = (index) => {
        if (confirm('Are you sure you want to delete this student?')) {
            students.splice(index, 1);
            updateLocalStorage();
            renderTable();
        }
    };

    //edit option
    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;
        
        students.splice(index, 1);
        updateLocalStorage();
        renderTable();
    };

    function updateLocalStorage() {
        localStorage.setItem('students', JSON.stringify(students));
    }
});