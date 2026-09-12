// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Validate form
    if (name && email && message) {
        // Show success message
        alert(`Thanks ${name}! Your message has been sent. I'll get back to you soon!`);
        
        // Reset form
        this.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for scroll animation
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe skill items for scroll animation
document.querySelectorAll('.skill-category').forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(skill);
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(',');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

const projectData = [
    {
        title: "AI + Raspberry Pi 5 Smart Attendance Tracking Robot",
        status: "Prototype",
        description: "Autonomous robotics system using Raspberry Pi 5 and computer vision for real-time person identification and attendance tracking. Combines embedded systems, AI, and robotics into an automated solution.",
        details: "This project integrates multiple technologies to create a fully autonomous system. The Raspberry Pi 5 runs a Python-based computer vision pipeline using OpenCV for real-time face detection and recognition. The system can track multiple people and log their attendance automatically.",
        technologies: ["Raspberry Pi 5", "Python", "Computer Vision", "AI/ML", "Robotics", "Embedded Systems"]
    },
    {
        title: "WRO 2026 - Robots Meet Culture",
        status: "In Progress",
        description: "Competition robotics project for World Robot Olympiad 2026. Robot autonomously classifies colored tiles on a 16-tile grid using computer vision and navigates based on detected patterns.",
        details: "A competitive robotics project designed for the World Robot Olympiad. The robot must identify and classify colored patterns on a game board, navigate autonomously, and complete various tasks. Features advanced sensor integration and autonomous decision-making algorithms.",
        technologies: ["Robotics", "Computer Vision", "Autonomous Navigation", "Sensors", "Programming"]
    },
    {
        title: "8-Sensor Line Following Robot",
        status: "In Progress",
        description: "Eight-channel IR sensor array for autonomous line detection and robot steering. Testing and control via Raspberry Pi 5, focusing on sensor calibration and autonomous navigation algorithms.",
        details: "A sophisticated line-following system using an 8-channel infrared sensor array for precise line detection. The system processes multiple sensor inputs simultaneously to achieve smooth and accurate path following. Includes comprehensive calibration routines and adaptive control algorithms.",
        technologies: ["IR Sensors", "Raspberry Pi 5", "Sensor Calibration", "Autonomous Navigation", "Embedded Programming"]
    },
    {
        title: "Solar Panel Voltage/Current/Power Monitoring",
        status: "In Progress",
        description: "Data acquisition system for solar panel measurements. Uses voltage dividers and current shunts with microcontroller sensing and Python visualization for voltage, current, and power characteristics.",
        details: "A comprehensive monitoring system that measures and logs solar panel performance in real-time. Includes precise analog conditioning circuits, microcontroller-based data acquisition, and Python visualization tools for performance analysis and optimization.",
        technologies: ["Voltage Divider", "Current Sensing", "Microcontroller", "Python", "Data Visualization"]
    },
    {
        title: "5-bit R-2R Resistor Ladder DAC",
        status: "Completed",
        description: "Digital-to-analog converter implementation using R-2R resistor ladder network. 5-bit digital input with GPIO control. Demonstrates resistor networks and analog electronics fundamentals.",
        details: "A precision analog circuit implementation showcasing fundamental electronics principles. The R-2R ladder network provides excellent linearity and accuracy. The system interfaces with GPIO pins for digital control and produces a clean analog output suitable for various applications.",
        technologies: ["R-2R Ladder", "DAC", "GPIO", "Analog Electronics", "Resistor Networks"]
    },
    {
        title: "DHT11 Temperature/Humidity Data Logger",
        status: "Completed",
        description: "Environmental data acquisition system using DHT11 sensor. Microcontroller-based acquisition with serial communication to Python for data logging and monitoring.",
        details: "A complete environmental monitoring system that captures temperature and humidity data continuously. The microcontroller reads the DHT11 sensor and transmits data via serial communication to a Python application for logging, analysis, and visualization.",
        technologies: ["DHT11 Sensor", "Microcontroller", "Serial Communication", "Python", "Data Logging"]
    },
    {
        title: "HX711 Load Cell Measurement System",
        status: "Completed",
        description: "Digital weight and force measurement using HX711 amplifier and load cell. Includes calibration procedures and digital acquisition for instrumentation applications.",
        details: "A precision measurement system for weight and force sensing. Utilizes the HX711 24-bit analog-to-digital converter for high-resolution measurements. Includes comprehensive calibration procedures and can be applied to various weighing and force measurement applications.",
        technologies: ["HX711", "Load Cell", "Calibration", "Instrumentation", "Digital Measurement"]
    },
    {
        title: "RC Low-Pass Filter Circuit Simulation",
        status: "Completed",
        description: "Circuit design and simulation using LTspice. RC filter analysis including frequency response, cutoff frequency, and filter behavior characterization.",
        details: "An educational circuit analysis project using professional simulation tools. Demonstrates frequency response analysis, bode plots, and filter behavior. Perfect for understanding analog filter design principles and their practical applications.",
        technologies: ["LTspice", "RC Filter", "Frequency Response", "Analog Circuit Design", "Circuit Simulation"]
    },
    {
        title: "Operational Amplifier Comparator Circuit",
        status: "Completed",
        description: "Op-amp application for voltage comparison and threshold detection. Demonstrates operational amplifier fundamentals and analog signal processing.",
        details: "A foundational op-amp circuit that uses operational amplifiers for analog signal comparison. The circuit detects when input voltages exceed specified thresholds, useful for sensor interfacing and signal processing applications.",
        technologies: ["Op-Amp", "Comparator", "Analog Electronics", "Threshold Detection"]
    },
    {
        title: "Digital Logic Gate Lock (Wokwi Simulation)",
        status: "Completed",
        description: "Digital logic implementation using logic gates for access control. Built and simulated in Wokwi, demonstrating Boolean logic and embedded system design fundamentals.",
        details: "A digital logic system designed using fundamental logic gates to create an access control mechanism. Simulated in Wokwi for verification and testing. Demonstrates practical applications of Boolean algebra and combinatorial logic design.",
        technologies: ["Digital Logic", "Logic Gates", "Boolean Algebra", "Wokwi Simulation", "Embedded Systems"]
    },
    {
        title: "2S Battery Management System",
        status: "Prototype",
        description: "2-cell lithium battery management electronics prototype. Focuses on battery monitoring, protection circuits, and power management principles.",
        details: "A prototype battery management system for 2-cell lithium batteries. Includes protection circuits for overcharge, overdischarge, and overcurrent conditions. Features voltage monitoring and cell balancing capabilities for optimal battery performance and safety.",
        technologies: ["BMS Electronics", "Battery Protection", "Power Management", "Embedded Systems"]
    },
    {
        title: "3D Forger - Additive Manufacturing",
        status: "In Progress",
        description: "3D printing and fabrication projects using Bambu Lab A1 Mini. Producing parts and prototypes for robotics, electronics, and engineering projects. Focus on practical fabrication for hardware projects.",
        details: "An ongoing fabrication initiative leveraging modern 3D printing technology. Produces custom parts for various robotics and electronics projects. Focuses on design optimization for manufacturing and rapid prototyping capabilities.",
        technologies: ["3D Printing", "Bambu Lab A1 Mini", "Fabrication", "Design for Manufacturing", "Prototyping"]
    }
];

function openProjectModal(index) {
    const project = projectData[index];
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p style="color: #667eea; font-weight: 600; margin-bottom: 1rem;">Status: ${project.status}</p>
        <h3 style="color: #667eea; margin-top: 1.5rem; margin-bottom: 0.5rem;">Overview</h3>
        <p>${project.description}</p>
        <h3 style="color: #667eea; margin-top: 1.5rem; margin-bottom: 0.5rem;">Details</h3>
        <p>${project.details}</p>
        <h3 style="color: #667eea; margin-top: 1.5rem; margin-bottom: 0.5rem;">Technologies</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${project.technologies.map(tech => `<span style="display: inline-block; background-color: #f0f2ff; color: #667eea; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.9rem; font-weight: 500;">${tech}</span>`).join('')}
        </div>
    `;
    modal.classList.add('active');
}

function closeProjectModal() {
    modal.classList.remove('active');
}

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeProjectModal();
    }
});

console.log('Portfolio website loaded successfully!');
