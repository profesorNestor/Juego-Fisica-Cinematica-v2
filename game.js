// ================================================
// 🎮 ACADEMIA ESPACIAL 2.0 - VERSIÓN FINAL CORREGIDA
// Archivo: game.js v5.2 (Animaciones del Footer Restauradas)
// ================================================

console.log('🚀 Cargando motor de juego FINAL v5.2...');

document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a Elementos del DOM ---
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error("FATAL: No se encontró el elemento canvas. El juego no puede iniciar.");
        return;
    }
    const ctx = canvas.getContext('2d');

    const ui = {
        level: document.getElementById('level'),
        livesContainer: document.getElementById('livesContainer'),
        score: document.getElementById('score'),
        progress: document.getElementById('progress'),
        progressFill: document.getElementById('progressFill'),
        grade: document.getElementById('grade'),
        currentTopic: document.getElementById('currentTopic'),
        topicCheckboxes: document.querySelectorAll('input[name="gameTopics"]'),
        levelSelect: document.getElementById('levelSelect'),
        startButton: document.getElementById('startButton'),
        pauseButton: document.getElementById('pauseButton'),
        soundButton: document.getElementById('soundButton'),
        helpButton: document.getElementById('helpButton'),
        resetButton: document.getElementById('resetButton'),
    };

    const modals = {
        question: document.getElementById('questionModal'),
        feedback: document.getElementById('feedbackModal'),
        help: document.getElementById('helpModal'),
        levelUp: document.getElementById('levelUpModal'),
        pause: document.getElementById('pauseModal'),
        finalStats: document.getElementById('finalStatsModal'),
        curiosity: null, // Se creará dinámicamente
    };

    const modalContent = {
        questionTitle: document.querySelector('#questionModal .modal-title'),
        questionData: document.getElementById('questionData'),
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('optionsContainer'),
        answerButton: document.getElementById('answerButton'),
        feedbackTitle: document.getElementById('feedbackTitle'),
        feedbackText: document.getElementById('feedbackText'),
        solutionContainer: document.getElementById('solution-container'),
        nextButton: document.getElementById('nextButton'),
        closeHelp: document.getElementById('closeHelp'),
        levelUpTitle: document.getElementById('levelUpTitle'),
        levelUpText: document.getElementById('levelUpText'),
        levelUpStats: document.getElementById('levelUpStats'),
        nextLevelButton: document.getElementById('nextLevelButton'),
        resumeButton: document.getElementById('resumeButton'),
        restartFromPause: document.getElementById('restartFromPause'),
        finalStatsTitle: document.getElementById('finalStatsTitle'),
        finalStatsContent: document.getElementById('finalStatsContent'),
        restartGameButton: document.getElementById('restartGameButton'),
    };

    // --- Configuración del Juego ---
    const CONFIG = {
        INITIAL_LIVES: 5,
        POINTS_PER_CORRECT: 100,
        POINTS_PER_OBJECT: 10,
        LEVEL_BONUS_MULTIPLIER: 50,
        MAX_STARS_PARALLAX: 200,
        SPACESHIP_SIZE: 25,
        SPACESHIP_SPEED: 0.1,
        MAX_MOVING_OBJECTS: 10,
        LEVELS: {
            1: { questions: 10, name: "Cadete" },
            2: { questions: 20, name: "Piloto" },
            3: { questions: 30, name: "Comandante" }
        },
        PLANET_DENSITY: 0.8,
        PLANET_VARIETY: true,
        PLANET_ANIMATIONS: true,
    };

    // --- Configuración de Tipos de Planetas (NUEVO Y MEJORADO) ---
    const PLANET_TYPES = {
        terrestrial: {
            name: 'Terrestre',
            sizeRange: [25, 40],
            colors: [
                { color1: '#8B4513', color2: '#654321', color3: '#DEB887' },
                { color1: '#2E8B57', color2: '#228B22', color3: '#90EE90' },
                { color1: '#B22222', color2: '#8B0000', color3: '#FA8072' },
                { color1: '#4682B4', color2: '#191970', color3: '#87CEEB' }
            ],
            hasRing: 0.1, // Baja probabilidad
            hasCraters: true,
        },
        gasGiant: {
            name: 'Gigante Gaseoso',
            sizeRange: [45, 70],
            colors: [
                { color1: '#FFD700', color2: '#FFA500', color3: '#FFFFE0' },
                { color1: '#DDA0DD', color2: '#8B008B', color3: '#E6E6FA' },
                { color1: '#20B2AA', color2: '#008B8B', color3: '#AFEEEE' },
            ],
            hasRing: 0.6, // Alta probabilidad
            hasBands: true,
            hasStorms: 0.5,
        },
        ice: {
            name: 'Planeta Helado',
            sizeRange: [30, 45],
            colors: [
                { color1: '#B0E0E6', color2: '#4682B4', color3: '#F0F8FF' },
                { color1: '#E0FFFF', color2: '#5F9EA0', color3: '#FFFFFF' },
            ],
            hasRing: 0.3,
            hasCracks: true,
            hasGlow: true,
        },
        exotic: {
            name: 'Planeta Exótico',
            sizeRange: [20, 60],
            colors: [
                { color1: '#FF1493', color2: '#C71585', color3: '#FFB6C1' },
                { color1: '#00CED1', color2: '#00008B', color3: '#00FFFF' },
                { color1: '#9370DB', color2: '#4B0082', color3: '#DDA0DD' }
            ],
            hasRing: 0.2, // Probabilidad media-baja
            hasAurora: true,
            pulseEffect: true,
        }
    };

    // --- Estado del Juego ---
    let gameState = {};
    let animationFrameId;

    // ================================================
    // 🚀 LÓGICA DE INICIO Y BUCLE PRINCIPAL
    // ================================================

    function init() {
        fullReset();
        setupEventListeners();
        createCuriosityModal();
        createFooterShipIfNeeded();
        startFooterEffects();
        console.log("✅ Academia Espacial 2.0 lista para la misión.");
    }

    function gameLoop() {
        if (gameState.isPaused) {
            animationFrameId = requestAnimationFrame(gameLoop);
            return;
        }
        update();
        draw();
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    // ================================================
    // 🔄 LÓGICA DE ACTUALIZACIÓN DE ESTADO
    // ================================================

    function update() {
        updateStars();
        updateCosmicObjects();
        updateSpaceship();
        checkCollisions();
        updateParticles();
    }

    // ================================================
    // 🎨 LÓGICA DE DIBUJADO EN EL CANVAS
    // ================================================

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStars();
        drawCosmicObjects(true); // Dibuja planetas (detrás)
        drawParticles();
        drawSpaceshipTrail();
        drawSpaceship();
        drawCosmicObjects(false); // Dibuja meteoritos y cometas (delante)
    }

    function drawStaticElements() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStars();
        drawCosmicObjects(true);
        drawCosmicObjects(false);
        drawSpaceship();
    }

    // ================================================
    // 🛠️ FUNCIONES DE GESTIÓN DEL JUEGO
    // ================================================

    function fullReset() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        const levelValue = parseInt(ui.levelSelect.value, 10);
        const selectedTopics = getSelectedTopics();

        gameState = {
            isGameActive: false,
            isPaused: false,
            currentLevel: levelValue,
            selectedTopics: selectedTopics.length > 0 ? selectedTopics : ['magnitudes'],
            lives: CONFIG.INITIAL_LIVES,
            score: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            currentLevelProgress: 0,
            currentQuestion: null,
            selectedAnswer: null,
            levelQuestionPool: [],
            usedQuestions: new Set(),
            topicDistribution: {},
            spaceship: {
                x: canvas.width / 4,
                y: canvas.height / 2,
                targetX: canvas.width / 4,
                targetY: canvas.height / 2,
                size: CONFIG.SPACESHIP_SIZE,
                angle: 0,
                trail: [],
                enginePulse: 0
            },
            stars: [],
            cosmicObjects: [],
            particles: [],
        };

        ui.pauseButton.disabled = true;
        ui.levelSelect.disabled = false;
        ui.topicCheckboxes.forEach(cb => cb.disabled = false);
        const startButtonText = ui.startButton.querySelector('.button-text');
        const startButtonIcon = ui.startButton.querySelector('.button-icon');
        if (startButtonText) startButtonText.textContent = "LANZAR";
        if (startButtonIcon) startButtonIcon.innerHTML = `🚀`;

        resizeCanvas();
        updateUI();
    }

    function getSelectedTopics() {
        const selected = [];
        ui.topicCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selected.push(checkbox.value);
            }
        });
        if (selected.length === 0) {
            const magnitudesCheckbox = document.getElementById('topicMagnitudes');
            if (magnitudesCheckbox) {
                magnitudesCheckbox.checked = true;
                selected.push('magnitudes');
            }
        }
        return selected;
    }

    function startGame() {
        if (gameState.isGameActive) return;

        gameState.selectedTopics = getSelectedTopics();
        gameState.isGameActive = true;
        ui.pauseButton.disabled = false;
        ui.levelSelect.disabled = true;
        ui.topicCheckboxes.forEach(cb => cb.disabled = true);

        const startButtonText = ui.startButton.querySelector('.button-text');
        const startButtonIcon = ui.startButton.querySelector('.button-icon');
        if (startButtonText) startButtonText.textContent = "PEDIR PREGUNTA";
        if (startButtonIcon) startButtonIcon.innerHTML = `<i class="fas fa-brain"></i>`;

        generateAdvancedQuestionPool();
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        gameLoop();
    }

    function togglePause() {
        if (!gameState.isGameActive) return;
        gameState.isPaused = !gameState.isPaused;
        const icon = ui.pauseButton.querySelector('.button-icon');
        const text = ui.pauseButton.querySelector('.button-text');
        if (gameState.isPaused) {
            icon.textContent = '▶️';
            text.textContent = 'REANUDAR';
            showModal(modals.pause);
        } else {
            icon.textContent = '⏸️';
            text.textContent = 'PAUSA';
            hideModal(modals.pause);
        }
    }

    function resizeCanvas() {
        const container = document.querySelector('.canvas-container');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initializeStars();
        if (!gameState.isGameActive || !gameState.cosmicObjects.some(o => o.isStatic)) {
            initializePlanets();
        }
        drawStaticElements();
    }

    // ================================================
    // 🧠 SISTEMA AVANZADO DE PREGUNTAS (Sin cambios)
    // ================================================

    function generateAdvancedQuestionPool() {
        const topics = gameState.selectedTopics;
        const targetQuestions = CONFIG.LEVELS[gameState.currentLevel].questions;
        const questionsByTopic = {};
        let totalAvailable = 0;
        topics.forEach(topic => {
            if (window.questionDatabase && window.questionDatabase[topic]) {
                const topicQuestions = window.questionDatabase[topic]
                    .filter(q => q.difficulty <= gameState.currentLevel)
                    .map(q => ({
                        ...q,
                        topic,
                        id: `${topic}_${JSON.stringify(q).slice(0, 30)}_${Math.random().toString(36).substr(2, 9)}`
                    }));
                questionsByTopic[topic] = topicQuestions;
                totalAvailable += topicQuestions.length;
            } else {
                questionsByTopic[topic] = [];
            }
        });

        const questionsPerTopic = Math.floor(targetQuestions / topics.length);
        const remainder = targetQuestions % topics.length;
        const balancedPool = [];
        gameState.topicDistribution = {};

        topics.forEach((topic, index) => {
            const topicQuestions = questionsByTopic[topic] || [];
            const questionsToTake = questionsPerTopic + (index < remainder ? 1 : 0);
            const shuffledQuestions = shuffleArray([...topicQuestions]);
            const selectedQuestions = shuffledQuestions.slice(0, Math.min(questionsToTake, shuffledQuestions.length));
            balancedPool.push(...selectedQuestions);
            gameState.topicDistribution[topic] = selectedQuestions.length;
        });

        if (balancedPool.length < targetQuestions) {
            const allRemaining = [];
            topics.forEach(topic => {
                const used = balancedPool.filter(q => q.topic === topic).map(q => q.id);
                const remaining = (questionsByTopic[topic] || []).filter(q => !used.includes(q.id));
                allRemaining.push(...remaining);
            });
            const shuffledRemaining = shuffleArray(allRemaining);
            const needed = targetQuestions - balancedPool.length;
            balancedPool.push(...shuffledRemaining.slice(0, needed));
        }

        gameState.levelQuestionPool = shuffleArray(balancedPool);
        gameState.usedQuestions = new Set();
    }

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function askQuestion() {
        if (!gameState.isGameActive || gameState.isPaused || modals.question.style.display === 'flex') return;
        if (gameState.levelQuestionPool.length === 0) {
            generateAdvancedQuestionPool();
            gameState.levelQuestionPool = gameState.levelQuestionPool.filter(q => !gameState.usedQuestions.has(q.id));
            if (gameState.levelQuestionPool.length === 0) {
                completeGame("<i class='fas fa-trophy modal-title-icon'></i> ¡Dominio Total!", "Has respondido todas las preguntas disponibles.");
                return;
            }
        }
        gameState.currentQuestion = gameState.levelQuestionPool.pop();
        gameState.usedQuestions.add(gameState.currentQuestion.id);
        gameState.isPaused = true;
        displayQuestion();
    }

    async function displayQuestion() {
        const q = gameState.currentQuestion;
        if(modalContent.questionTitle) modalContent.questionTitle.innerHTML = `<span class="modal-title-icon">🧑‍🚀</span> DESAFÍO FÍSICO`;
        const topicName = Array.from(ui.topicCheckboxes).find(cb => cb.value === q.topic)?.nextElementSibling.querySelector('span').textContent || q.topic;
        modalContent.questionData.innerHTML = `<div class="metadata-item"><span class="metadata-label">Tema</span><span class="metadata-value">${topicName}</span></div><div class="metadata-item"><span class="metadata-label">Dificultad</span><span class="metadata-value">${'⭐'.repeat(q.difficulty)}</span></div>`;
        modalContent.questionText.innerHTML = q.question;
        let extraHTML = '';
        if (q.formula) extraHTML += `<div class="math-formula-container"><div class="formula-label">Fórmula</div><div class="math-expression">${q.formula}</div></div>`;
        if (q.given) {
            const dataItems = Object.entries(q.given).map(([k, v]) => `<span class="data-item">$${k.replace(/_(\w)/, '_{$1}')} = ${v}$</span>`).join('');
            extraHTML += `<div class="data-section"><div class="data-label">Datos</div><div class="data-container">${dataItems}</div></div>`;
        }
        modalContent.questionText.innerHTML += extraHTML;
        modalContent.optionsContainer.innerHTML = '';
        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-button';
            btn.innerHTML = option;
            btn.onclick = () => selectOption(index, btn);
            modalContent.optionsContainer.appendChild(btn);
        });
        modalContent.answerButton.disabled = true;
        showModal(modals.question);
        if (window.MathJax) await MathJax.typesetPromise([modals.question]);
    }

    function selectOption(index, btn) {
        document.querySelectorAll('.option-button.selected').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        gameState.selectedAnswer = index;
        modalContent.answerButton.disabled = false;
    }

    function submitAnswer() {
        hideModal(modals.question);
        const isCorrect = gameState.selectedAnswer === gameState.currentQuestion.correct;
        gameState.questionsAnswered++;
        gameState.currentLevelProgress++;
        if (isCorrect) {
            gameState.correctAnswers++;
            gameState.score += CONFIG.POINTS_PER_CORRECT;
            showFeedback(true);
        } else {
            gameState.lives--;
            showFeedback(false);
        }
        updateUI();
        if (gameState.lives <= 0) setTimeout(() => gameOver(), 2000);
        else if (gameState.currentLevelProgress >= CONFIG.LEVELS[gameState.currentLevel].questions) setTimeout(() => completeLevel(), 2000);
    }

    async function showFeedback(isCorrect) {
        modalContent.feedbackTitle.textContent = isCorrect ? "✅ ¡Respuesta Correcta!" : "❌ Respuesta Incorrecta";
        modalContent.feedbackText.innerHTML = isCorrect ? "¡Excelente, cadete! Tu conocimiento ilumina el cosmos." : "Un pequeño error es una oportunidad para aprender. ¡No te rindas!";
        let explanationHTML = '';
        const explanation = gameState.currentQuestion.explanation;
        if (explanation) explanationHTML = `<h4 class="explanation-title">Explicación</h4><div class="explanation-content">${explanation}</div>`;
        if (explanationHTML) {
            modalContent.solutionContainer.innerHTML = explanationHTML;
            modalContent.solutionContainer.style.display = 'block';
        } else {
            modalContent.solutionContainer.style.display = 'none';
        }
        showModal(modals.feedback);
        if (window.MathJax) await MathJax.typesetPromise([modalContent.solutionContainer]);
        setTimeout(() => { if (Math.random() < 0.85) showCuriosityModal(); }, 1500);
    }

    function createCuriosityModal() {
        const curiosityModal = document.createElement('div');
        curiosityModal.id = 'curiosityModal';
        curiosityModal.className = 'modal quantum-modal';
        curiosityModal.style.display = 'none';
        curiosityModal.innerHTML = `<div class="modal-backdrop"></div><div class="modal-content glass-panel"><div class="modal-header"><h2 class="modal-title"><span class="modal-title-icon">🧑‍🚀</span> DATOS CIENTÍFICOS</h2></div><div class="curiosity-container"><h4 id="curiosityTitle" class="curiosity-modal-title"><span class="curiosity-astronaut-icon">🌟</span><span id="curiosityTitleText">Dato Curioso</span></h4><div id="curiosityContent" class="curiosity-content">Cargando curiosidad...</div></div><button id="closeCuriosityButton" class="quantum-button primary large"><span class="button-icon">✨</span><span class="button-text">¡FASCINANTE!</span></button></div>`;
        document.body.appendChild(curiosityModal);
        modals.curiosity = curiosityModal;
        document.getElementById('closeCuriosityButton').addEventListener('click', () => hideModal(modals.curiosity));
    }

    async function showCuriosityModal() {
        if (!modals.curiosity || !window.getRandomCuriosity) return;
        const curiosity = window.getRandomCuriosity();
        if (!curiosity || !curiosity.title || !curiosity.content) return;
        document.getElementById('curiosityTitleText').textContent = curiosity.title;
        document.getElementById('curiosityContent').innerHTML = `<strong>${curiosity.title}:</strong> ${curiosity.content}`;
        showModal(modals.curiosity);
        if (window.MathJax && curiosity.content.includes('$')) await MathJax.typesetPromise([modals.curiosity]);
    }

    // ================================================
    // 🌌 ELEMENTOS DEL JUEGO (NAVE Y ESTRELLAS - Sin Cambios)
    // ================================================

    function initializeStars() {
        gameState.stars = [];
        for (let i = 0; i < CONFIG.MAX_STARS_PARALLAX; i++) {
            const layer = Math.floor(Math.random() * 3) + 1;
            gameState.stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 1.5, speed: 0.1 * layer, opacity: 0.3 + (layer / 3) * 0.7 });
        }
    }

    function updateStars() {
        gameState.stars.forEach(star => {
            star.x -= star.speed;
            if (star.x < 0) {
                star.x = canvas.width;
                star.y = Math.random() * canvas.height;
            }
        });
    }

    function drawStars() {
        ctx.save();
        gameState.stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240, 249, 255, ${star.opacity})`;
            ctx.fill();
        });
        ctx.restore();
    }

    function updateSpaceship() {
        const ship = gameState.spaceship;
        const dx = ship.targetX - ship.x;
        const dy = ship.targetY - ship.y;
        const targetAngle = Math.atan2(dy, dx);
        let angleDiff = targetAngle - ship.angle;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        ship.angle += angleDiff * 0.1;
        ship.x += dx * CONFIG.SPACESHIP_SPEED;
        ship.y += dy * CONFIG.SPACESHIP_SPEED;
        ship.x = Math.max(ship.size, Math.min(canvas.width - ship.size, ship.x));
        ship.y = Math.max(ship.size, Math.min(canvas.height - ship.size, ship.y));
        ship.trail.push({ x: ship.x, y: ship.y, angle: ship.angle });
        if (ship.trail.length > 30) ship.trail.shift();
        ship.enginePulse += 0.1;
    }

    function drawSpaceship() {
        const ship = gameState.spaceship;
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);
        const pulseFactor = 0.8 + Math.sin(ship.enginePulse) * 0.2;
        const motorGlow = ctx.createRadialGradient(-ship.size, 0, 0, -ship.size, 0, ship.size * 1.5 * pulseFactor);
        motorGlow.addColorStop(0, 'rgba(0, 217, 255, 0.8)');
        motorGlow.addColorStop(1, 'rgba(0, 217, 255, 0)');
        ctx.fillStyle = motorGlow;
        ctx.fillRect(-ship.size * 2, -ship.size, ship.size * 2, ship.size * 2);
        ctx.fillStyle = '#f0f9ff';
        ctx.strokeStyle = '#00d9ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00d9ff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(ship.size * 0.8, 0);
        ctx.lineTo(-ship.size * 0.5, ship.size * 0.6);
        ctx.lineTo(-ship.size * 0.2, 0);
        ctx.lineTo(-ship.size * 0.5, -ship.size * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#0a0e27';
        ctx.beginPath();
        ctx.arc(ship.size * 0.3, 0, ship.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#00d9ff';
        ctx.stroke();
        ctx.fillStyle = `rgba(0, 217, 255, ${0.3 + Math.sin(ship.enginePulse) * 0.2})`;
        ctx.beginPath();
        ctx.arc(ship.size * 0.3, 0, ship.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawSpaceshipTrail() {
        ctx.save();
        gameState.spaceship.trail.forEach((p, i) => {
            const opacity = (i / gameState.spaceship.trail.length) * 0.5;
            ctx.fillStyle = `rgba(0, 217, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, i / 15, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }
    
    // ================================================
    // 🪐 OBJETOS CÓSMICOS (CON TODAS LAS MEJORAS)
    // ================================================

    function initializePlanets() {
        gameState.cosmicObjects = gameState.cosmicObjects.filter(obj => !obj.isStatic);
        const planetCount = Math.min(6, Math.max(4, Math.floor(canvas.width / 200)));
        const zones = [];
        const zoneWidth = canvas.width / Math.ceil(planetCount / 2);
        const zoneHeight = canvas.height / 2;
        for (let i = 0; i < planetCount; i++) {
            zones.push({
                x: (i % Math.ceil(planetCount / 2)) * zoneWidth,
                y: Math.floor(i / Math.ceil(planetCount / 2)) * zoneHeight,
                width: zoneWidth,
                height: zoneHeight
            });
        }
        zones.forEach((zone) => {
            const planet = createCosmicObject('planet', true);
            const margin = planet.size * 1.5;
            planet.x = zone.x + margin + Math.random() * (zone.width - margin * 2);
            planet.y = zone.y + margin + Math.random() * (zone.height - margin * 2);
            planet.x = Math.max(planet.size * 2, Math.min(canvas.width - planet.size * 2, planet.x));
            planet.y = Math.max(planet.size * 2, Math.min(canvas.height - planet.size * 2, planet.y));
            planet.parallaxSpeed = 0.02 + (planet.size / 100) * 0.03;
            gameState.cosmicObjects.push(planet);
        });
    }

    function updateCosmicObjects() {
        const movingObjects = gameState.cosmicObjects.filter(obj => !obj.isStatic);
        if (movingObjects.length < CONFIG.MAX_MOVING_OBJECTS && Math.random() < 0.08) {
            const type = Math.random() > 0.5 ? 'meteorite' : 'comet';
            gameState.cosmicObjects.push(createCosmicObject(type, false));
        }

        gameState.cosmicObjects.forEach((obj, index) => {
            if (obj.isStatic) {
                obj.x -= obj.parallaxSpeed || 0.05;
                if (obj.x < -obj.size * 2) {
                    obj.x = canvas.width + obj.size * 2;
                    obj.y = Math.random() * canvas.height;
                    if (Math.random() < 0.3 && obj.planetType) {
                        obj.hasRing = Math.random() < PLANET_TYPES[obj.planetType].hasRing;
                    }
                }
            } else {
                obj.x -= obj.speed;
            }
            obj.angle += obj.rotationSpeed;
            if (obj.x < -obj.size * 2 && !obj.isStatic) {
                gameState.cosmicObjects.splice(index, 1);
            }
        });
    }

    function createCosmicObject(type, isStatic = false) {
        let size;
        const newObj = {
            type: type,
            x: isStatic ? Math.random() * canvas.width : canvas.width + 50,
            y: Math.random() * canvas.height,
            angle: Math.random() * Math.PI * 2,
            isStatic: isStatic,
        };

        switch (type) {
            case 'meteorite':
                size = 7 + Math.random() * 12;
                newObj.speed = 1.5 + Math.random() * 2.5;
                newObj.rotationSpeed = (Math.random() - 0.5) * 0.02;
                newObj.shape = [];
                const pointCount = 8 + Math.floor(Math.random() * 4);
                for (let i = 0; i < pointCount; i++) {
                    const angle = (i / pointCount) * Math.PI * 2;
                    const radius = size * (0.8 + Math.random() * 0.4);
                    newObj.shape.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
                }
                const rockColors = ['#8C7853', '#695040', '#786d63', '#5d5045'];
                newObj.color = rockColors[Math.floor(Math.random() * rockColors.length)];
                newObj.borderColor = adjustBrightness(newObj.color, -20);
                break;
            case 'comet':
                size = 6 + Math.random() * 8;
                newObj.speed = 3 + Math.random() * 4;
                newObj.rotationSpeed = 0;
                break;
            case 'planet':
                const planetTypes = Object.keys(PLANET_TYPES);
                const selectedType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
                const planetConfig = PLANET_TYPES[selectedType];
                size = planetConfig.sizeRange[0] + Math.random() * (planetConfig.sizeRange[1] - planetConfig.sizeRange[0]);
                const colorScheme = planetConfig.colors[Math.floor(Math.random() * planetConfig.colors.length)];
                newObj.color1 = colorScheme.color1;
                newObj.color2 = colorScheme.color2;
                newObj.color3 = colorScheme.color3;
                newObj.planetType = selectedType;
                newObj.hasRing = Math.random() < planetConfig.hasRing;
                newObj.ringColor = `hsla(${Math.random() * 360}, 70%, 80%, 0.4)`;
                newObj.ringWidth = 0.15 + Math.random() * 0.1;
                if (planetConfig.hasCraters) newObj.craters = generateCraters(3 + Math.floor(Math.random() * 5));
                if (planetConfig.hasBands) newObj.bands = 2 + Math.floor(Math.random() * 3);
                if (planetConfig.hasStorms && Math.random() < planetConfig.hasStorms) {
                    newObj.stormAngle = Math.random() * Math.PI * 2;
                    newObj.stormSize = 0.2 + Math.random() * 0.3;
                }
                if (planetConfig.hasAurora) newObj.auroraPhase = 0;
                if (planetConfig.pulseEffect) newObj.pulsePhase = 0;
                if (planetConfig.hasGlow) newObj.glowIntensity = 0.3 + Math.random() * 0.3;
                newObj.rotationSpeed = (Math.random() - 0.5) * 0.005;
                break;
        }
        newObj.size = size;
        return newObj;
    }

    function drawCosmicObjects(isPlanetLayer) {
        gameState.cosmicObjects.forEach(obj => {
            const isPlanet = obj.type === 'planet';
            if ((isPlanetLayer && !isPlanet) || (!isPlanetLayer && isPlanet)) {
                 return;
            }
            ctx.save();
            ctx.translate(obj.x, obj.y);
            // Aplicar rotación solo si el objeto la tiene definida
            if(obj.rotationSpeed) {
                ctx.rotate(obj.angle);
            }

            switch (obj.type) {
                case 'meteorite':
                    ctx.fillStyle = obj.color;
                    ctx.strokeStyle = obj.borderColor;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(obj.shape[0].x, obj.shape[0].y);
                    for (let i = 1; i < obj.shape.length; i++) {
                        ctx.lineTo(obj.shape[i].x, obj.shape[i].y);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    break;
                case 'comet':
                    ctx.rotate(Math.PI);
                    const tailGradient = ctx.createLinearGradient(0, 0, obj.size * 12, 0);
                    tailGradient.addColorStop(0, 'rgba(0, 217, 255, 0.7)');
                    tailGradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.3)');
                    tailGradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
                    ctx.fillStyle = tailGradient;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(obj.size * 6, -obj.size, obj.size * 15, 0);
                    ctx.quadraticCurveTo(obj.size * 6, obj.size, 0, 0);
                    ctx.fill();
                    const headGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, obj.size * 1.5);
                    headGradient.addColorStop(0, 'white');
                    headGradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
                    ctx.fillStyle = headGradient;
                    ctx.beginPath();
                    ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'planet':
                    if (obj.auroraPhase !== undefined) obj.auroraPhase += 0.02;
                    if (obj.pulsePhase !== undefined) obj.pulsePhase += 0.03;
                    if (obj.hasRing && obj.angle < 0) drawPlanetRings(ctx, obj);
                    if (obj.glowIntensity) {
                        const glowGradient = ctx.createRadialGradient(0, 0, obj.size * 0.8, 0, 0, obj.size * 1.5);
                        glowGradient.addColorStop(0, 'transparent');
                        glowGradient.addColorStop(1, `rgba(200, 230, 255, ${obj.glowIntensity})`);
                        ctx.fillStyle = glowGradient;
                        ctx.beginPath();
                        ctx.arc(0, 0, obj.size * 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    const planetGradient = ctx.createRadialGradient(-obj.size * 0.3, -obj.size * 0.3, 0, 0, 0, obj.size);
                    planetGradient.addColorStop(0, obj.color3);
                    planetGradient.addColorStop(0.5, obj.color1);
                    planetGradient.addColorStop(0.85, obj.color2);
                    planetGradient.addColorStop(1, adjustBrightness(obj.color2, -30));
                    ctx.fillStyle = planetGradient;
                    ctx.beginPath();
                    ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
                    ctx.fill();
                    if (obj.bands) drawPlanetBands(ctx, obj);
                    if (obj.craters) drawCraters(ctx, obj);
                    if (obj.stormAngle !== undefined) drawStorm(ctx, obj);
                    if (obj.auroraPhase !== undefined) drawAurora(ctx, obj);
                    if (obj.pulsePhase !== undefined) {
                        const pulseAlpha = 0.2 + Math.sin(obj.pulsePhase) * 0.15;
                        ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
                        ctx.beginPath();
                        ctx.arc(0, 0, obj.size * 0.9, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    const atmosphereGradient = ctx.createRadialGradient(0, 0, obj.size * 0.9, 0, 0, obj.size * 1.2);
                    atmosphereGradient.addColorStop(0, 'transparent');
                    atmosphereGradient.addColorStop(0.7, 'transparent');
                    atmosphereGradient.addColorStop(1, `${obj.color3}33`);
                    ctx.fillStyle = atmosphereGradient;
                    ctx.beginPath();
                    ctx.arc(0, 0, obj.size * 1.2, 0, Math.PI * 2);
                    ctx.fill();
                    if (obj.hasRing && obj.angle >= 0) drawPlanetRings(ctx, obj);
                    break;
            }
            ctx.restore();
        });
    }

    // ================================================
    // 🎨 FUNCIONES AUXILIARES DE RENDERIZADO (NUEVAS)
    // ================================================

    function drawPlanetRings(ctx, planet) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        const ringCount = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < ringCount; i++) {
            const innerRadius = planet.size * (1.4 + i * 0.3);
            const outerRadius = innerRadius + planet.size * planet.ringWidth;
            const ringGradient = ctx.createRadialGradient(0, 0, innerRadius, 0, 0, outerRadius);
            ringGradient.addColorStop(0, 'transparent');
            ringGradient.addColorStop(0.2, planet.ringColor);
            ringGradient.addColorStop(0.8, planet.ringColor);
            ringGradient.addColorStop(1, 'transparent');
            ctx.strokeStyle = ringGradient;
            ctx.lineWidth = outerRadius - innerRadius;
            ctx.beginPath();
            ctx.save();
            ctx.scale(1, 0.3);
            ctx.arc(0, 0, (innerRadius + outerRadius) / 2, 0, Math.PI * 2);
            ctx.restore();
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawPlanetBands(ctx, planet) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < planet.bands; i++) {
            const y = -planet.size + (i + 1) * (planet.size * 2 / (planet.bands + 1));
            const width = Math.sqrt(planet.size * planet.size - (y * y)) * 2;
            ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
            ctx.fillRect(-width / 2, y - planet.size * 0.05, width, planet.size * 0.1);
        }
        ctx.restore();
    }

    function generateCraters(count) {
        const craters = [];
        for (let i = 0; i < count; i++) {
            craters.push({
                angle: Math.random() * Math.PI * 2,
                distance: 0.3 + Math.random() * 0.5,
                size: 0.05 + Math.random() * 0.15
            });
        }
        return craters;
    }

    function drawCraters(ctx, planet) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        planet.craters.forEach(crater => {
            const x = Math.cos(crater.angle) * crater.distance * planet.size;
            const y = Math.sin(crater.angle) * crater.distance * planet.size;
            const size = crater.size * planet.size;
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
        ctx.restore();
    }

    function drawStorm(ctx, planet) {
        ctx.save();
        const x = Math.cos(planet.stormAngle) * planet.size * 0.5;
        const y = Math.sin(planet.stormAngle) * planet.size * 0.3;
        const stormSize = planet.stormSize * planet.size;
        const stormGradient = ctx.createRadialGradient(x, y, 0, x, y, stormSize);
        stormGradient.addColorStop(0, 'rgba(255,255,255,0.8)');
        stormGradient.addColorStop(0.5, 'rgba(200,200,200,0.5)');
        stormGradient.addColorStop(1, 'rgba(150,150,150,0.2)');
        ctx.fillStyle = stormGradient;
        ctx.beginPath();
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(planet.angle * 10);
        ctx.scale(1.5, 1);
        ctx.arc(0, 0, stormSize, 0, Math.PI * 2);
        ctx.restore();
        ctx.fill();
        ctx.restore();
    }

    function drawAurora(ctx, planet) {
        ctx.save();
        ctx.globalAlpha = 0.3 + Math.sin(planet.auroraPhase) * 0.2;
        const auroraGradient = ctx.createLinearGradient(0, -planet.size, 0, -planet.size * 0.5);
        auroraGradient.addColorStop(0, 'rgba(0,255,200,0.8)');
        auroraGradient.addColorStop(0.5, 'rgba(100,255,150,0.4)');
        auroraGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = auroraGradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, 0, Math.PI, true);
        ctx.fill();
        ctx.restore();
    }

    function adjustBrightness(color, amount) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }

    // ================================================
    // 💥 PARTÍCULAS, COLISIONES Y EFECTOS (Sin cambios)
    // ================================================

    function createParticleExplosion(x, y, size) {
        const particleCount = Math.floor(size * 1.5);
        for (let i = 0; i < particleCount; i++) {
            gameState.particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                size: Math.random() * 2 + 1,
                color: `hsl(${180 + Math.random() * 60}, 100%, ${60 + Math.random() * 40}%)`
            });
        }
    }

    function updateParticles() {
        for (let i = gameState.particles.length - 1; i >= 0; i--) {
            const p = gameState.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.025;
            if (p.life <= 0) gameState.particles.splice(i, 1);
        }
    }

    function drawParticles() {
        ctx.save();
        gameState.particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }

    function checkCollisions() {
        gameState.cosmicObjects.forEach((obj, index) => {
            if (!obj.isStatic) {
                const dx = gameState.spaceship.x - obj.x;
                const dy = gameState.spaceship.y - obj.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < gameState.spaceship.size / 2 + obj.size) {
                    handleCollision(obj, index);
                }
            }
        });
    }

    function handleCollision(obj, index) {
        createParticleExplosion(obj.x, obj.y, obj.size);
        gameState.score += CONFIG.POINTS_PER_OBJECT;
        updateUI();
        gameState.cosmicObjects.splice(index, 1);
    }

    // ================================================
    // 🛸 SISTEMA DE OVNI ANIMADO (CORREGIDO Y RESTAURADO)
    // ================================================

    function createFooterShipIfNeeded() {
        let footerShip = document.getElementById('footer-ship');
        if (!footerShip) {
            const footer = document.querySelector('.quantum-footer');
            if (!footer) { return; }
            footerShip = document.createElement('div');
            footerShip.id = 'footer-ship';
            footerShip.className = 'footer-ship';
            footerShip.textContent = '🛸';
            let particlesContainer = footer.querySelector('.footer-particles');
            if (!particlesContainer) {
                particlesContainer = document.createElement('div');
                particlesContainer.className = 'footer-particles';
                footer.appendChild(particlesContainer);
            }
            particlesContainer.appendChild(footerShip);
        }
        return footerShip;
    }

    function startFooterEffects() {
        const footerShip = createFooterShipIfNeeded();
        const footer = document.querySelector('.quantum-footer');
        if (!footer || !footerShip) {
            console.error('⚠️ No se pueden iniciar efectos del footer');
            return;
        }

        let shipPosition = -100;
        let shipDirection = 1;
        let screenWidth = window.innerWidth;
        let maxPosition = screenWidth + 100;

        footerShip.style.position = 'absolute';
        footerShip.style.bottom = '20px';
        footerShip.style.fontSize = '2.5rem';
        footerShip.style.filter = 'drop-shadow(0 0 15px var(--neon-cyan))';
        footerShip.style.zIndex = '10';
        footerShip.style.transition = 'transform 0.1s ease-out';
        footerShip.style.left = shipPosition + 'px';

        function moveShip() {
            shipPosition += shipDirection * 3;
            if (shipDirection === 1 && shipPosition >= maxPosition) {
                shipDirection = -1;
                footerShip.style.transform = 'scaleX(-1)';
                footerShip.style.filter = 'drop-shadow(0 0 15px var(--neon-magenta))';
            } else if (shipDirection === -1 && shipPosition <= -100) {
                shipDirection = 1;
                footerShip.style.transform = 'scaleX(1)';
                footerShip.style.filter = 'drop-shadow(0 0 15px var(--neon-cyan))';
            }

            const centerZone = screenWidth / 2;
            const distanceFromCenter = Math.abs(shipPosition - centerZone);
            if (distanceFromCenter < 150) {
                footerShip.style.filter = 'drop-shadow(0 0 25px var(--neon-yellow))';
                const baseTransform = shipDirection === -1 ? 'scaleX(-1)' : 'scaleX(1)';
                footerShip.style.transform = baseTransform + ' scale(1.4) translateY(-5px)';
            } else {
                const baseTransform = shipDirection === -1 ? 'scaleX(-1)' : 'scaleX(1)';
                footerShip.style.transform = baseTransform;
            }
            footerShip.style.left = shipPosition + 'px';
        }

        const shipInterval = setInterval(moveShip, 50);

        function updateScreenSize() {
            screenWidth = window.innerWidth;
            maxPosition = screenWidth + 100;
        }
        window.addEventListener('resize', updateScreenSize);

        function createFooterExplosion() {
            const effects = ['✨', '💫', '⭐', '🌟', '💥'];
            const colors = ['var(--neon-cyan)', 'var(--neon-yellow)', 'var(--neon-magenta)', 'var(--plasma-green)'];
            const explosion = document.createElement('div');
            explosion.textContent = effects[Math.floor(Math.random() * effects.length)];
            explosion.style.position = 'absolute';
            explosion.style.bottom = Math.random() * 40 + 10 + 'px';
            explosion.style.left = Math.random() * 90 + 5 + '%';
            explosion.style.fontSize = Math.random() * 1 + 1.2 + 'rem';
            explosion.style.color = colors[Math.floor(Math.random() * colors.length)];
            explosion.style.pointerEvents = 'none';
            explosion.style.zIndex = '5';
            explosion.style.animation = 'footerBoom 2s ease-out forwards';
            footer.appendChild(explosion);
            setTimeout(() => explosion.remove(), 2000);
        }

        setInterval(createFooterExplosion, 3000);

        if (!document.querySelector('#footer-animations')) {
            const style = document.createElement('style');
            style.id = 'footer-animations';
            style.textContent = `@keyframes footerBoom { 0% { transform: scale(0.3) translateY(0) rotate(0deg); opacity: 1; } 50% { transform: scale(1.5) translateY(-20px) rotate(180deg); opacity: 0.9; } 100% { transform: scale(2.5) translateY(-40px) rotate(360deg); opacity: 0; } }`;
            document.head.appendChild(style);
        }
    }

    // ================================================
    // 🏆 FIN DE JUEGO Y NIVELES (Sin cambios)
    // ================================================

    function gameOver() {
        completeGame("<i class='fas fa-skull-crossbones modal-title-icon'></i> Misión Fallida", "Te has quedado sin vidas. ¡El universo es un lugar implacable!");
    }

    function completeLevel() {
        gameState.isPaused = true;
        gameState.score += CONFIG.LEVEL_BONUS_MULTIPLIER * gameState.currentLevel;
        updateUI();
        modalContent.levelUpTitle.innerHTML = `<i class="fas fa-medal modal-title-icon"></i> Nivel ${gameState.currentLevel} Completado`;
        modalContent.levelUpText.textContent = `Has superado los desafíos del nivel ${CONFIG.LEVELS[gameState.currentLevel].name}. ¡Prepárate para la siguiente fase!`;
        const accuracy = (gameState.correctAnswers / gameState.questionsAnswered * 100 || 0).toFixed(1);
        const grade = calculateGrade();
        modalContent.levelUpStats.innerHTML = `<div>Precisión: <span class="text-cyan-400">${accuracy}%</span></div><div>Nota Actual: <span class="text-yellow-400">${grade} ⭐</span></div><div>Bonus Nivel: <span class="text-green-400">+${CONFIG.LEVEL_BONUS_MULTIPLIER * gameState.currentLevel} pts</span></div><div>Puntaje Total: <span class="text-purple-400">${gameState.score}</span></div>`;
        const nextLevelExists = !!CONFIG.LEVELS[gameState.currentLevel + 1];
        modalContent.nextLevelButton.querySelector('.button-text').textContent = nextLevelExists ? 'Siguiente Nivel' : 'Ver Resultados Finales';
        showModal(modals.levelUp);
    }

    function advanceToNextLevel() {
        hideModal(modals.levelUp);
        const nextLevel = gameState.currentLevel + 1;
        if (CONFIG.LEVELS[nextLevel]) {
            gameState.currentLevel = nextLevel;
            gameState.currentLevelProgress = 0;
            ui.levelSelect.value = nextLevel;
            generateAdvancedQuestionPool();
            updateUI();
            gameState.isPaused = false;
        } else {
            completeGame("<i class='fas fa-trophy modal-title-icon'></i> ¡Misión Cumplida!", "Has demostrado un dominio excepcional de la física. ¡El cosmos te aclama!");
        }
    }

    function completeGame(title, message) {
        gameState.isGameActive = false;
        gameState.isPaused = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        modalContent.finalStatsTitle.innerHTML = title;
        const accuracy = (gameState.correctAnswers / gameState.questionsAnswered * 100 || 0).toFixed(1);
        const grade = calculateGrade();
        modalContent.finalStatsContent.innerHTML = `<p class="text-lg mb-4">${message}</p><div class="grid grid-cols-2 gap-2 text-left"><strong>Puntaje Final:</strong> <span class="text-quantum-blue font-bold">${gameState.score}</span><strong>Preguntas:</strong> <span>${gameState.correctAnswers} / ${gameState.questionsAnswered}</span><strong>Precisión:</strong> <span>${accuracy}%</span><strong>Calificación:</strong> <span class="text-neon-yellow font-bold">${grade} / 5.0 ⭐</span></div>`;
        showModal(modals.finalStats);
    }

    function calculateGrade() {
        if (gameState.questionsAnswered === 0) return "0.0";
        return ((gameState.correctAnswers / gameState.questionsAnswered) * 5.0).toFixed(1);
    }

    // ================================================
    // 🎛️ EVENTOS Y MANEJO DE LA UI (Sin cambios)
    // ================================================

    function setupEventListeners() {
        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', e => {
            if (!gameState.isGameActive) return;
            const rect = canvas.getBoundingClientRect();
            gameState.spaceship.targetX = e.clientX - rect.left;
            gameState.spaceship.targetY = e.clientY - rect.top;
        });
        canvas.addEventListener('touchmove', e => {
            if (!gameState.isGameActive) return;
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            gameState.spaceship.targetX = e.touches[0].clientX - rect.left;
            gameState.spaceship.targetY = e.touches[0].clientY - rect.top;
        }, { passive: false });
        ui.startButton.addEventListener('click', () => !gameState.isGameActive ? startGame() : askQuestion());
        ui.pauseButton.addEventListener('click', togglePause);
        ui.resetButton.addEventListener('click', () => fullReset());
        ui.helpButton.addEventListener('click', () => showModal(modals.help));
        modalContent.answerButton.addEventListener('click', submitAnswer);
        modalContent.nextButton.addEventListener('click', () => {
            hideModal(modals.feedback);
            if (gameState.isGameActive && gameState.lives > 0) gameState.isPaused = false;
        });
        modalContent.closeHelp.addEventListener('click', () => hideModal(modals.help));
        modalContent.resumeButton.addEventListener('click', togglePause);
        modalContent.restartFromPause.addEventListener('click', () => fullReset());
        modalContent.nextLevelButton.addEventListener('click', advanceToNextLevel);
        modalContent.restartGameButton.addEventListener('click', () => fullReset());
    }

    function updateUI() {
        ui.level.textContent = gameState.currentLevel;
        ui.score.textContent = gameState.score;
        ui.livesContainer.innerHTML = Array.from({ length: CONFIG.INITIAL_LIVES }, (_, i) => `<i class="fas fa-heart ${i < gameState.lives ? '' : 'text-gray-700 opacity-50'}"></i>`).join('');
        const progressTarget = CONFIG.LEVELS[gameState.currentLevel].questions;
        ui.progress.textContent = `${gameState.currentLevelProgress}/${progressTarget}`;
        ui.progressFill.style.width = `${(gameState.currentLevelProgress / progressTarget) * 100}%`;
        ui.grade.textContent = calculateGrade();
        const topicName = Array.from(ui.topicCheckboxes).find(cb => cb.value === gameState.selectedTopics[0])?.nextElementSibling.querySelector('span').textContent || 'Varios';
        ui.currentTopic.textContent = gameState.selectedTopics.length > 1 ? 'Mixto' : topicName;
    }

    function showModal(modalElement) {
        if(modalElement) modalElement.style.display = 'flex';
    }

    function hideModal(modalElement) {
        if(modalElement) modalElement.style.display = 'none';
    }

    // --- Iniciar el juego ---
    init();
});

console.log('✅ Motor de juego v5.2 FINAL cargado - Animaciones del Footer Restauradas');
