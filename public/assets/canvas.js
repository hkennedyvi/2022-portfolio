const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = innerWidth;
canvas.height = innerHeight;



const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = [
    '#00BFB2',
    '#EE2E31',
    '#3C91E6'
]

addEventListener('mousemove', event => {
    mouse.x = event.clientX,
        mouse.y = event.clientY
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() + Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(200, 420);
    this.lastMouse = { x: x, y: y };

    this.update = () => {
        const lastPoint = { x: this.x, y: this.y };
        this.radians += this.velocity;
        // Drag Effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        // Circular motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
}

let particles;
function init() {
    particles = [];

    for (let i = 0; i < 40; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)))
    }

    // console.log(particles);
}

function animate() {
    requestAnimationFrame(animate);
    // c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgba(255, 255, 255, 0.05)'
    c.fillRect(0, 0, canvas.width, canvas.width)
    particles.forEach(particle => {
        particle.update();
    });
    // c.fillText('this is a test', mouse.x, mouse.y)
    // Add background color
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

init();
animate();