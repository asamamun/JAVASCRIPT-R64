class Human {
    hairColor = "black";
    skinColor = "white";

    //constructors are function that are called when an object is created. you can give values to the constructor parameters when creating an object
    constructor(name, age, gender, dob, weight, height) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.dob = dob;
        this.weight = weight;
        this.height = height;
    }

    setHairColor(c) {
        this.hairColor = c;
    }

    setSkinColor(c) {
        this.skinColor = c;
    }

    draw(container) {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');

        // Draw the avatar (simple representation)
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(10, 10, 80, 100); // Body
        ctx.fillStyle = this.hairColor;
        ctx.fillRect(20, 10, 60, 20); // Hair
        ctx.fillStyle = 'black';
        ctx.fillRect(30, 40, 10, 10); // Eyes
        ctx.fillRect(60, 40, 10, 10); // Eyes
        ctx.fillRect(45, 60, 10, 20); // Nose
        ctx.fillRect(35, 85, 30, 10); // Mouth

        // Add the canvas to the container
        container.appendChild(canvas);
    }
}

document.getElementById('avatarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const hairColor = document.getElementById('hairColor').value;
    const skinColor = document.getElementById('skinColor').value;

    const avatar = new Human(name, age, gender, dob, weight, height);
    avatar.setHairColor(hairColor);
    avatar.setSkinColor(skinColor);

    const avatarContainer = document.getElementById('avatarContainer');
    avatar.draw(avatarContainer);
});