// Student data
const students = [
    { name: "MUHAMMAD SEAN RAHMATULLOH", gender: "Laki-Laki" },
    { name: "NELLY HARIANI", gender: "Perempuan" },
    { name: "ARDYA PUTRA WARDANA", gender: "Laki-Laki" },
    { name: "SALMA FIFI HANIYAH", gender: "Perempuan" },
    { name: "DILA FEBRIANTI", gender: "Perempuan" },
    { name: "MALIKA NUR ANISA", gender: "Perempuan" },
    { name: "EMA AZALIA", gender: "Perempuan" },
    { name: "ANINDYA KURNIA SARI", gender: "Perempuan" },
    { name: "RAYZA DAIYAN DEVANA", gender: "Laki-Laki" },
    { name: "NAUFAL ALLAM THORIQ", gender: "Laki-Laki" },
    { name: "SOFIE ZERLINA", gender: "Perempuan" },
    { name: "DESVITA PUTRI FARDINI", gender: "Perempuan" },
    { name: "SILVA LUNA HUWAIDA", gender: "Perempuan" },
    { name: "FARIDA FATKHUR ROHMAH", gender: "Perempuan" },
    { name: "AINAYA SHALWA SAYEKTHI", gender: "Perempuan" },
    { name: "DAFINA DWI AROFIANI", gender: "Perempuan" },
    { name: "AURA VIRGA MAULITA", gender: "Perempuan" },
    { name: "MUHAMMAD SYAUQI", gender: "Laki-Laki" },
    { name: "FADLLAN HADISALAM", gender: "Laki-Laki" },
    { name: "IRFAN WAHYU RAMADHAN", gender: "Laki-Laki" },
    { name: "MIRZA LATIF FAUSTA", gender: "Laki-Laki" },
    { name: "GHIFFARY RAKANDHAWY IQENKANSYAH", gender: "Laki-Laki" },
    { name: "ALYA NUR SHAHADA", gender: "Perempuan" },
    { name: "PRAMUDYA YUMNA DEVA WARDANA", gender: "Laki-Laki" },
    { name: "MUHAMMAD YUSUF", gender: "Laki-Laki" },
    { name: "IKRAM MULIA ALAMSYAH", gender: "Laki-Laki" },
    { name: "MUHAMMAD RIFAT BIMANTORO", gender: "Laki-Laki" },
    { name: "I'ANATUN NAFI'AH", gender: "Perempuan" },
    { name: "ADHINIA SALSABILLA", gender: "Perempuan" },
    { name: "AHMAD IRFANUDIN", gender: "Laki-Laki" },
    { name: "NADIA MAULIDATUL HUSNA", gender: "Perempuan" },
    { name: "MAURISA AILA ZAINATURRAHMA", gender: "Perempuan" },
    { name: "NADYA ANANDA", gender: "Perempuan" },
    { name: "AZFARSYAH ARSY MARDANUS", gender: "Laki-Laki" },
    { name: "RAISYA NABILA", gender: "Perempuan" },
    { name: "ILHAM MAULANA SYAH SINAGA", gender: "Laki-Laki" },
    { name: "SOLIKAH DIVA RAHMA PUTRI", gender: "Perempuan" },
    { name: "MUHAMAD AKROM", gender: "Laki-Laki" },
    { name: "RINALDI AFIF ARDIANSYAH", gender: "Laki-Laki" },
    { name: "ARIMBI ARUM SIWI", gender: "Perempuan" },
    { name: "ZAZKIA HIJRIA ANGGRAINI", gender: "Perempuan" },
    { name: "MARSA ALMIRA INDIANA", gender: "Perempuan" },
    { name: "HIKMAH MAY RANDY PURBA", gender: "Laki-Laki" },
    { name: "MUHAMMAD HUSEIN RAMA WIJAYA", gender: "Laki-Laki" },
    { name: "SOFI ANDRIYANI", gender: "Perempuan" }
];

// Group size distribution: 7-7-7-6-6-6-6
const groupSizes = [7, 7, 7, 6, 6, 6, 6];

// Click counter for shuffle functionality
let shuffleClickCount = 0;

// Three.js variables
let scene, camera, renderer;
let particles = [];
let is3DMode = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Try to initialize Three.js, fallback gracefully if not available
    if (typeof THREE !== 'undefined') {
        initThreeJS();
    } else {
        console.log('Three.js not available, running in fallback mode');
        document.getElementById('three-canvas').style.display = 'none';
    }
    
    // Don't auto-generate groups - wait for user to click generate button
    
    // Event listeners
    document.getElementById('generate-btn').addEventListener('click', generateGroups);
    document.getElementById('shuffle-btn').addEventListener('click', shuffleGroups);
    
    // Hide loading screen and show main content
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('main-container').style.opacity = '1';
        }, 500);
    }, 2000);
});

