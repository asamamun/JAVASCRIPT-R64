class Trainee {
    constructor(name, contact, remarks, sex, courses, location) {
        this.name = name;
        this.contact = contact;
        this.remarks = remarks;
        this.sex = sex;
        this.courses = courses;
        this.location = location;
    }

    getFormattedData() {
        return `
            <h2>Trainee Details</h2>
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Contact:</strong> ${this.contact}</p>
            <p><strong>Remarks:</strong> ${this.remarks}</p>
            <p><strong>Sex:</strong> ${this.sex}</p>
            <p><strong>Courses:</strong> ${this.courses.join(', ')}</p>
            <p><strong>Location:</strong> ${this.location}</p>
        `;
    }
}

document.getElementById('traineeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const remarks = document.getElementById('remarks').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const courses = Array.from(document.querySelectorAll('input[name="courses"]:checked')).map(cb => cb.value);
    const location = document.getElementById('location').value;

    // Create Trainee object
    const trainee = new Trainee(name, contact, remarks, sex, courses, location);

    // Open new window and display formatted data
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
            <head>
                <title>Trainee Details</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h2 { color: #333; }
                    p { margin: 10px 0; }
                </style>
            </head>
            <body>
                ${trainee.getFormattedData()}
            </body>
        </html>
    `);
    newWindow.document.close();
});