// Initialize Three.js scene
function initThreeJS() {
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded, skipping 3D initialization');
        return;
    }
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    const canvasContainer = document.getElementById('three-canvas');
    if (canvasContainer) {
        canvasContainer.appendChild(renderer.domElement);
    }
    
    // Create particles
    createParticles();
    
    // Position camera
    camera.position.z = 5;
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    if (typeof THREE === 'undefined' || !scene) return;
    
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        colors[i] = Math.random();
        colors[i + 1] = Math.random();
        colors[i + 2] = Math.random();
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    if (typeof THREE === 'undefined' || !renderer) return;
    
    requestAnimationFrame(animate);
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    if (typeof THREE === 'undefined' || !camera || !renderer) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Group assignment algorithm with specific gender distribution
function assignGroups() {
    // Check if this is the 10th click (special assignment)
    if (shuffleClickCount === 10) {
        assignSpecialGroups();
        return;
    }
    
    // For clicks 1-9, use completely random assignment
    assignRandomGroups();
}

// Random group assignment for clicks 1-9
function assignRandomGroups() {
    // Create a copy of all students and shuffle them randomly
    const allStudents = [...students];
    shuffleArray(allStudents);
    
    // Initialize groups
    const groups = groupSizes.map((size, index) => ({
        id: index + 1,
        size: size,
        members: [],
        maleCount: 0,
        femaleCount: 0
    }));
    
    // Randomly distribute students to groups
    let studentIndex = 0;
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groupSizes[i] && studentIndex < allStudents.length; j++) {
            const student = allStudents[studentIndex];
            groups[i].members.push(student);
            
            if (student.gender === "Laki-Laki") {
                groups[i].maleCount++;
            } else {
                groups[i].femaleCount++;
            }
            studentIndex++;
        }
    }
    
    displayGroups(groups);
}

// Special group assignment for 10th click
function assignSpecialGroups() {
    // Create fixed assignments
    const fixedAssignments = {
        "MUHAMMAD SEAN RAHMATULLOH": 3,
        "FADLAN HADISALAM": 3, 
        "MUHAMMAD SYAUQI": 3
    };
    
    // Find RAYZA and RINALDI for pairing
    const rayzaStudent = students.find(s => s.name === "RAYZA DAIYAN DEVANA");
    const rinaldiStudent = students.find(s => s.name === "RINALDI AFIF ARDIANSYAH");
    
    // Choose random group for RAYZA and RINALDI (1-7 except 3)
    const availableGroups = [1, 2, 4, 5, 6, 7];
    const selectedGroup = availableGroups[Math.floor(Math.random() * availableGroups.length)];
    
    if (rayzaStudent) fixedAssignments[rayzaStudent.name] = selectedGroup;
    if (rinaldiStudent) fixedAssignments[rinaldiStudent.name] = selectedGroup;
    
    // Initialize groups
    const groups = groupSizes.map((size, index) => ({
        id: index + 1,
        size: size,
        members: [],
        maleCount: 0,
        femaleCount: 0
    }));
    
    // First, assign fixed students
    const remainingStudents = [];
    
    for (const student of students) {
        if (fixedAssignments[student.name]) {
            const groupIndex = fixedAssignments[student.name] - 1;
            groups[groupIndex].members.push(student);
            
            if (student.gender === "Laki-Laki") {
                groups[groupIndex].maleCount++;
            } else {
                groups[groupIndex].femaleCount++;
            }
        } else {
            remainingStudents.push(student);
        }
    }
    
    // Shuffle remaining students randomly
    shuffleArray(remainingStudents);
    
    // Distribute remaining students to fill groups
    let studentIndex = 0;
    for (let i = 0; i < groups.length; i++) {
        while (groups[i].members.length < groupSizes[i] && studentIndex < remainingStudents.length) {
            const student = remainingStudents[studentIndex];
            groups[i].members.push(student);
            
            if (student.gender === "Laki-Laki") {
                groups[i].maleCount++;
            } else {
                groups[i].femaleCount++;
            }
            studentIndex++;
        }
    }
    
    displayGroups(groups);
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display groups in HTML
function displayGroups(groups) {
    const container = document.getElementById('groups-container');
    container.innerHTML = '';
    
    groups.forEach((group, index) => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';
        groupCard.style.animationDelay = `${index * 0.1}s`;
        
        groupCard.innerHTML = `
            <div class="group-header">
                <div class="group-title">Kelompok ${group.id}</div>
                <div class="group-stats">
                    <span>👥 ${group.members.length} anggota</span>
                    <span>👨 ${group.maleCount} L</span>
                    <span>👩 ${group.femaleCount} P</span>
                </div>
            </div>
            <ul class="member-list">
                ${group.members.map((member, memberIndex) => `
                    <li class="member-item ${member.gender === 'Laki-Laki' ? 'male' : 'female'}" 
                        style="animation-delay: ${(index * 0.1) + (memberIndex * 0.05)}s">
                        <div class="gender-icon ${member.gender === 'Laki-Laki' ? 'male' : 'female'}">
                            ${member.gender === 'Laki-Laki' ? '♂' : '♀'}
                        </div>
                        <span class="member-name">${member.name}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        container.appendChild(groupCard);
    });
}

// Generate groups for the first time
function generateGroups() {
    // Add loading effect to generate button
    const generateBtn = document.getElementById('generate-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const preMessage = document.getElementById('pre-generation-message');
    
    generateBtn.disabled = true;
    generateBtn.textContent = '🔄 Membuat Kelompok...';
    
    // Hide pre-generation message with fade effect
    if (preMessage) {
        preMessage.style.opacity = '0';
        preMessage.style.transform = 'scale(0.95)';
    }
    
    setTimeout(() => {
        // Remove pre-generation message completely
        if (preMessage) {
            preMessage.style.display = 'none';
        }
        
        // Generate the groups
        assignGroups();
        
        // Hide generate button and show shuffle button
        generateBtn.style.display = 'none';
        shuffleBtn.style.display = 'inline-block';
        
        // Reset generate button for potential future use
        generateBtn.disabled = false;
        generateBtn.textContent = '🎯 Generate Kelompok';
    }, 1000);
}

// Shuffle groups
function shuffleGroups() {
    // Increment click counter
    shuffleClickCount++;
    
    // Add loading effect
    const shuffleBtn = document.getElementById('shuffle-btn');
    shuffleBtn.disabled = true;
    shuffleBtn.textContent = '🔄 Mengacak...';
    
    // Add shake effect to cards
    document.querySelectorAll('.group-card').forEach(card => {
        card.style.animation = 'none';
        card.style.transform = 'scale(0.8)';
        card.style.opacity = '0.5';
    });
    
    setTimeout(() => {
        assignGroups();
        
        // Reset counter after 10th click
        if (shuffleClickCount >= 10) {
            shuffleClickCount = 0;
        }
        
        shuffleBtn.disabled = false;
        shuffleBtn.textContent = '🎲 Acak Ulang Kelompok';
        
        // Reset card animations
        setTimeout(() => {
            document.querySelectorAll('.group-card').forEach(card => {
                card.style.transform = '';
                card.style.opacity = '';
            });
        }, 100);
    }, 1000);
}

// Toggle 3D mode
function toggle3DMode() {
    is3DMode = !is3DMode;
    const container = document.getElementById('groups-container');
    const toggleBtn = document.getElementById('toggle-3d');
    
    if (is3DMode) {
        container.classList.add('three-mode');
        toggleBtn.textContent = '🎨 Mode Normal';
        
        // Add more particles if Three.js is available
        if (typeof THREE !== 'undefined' && particles && scene) {
            scene.remove(particles);
            createEnhancedParticles();
        }
    } else {
        container.classList.remove('three-mode');
        toggleBtn.textContent = '🎨 Toggle 3D Mode';
        
        // Reset to normal particles if Three.js is available
        if (typeof THREE !== 'undefined' && particles && scene) {
            scene.remove(particles);
            createParticles();
        }
    }
}

function createEnhancedParticles() {
    if (typeof THREE === 'undefined' || !scene) return;
    
    const geometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 30;
        positions[i + 1] = (Math.random() - 0.5) * 30;
        positions[i + 2] = (Math.random() - 0.5) * 30;
        
        // More vibrant colors for 3D mode
        colors[i] = 0.5 + Math.random() * 0.5;
        colors[i + 1] = 0.5 + Math.random() * 0.5;
        colors[i + 2] = 0.5 + Math.random() * 0.5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// Add floating elements
function createFloatingElements() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 8 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 70%)`;
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
}

// Create floating elements periodically
setInterval(createFloatingElements, 5000);