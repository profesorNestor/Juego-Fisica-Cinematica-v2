// ================================================
// 🎮 MOTOR PRINCIPAL DEL JUEGO DE FÍSICA ESPACIAL
// Archivo: game.js - VERSIÓN MEJORADA CON MODALES VERTICALES Y MATHJAX FUNCIONAL
// ================================================

console.log('🎮 Cargando motor del juego...');

// ================================================
// 📱 DETECCIÓN DE DISPOSITIVO Y CONFIGURACIÓN EXTENDIDA
// ================================================

function getDeviceType() {
    if (window.orientationManager) {
        return window.orientationManager.getDeviceType();
    }
    
    // Fallback si OrientationManager no está disponible
    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxDimension = Math.max(width, height);
    const minDimension = Math.min(width, height);
    
    // 📱 Detección más precisa
    if (maxDimension < 768) return 'mobile';
    if (maxDimension < 1024) return 'tablet';
    if (minDimension < 768) return 'mobile-large'; // Móvil grande en landscape
    return 'desktop';
}

const deviceType = getDeviceType();
console.log('📱 Dispositivo detectado:', deviceType);

// ================================================
// 📐 CONFIGURACIÓN ADAPTABLE CON ORIENTACIÓN
// ================================================

// Configuración original
const ADAPTIVE_CONFIG = {
    desktop: { 
        MAX_STARS: 300, 
        COSMIC_OBJECTS: { 
            meteorites: { count: 7, minSpeed: 1.5, maxSpeed: 2.5, size: 25 }, 
            planets: { count: 8, speed: 0, size: 50 }, 
            comets: { count: 4, minSpeed: 2.5, maxSpeed: 3.5, size: 20 } 
        },
        SPACESHIP: { size: 30 }
    },
    tablet: { 
        MAX_STARS: 200, 
        COSMIC_OBJECTS: { 
            meteorites: { count: 5, minSpeed: 1.2, maxSpeed: 2.0, size: 18 }, 
            planets: { count: 6, speed: 0, size: 35 }, 
            comets: { count: 3, minSpeed: 2.0, maxSpeed: 3.0, size: 15 } 
        },
        SPACESHIP: { size: 22 }
    },
    mobile: { 
        MAX_STARS: 120, 
        COSMIC_OBJECTS: { 
            meteorites: { count: 4, minSpeed: 1.0, maxSpeed: 1.8, size: 15 }, 
            planets: { count: 4, speed: 0, size: 28 }, 
            comets: { count: 2, minSpeed: 1.8, maxSpeed: 2.5, size: 12 } 
        },
        SPACESHIP: { size: 18 }
    }
};

// 📐 Configuración específica para orientación
const ORIENTATION_CONFIG = {
    mobile: {
        landscape: {
            MAX_STARS: 80,
            COSMIC_OBJECTS: {
                meteorites: { count: 3, minSpeed: 1.0, maxSpeed: 1.5, size: 12 },
                planets: { count: 3, speed: 0, size: 20 },
                comets: { count: 2, minSpeed: 1.5, maxSpeed: 2.0, size: 10 }
            },
            SPACESHIP: { size: 16, speed: 2.5 }
        },
        portrait: {
            MAX_STARS: 120,
            COSMIC_OBJECTS: {
                meteorites: { count: 4, minSpeed: 1.0, maxSpeed: 1.8, size: 15 },
                planets: { count: 4, speed: 0, size: 28 },
                comets: { count: 2, minSpeed: 1.8, maxSpeed: 2.5, size: 12 }
            },
            SPACESHIP: { size: 18, speed: 2 }
        }
    },
    tablet: {
        landscape: {
            MAX_STARS: 180,
            COSMIC_OBJECTS: {
                meteorites: { count: 4, minSpeed: 1.2, maxSpeed: 2.0, size: 16 },
                planets: { count: 5, speed: 0, size: 32 },
                comets: { count: 3, minSpeed: 2.0, maxSpeed: 3.0, size: 14 }
            },
            SPACESHIP: { size: 20, speed: 2.2 }
        },
        portrait: {
            MAX_STARS: 200,
            COSMIC_OBJECTS: {
                meteorites: { count: 5, minSpeed: 1.2, maxSpeed: 2.0, size: 18 },
                planets: { count: 6, speed: 0, size: 35 },
                comets: { count: 3, minSpeed: 2.0, maxSpeed: 3.0, size: 15 }
            },
            SPACESHIP: { size: 22, speed: 2 }
        }
    },
    'mobile-large': {
        landscape: {
            MAX_STARS: 100,
            COSMIC_OBJECTS: {
                meteorites: { count: 3, minSpeed: 1.1, maxSpeed: 1.6, size: 14 },
                planets: { count: 4, speed: 0, size: 24 },
                comets: { count: 2, minSpeed: 1.6, maxSpeed: 2.2, size: 11 }
            },
            SPACESHIP: { size: 17, speed: 2.3 }
        },
        portrait: {
            MAX_STARS: 140,
            COSMIC_OBJECTS: {
                meteorites: { count: 4, minSpeed: 1.1, maxSpeed: 1.9, size: 16 },
                planets: { count: 5, speed: 0, size: 30 },
                comets: { count: 3, minSpeed: 1.9, maxSpeed: 2.6, size: 13 }
            },
            SPACESHIP: { size: 19, speed: 2.1 }
        }
    }
};

// ================================================
// 📐 FUNCIÓN PARA OBTENER CONFIGURACIÓN SEGÚN ORIENTACIÓN
// ================================================

function getOrientationAwareConfig() {
    const deviceType = getDeviceType();
    const orientation = window.orientationManager ? 
        window.orientationManager.currentOrientation : 
        (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    
    // 🎯 Usar configuración específica de orientación si está disponible
    if (ORIENTATION_CONFIG[deviceType] && ORIENTATION_CONFIG[deviceType][orientation]) {
        return {
            deviceType,
            orientation,
            config: ORIENTATION_CONFIG[deviceType][orientation]
        };
    }
    
    // 🔄 Fallback a configuración original
    return {
        deviceType,
        orientation,
        config: ADAPTIVE_CONFIG[deviceType] || ADAPTIVE_CONFIG.mobile
    };
}

// ================================================
// 🎵 SISTEMA DE AUDIO
// ================================================

class AudioSystem {
    constructor() {
        this.enabled = true;
        this.context = null;
    }

    async init() {
        if (this.context) return;
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎵 Audio inicializado');
        } catch (error) {
            this.enabled = false;
            console.warn('⚠️ Audio no disponible');
        }
    }

    createTone(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.context) return;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
        oscillator.type = type;
        gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    play(type) {
        if (!this.enabled || !this.context) return;
        switch (type) {
            case 'success':
                this.createTone(800, 0.1, 'square');
                setTimeout(() => this.createTone(1000, 0.1, 'square'), 100);
                break;
            case 'error':
                this.createTone(200, 0.3, 'sawtooth');
                break;
            case 'collision':
                this.createTone(300, 0.2, 'triangle');
                break;
            case 'levelUp':
                this.createTone(600, 0.2, 'sine');
                setTimeout(() => this.createTone(800, 0.2, 'sine'), 200);
                setTimeout(() => this.createTone(1000, 0.3, 'sine'), 400);
                break;
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// ================================================
// 🎮 CONFIGURACIÓN Y ESTADO DEL JUEGO
// ================================================

let CONFIG = {
    INITIAL_LIVES: 5,
    POINTS_PER_CORRECT: 100,
    LEVEL_BONUS_MULTIPLIER: 50,
    SPACESHIP: { speed: 2 },
    LEVELS: { 
        1: { questions: 10, name: "Cadete Espacial" }, 
        2: { questions: 20, name: "Piloto Avanzado" }, 
        3: { questions: 30, name: "Comandante Supremo" } 
    }
};

let gameState = {};
let audioSystem = null;

// ================================================
// 🔄 FUNCIÓN PARA ACTUALIZAR CONFIGURACIÓN SEGÚN ORIENTACIÓN
// ================================================

function updateConfigForOrientation() {
    const orientationConfig = getOrientationAwareConfig();
    
    // 🔄 Actualizar CONFIG global con configuración específica de orientación
    Object.assign(CONFIG, orientationConfig.config);
    
    console.log('🎯 Configuración actualizada para:', {
        device: orientationConfig.deviceType,
        orientation: orientationConfig.orientation,
        stars: CONFIG.MAX_STARS,
        meteorites: CONFIG.COSMIC_OBJECTS.meteorites.count
    });
}

// ================================================
// 🌟 SISTEMA DE RENDERIZADO MATEMÁTICO MEJORADO
// ================================================

window.mathRenderSystem = {
    isInitialized: false,
    renderQueue: [],
    isProcessing: false,
    
    initialize() {
        this.isInitialized = true;
        console.log('🔬 Sistema matemático inicializado');
        this.processQueue();
    },
    
    async queueRender(container, delay = 0) {
        return new Promise((resolve, reject) => {
            this.renderQueue.push({ container, delay, resolve, reject });
            if (!this.isProcessing) {
                this.processQueue();
            }
        });
    },
    
    async processQueue() {
        if (this.isProcessing || this.renderQueue.length === 0) return;
        this.isProcessing = true;
        
        while (this.renderQueue.length > 0) {
            const { container, delay, resolve, reject } = this.renderQueue.shift();
            try {
                if (delay > 0) {
                    await new Promise(res => setTimeout(res, delay));
                }
                await this.renderMath(container);
                resolve();
            } catch (error) {
                console.error('❌ Error en renderizado:', error);
                reject(error);
            }
        }
        this.isProcessing = false;
    },
    
    async renderMath(container) {
        if (!window.MathJax) {
            console.warn('⚠️ MathJax no está disponible aún');
            return;
        }
        
        try {
            // 🔧 Esperar a que MathJax esté completamente listo
            await MathJax.startup.promise;
            
            if (container) {
                // 🔧 Limpiar renderizado previo
                MathJax.typesetClear([container]);
            }
            
            // 🔧 Renderizar nuevo contenido
            const elements = container ? [container] : undefined;
            await MathJax.typesetPromise(elements);
            
            console.log('✅ Matemáticas renderizadas correctamente');
        } catch (error) {
            console.error('❌ Error renderizando MathJax:', error);
            throw error;
        }
    }
};

// ================================================
// 🚨 SISTEMA DE GESTIÓN DE MODALES MEJORADO
// ================================================

const ModalManager = {
    activeModals: new Set(),
    modalStack: [],
    
    // 🚨 Registrar modal activo
    openModal(modalId, type = 'normal') {
        const modal = document.getElementById(modalId);
        if (!modal) return false;
        
        // 🔧 Manejar conflictos específicos
        if (type === 'question') {
            // Cerrar cualquier modal de curiosidad que esté abierto
            this.closeModalsByType('curiosity');
        } else if (type === 'curiosity') {
            // Solo mostrar curiosidad si NO hay una pregunta activa
            if (this.hasModalOfType('question')) {
                console.warn('⚠️ No se puede mostrar curiosidad mientras hay una pregunta activa');
                return false;
            }
        }
        
        this.activeModals.add(modalId);
        this.modalStack.push({ id: modalId, type });
        
        modal.style.display = 'flex';
        console.log(`📋 Modal abierto: ${modalId} (tipo: ${type})`);
        return true;
    },
    
    // 🚨 Cerrar modal específico
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        this.activeModals.delete(modalId);
        this.modalStack = this.modalStack.filter(m => m.id !== modalId);
        
        modal.style.display = 'none';
        console.log(`📋 Modal cerrado: ${modalId}`);
    },
    
    // 🚨 Cerrar todos los modales
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        this.activeModals.clear();
        this.modalStack = [];
        console.log('📋 Todos los modales cerrados');
    },
    
    // 🚨 Cerrar modales por tipo
    closeModalsByType(type) {
        const modalsToClose = this.modalStack.filter(m => m.type === type);
        modalsToClose.forEach(modal => {
            this.closeModal(modal.id);
        });
    },
    
    // 🚨 Verificar si hay modal de cierto tipo
    hasModalOfType(type) {
        return this.modalStack.some(m => m.type === type);
    },
    
    // 🚨 Obtener modal activo del tope
    getTopModal() {
        return this.modalStack.length > 0 ? this.modalStack[this.modalStack.length - 1] : null;
    }
};

// ================================================
// 🎯 INICIALIZACIÓN DEL JUEGO
// ================================================

function initializeDOMElements() {
    window.elements = {
        canvas: document.getElementById('gameCanvas'),
        ctx: null,
        level: document.getElementById('level'),
        lives: document.getElementById('livesContainer'),
        score: document.getElementById('score'),
        progress: document.getElementById('progress'),
        progressFill: document.getElementById('progressFill'),
        grade: document.getElementById('grade'),
        currentTopic: document.getElementById('currentTopic'),
        topicCheckboxes: document.querySelectorAll('input[name="gameTopics"]'),
        levelSelect: document.getElementById('levelSelect'),
        startButton: document.getElementById('startButton'),
        startButtonText: document.getElementById('startButtonText'),
        pauseButton: document.getElementById('pauseButton'),
        helpButton: document.getElementById('helpButton'),
        resetButton: document.getElementById('resetButton'),
        questionModal: document.getElementById('questionModal'),
        feedbackModal: document.getElementById('feedbackModal'),
        helpModal: document.getElementById('helpModal'),
        levelUpModal: document.getElementById('levelUpModal'),
        pauseModal: document.getElementById('pauseModal'),
        finalStatsModal: document.getElementById('finalStatsModal'),
        questionData: document.getElementById('questionData'),
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('optionsContainer'),
        answerButton: document.getElementById('answerButton'),
        feedbackTitle: document.getElementById('feedbackTitle'),
        feedbackText: document.getElementById('feedbackText'),
        solutionContainer: document.getElementById('solution-container'),
        nextButton: document.getElementById('nextButton'),
        finalStatsTitle: document.getElementById('finalStatsTitle'),
        finalStatsContent: document.getElementById('finalStatsContent'),
        restartGameButton: document.getElementById('restartGameButton'),
        footerAuthor: document.getElementById('footer-author'),
        footerShip: document.getElementById('footer-ship')
    };
    
    elements.ctx = elements.canvas.getContext('2d');
    console.log('📝 Elementos DOM inicializados');
}

function resizeCanvas() {
    const statsHeight = document.querySelector('.stats-bar').offsetHeight || 60;
    const controlsHeight = document.querySelector('.controls-container').offsetHeight || 120;
    const footerHeight = document.querySelector('.galactic-footer').offsetHeight || 40;
    
    // 📐 Considerar orientación
    const isLandscapeMobile = window.orientationManager && 
        window.orientationManager.isMobile() && 
        window.orientationManager.isLandscape();
    
    let availableHeight = window.innerHeight - statsHeight - controlsHeight - footerHeight;
    
    // 📱 Ajustes específicos para móvil horizontal
    if (isLandscapeMobile) {
        availableHeight = Math.max(availableHeight, 200); // Altura mínima
        
        // 🎯 Reducir padding del header/footer en horizontal
        const extraPadding = 20; // Espacio extra para seguridad
        availableHeight -= extraPadding;
    }
    
    elements.canvas.width = window.innerWidth;
    elements.canvas.height = Math.max(availableHeight, 200);
    
    // 🚀 Reposicionar nave si existe
    if (gameState && gameState.spaceship) {
        const spaceshipX = isLandscapeMobile ? elements.canvas.width / 6 : elements.canvas.width / 4;
        gameState.spaceship.x = spaceshipX;
        gameState.spaceship.y = elements.canvas.height / 2;
        gameState.spaceship.targetX = gameState.spaceship.x;
        gameState.spaceship.targetY = gameState.spaceship.y;
    }
    
    console.log('📐 Canvas redimensionado:', {
        width: elements.canvas.width,
        height: elements.canvas.height,
        orientation: window.orientationManager?.currentOrientation,
        isMobile: window.orientationManager?.isMobile()
    });
}

function resetGameState() {
    // 🔄 Actualizar configuración para orientación actual
    updateConfigForOrientation();
    
    const levelValue = parseInt(elements.levelSelect.value);
    const selectedTopics = Array.from(elements.topicCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    if (selectedTopics.length === 0) {
        selectedTopics.push('magnitudes');
        document.getElementById('topicMagnitudes').checked = true;
    }
    
    gameState = {
        isGameActive: false,
        isPaused: false,
        currentLevel: levelValue,
        selectedTopics: selectedTopics,
        lives: CONFIG.INITIAL_LIVES,
        score: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        currentLevelProgress: 0,
        currentQuestion: null,
        selectedAnswer: null,
        levelQuestionPool: [],
        particles: [],
        footerParticles: [],
        stars: [],
        spaceship: {
            x: elements.canvas.width / 4,
            y: elements.canvas.height / 2,
            targetX: elements.canvas.width / 4,
            targetY: elements.canvas.height / 2,
            trail: [],
            angle: 0
        },
        cosmicObjects: { meteorites: [], planets: [], comets: [] },
        animationId: gameState.animationId || null,
        // 🚨 NUEVO: Estado para controlar modales
        activeModal: null,
        questionActive: false,
        curiosityBlocked: false
    };
    
    // 🚨 Limpiar modales al resetear
    ModalManager.closeAllModals();
    
    elements.startButtonText.textContent = 'Lanzar';
    console.log('🔄 Estado del juego reiniciado');
}

// ================================================
// 🌌 SISTEMA DE ESTRELLAS Y OBJETOS CÓSMICOS
// ================================================

function initializeStars() {
    gameState.stars = [];
    const starEmojis = ['✨', '⭐', '🌟'];
    const layers = 3;
    
    for (let i = 0; i < layers; i++) {
        const starCount = Math.floor((CONFIG.MAX_STARS / layers) * (i + 1));
        
        for (let j = 0; j < starCount; j++) {
            const isEmoji = Math.random() < 0.1;
            
            gameState.stars.push({
                x: Math.random() * elements.canvas.width,
                y: Math.random() * elements.canvas.height,
                speed: 0.1 + (i * 0.2) + Math.random() * 0.2,
                radius: 0.5 + Math.random() * (i + 1),
                color: `hsl(${200 + Math.random() * 60}, 100%, ${85 + Math.random() * 15}%)`,
                alpha: 0.3 + (i / layers) * 0.7,
                isEmoji: isEmoji,
                emoji: isEmoji ? starEmojis[Math.floor(Math.random() * starEmojis.length)] : null
            });
        }
    }
    console.log('⭐ Estrellas creadas:', gameState.stars.length);
}

function initializeCosmicObjects() {
    const config = CONFIG.COSMIC_OBJECTS;
    gameState.cosmicObjects = { meteorites: [], planets: [], comets: [] };
    
    // Crear meteoritos
    for (let i = 0; i < config.meteorites.count; i++) {
        gameState.cosmicObjects.meteorites.push(createCosmicObject('meteorite'));
    }
    
    // Crear cometas
    for (let i = 0; i < config.comets.count; i++) {
        gameState.cosmicObjects.comets.push(createCosmicObject('comet'));
    }
    
    // Crear planetas
    const planetEmojis = ['🪐', '🌍', '🌕', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣','🛰️'];
    const minDistance = 150;
    
    for (let i = 0; i < config.planets.count; i++) {
        let newPlanet, validPosition = false, attempts = 0;
        
        do {
            validPosition = true;
            newPlanet = {
                type: 'planet',
                x: (elements.canvas.width * 0.1) + (Math.random() * elements.canvas.width * 0.8),
                y: (elements.canvas.height * 0.1) + (Math.random() * elements.canvas.height * 0.8),
                speed: 0,
                size: config.planets.size + Math.random() * 10,
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.005,
                hasCollided: false,
                emoji: planetEmojis[i % planetEmojis.length],
                pulsePhase: Math.random() * Math.PI * 2
            };
            
            for (const existingPlanet of gameState.cosmicObjects.planets) {
                const dx = newPlanet.x - existingPlanet.x;
                const dy = newPlanet.y - existingPlanet.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }
            
            attempts++;
        } while (!validPosition && attempts < 100);
        
        gameState.cosmicObjects.planets.push(newPlanet);
    }
    
    console.log('🌌 Objetos cósmicos creados');
}

function createCosmicObject(type) {
    const config = CONFIG.COSMIC_OBJECTS[type + 's'];
    const emoji = type === 'meteorite' ? '🪨' : '☄️';
    const speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
    
    return {
        type: type,
        x: elements.canvas.width + Math.random() * 500,
        y: Math.random() * elements.canvas.height,
        speed: speed,
        size: config.size + Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        hasCollided: false,
        emoji: emoji
    };
}

// ================================================
// 📐 FUNCIONES DE GESTIÓN DE ORIENTACIÓN
// ================================================

function handleOrientationChange(newOrientation, oldOrientation, deviceType) {
    console.log(`🎮 Juego adaptándose: ${oldOrientation} → ${newOrientation} (${deviceType})`);
    
    // 🔄 Actualizar configuración
    updateConfigForOrientation();
    
    // 📐 Redimensionar canvas
    resizeCanvas();
    
    // 🌟 Reinicializar elementos visuales
    if (gameState.isGameActive || gameState.stars.length === 0) {
        initializeStars();
        initializeCosmicObjects();
    }
    
    // 🎯 Mostrar notificación visual
    showOrientationFeedback(newOrientation, deviceType);
    
    // 🎮 Pausar momentáneamente si hay una pregunta activa
    if (gameState.currentQuestion && !gameState.isPaused) {
        const wasActive = gameState.isGameActive;
        gameState.isPaused = true;
        
        setTimeout(() => {
            if (wasActive) {
                gameState.isPaused = false;
            }
        }, 500);
    }
    
    // 📱 Actualizar indicador de orientación
    updateOrientationIndicator();
}

function showOrientationFeedback(orientation, deviceType) {
    // 🎯 Mostrar feedback visual temporal
    const feedback = document.createElement('div');
    feedback.className = 'orientation-feedback';
    feedback.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 250, 255, 0.9);
            color: #0a0a1f;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 10000;
            animation: orientationPulse 2s ease-out forwards;
        ">
            📱 ${orientation === 'landscape' ? '➡️ Horizontal' : '⬆️ Vertical'}
        </div>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

function updateOrientationIndicator() {
    const indicator = document.getElementById('orientationIndicator');
    if (indicator && window.orientationManager) {
        const orientation = window.orientationManager.currentOrientation;
        indicator.textContent = orientation === 'landscape' ? '📱➡️' : '📱⬆️';
        indicator.title = `Orientación: ${orientation}`;
    }
}

// ================================================
// 🆕 CONTROLES DE ORIENTACIÓN PARA EL JUEGO
// ================================================

function addOrientationControls() {
    // 🎮 Agregar botón de orientación a los controles
    const controlsContainer = document.querySelector('.controls-container .flex');
    
    if (controlsContainer && window.orientationManager) {
        const orientationButton = document.createElement('button');
        orientationButton.id = 'orientationButton';
        orientationButton.className = 'game-button';
        orientationButton.innerHTML = `
            <span class="btn-icon">📱</span>
            <span class="btn-text">Rotar</span>
        `;
        
        orientationButton.addEventListener('click', () => {
            if (window.orientationManager.isMobile()) {
                const currentOrientation = window.orientationManager.currentOrientation;
                const targetOrientation = currentOrientation === 'portrait' ? 'landscape' : 'portrait';
                
                // 🔒 Intentar bloquear orientación
                window.orientationManager.suggestOrientationLock(targetOrientation).then(success => {
                    if (!success) {
                        // 💡 Mostrar instrucción manual
                        showOrientationInstructions(targetOrientation);
                    }
                });
            } else {
                // 🔧 En desktop, mostrar información de orientación
                window.orientationManager.logStatus();
            }
        });
        
        // 📱 Solo mostrar en móviles
        if (window.orientationManager.isMobile()) {
            controlsContainer.appendChild(orientationButton);
        }
    }
}

function showOrientationInstructions(targetOrientation) {
    const instructions = document.createElement('div');
    instructions.className = 'orientation-instructions';
    instructions.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: var(--primary-color);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            z-index: 10000;
            max-width: 300px;
            border: 1px solid var(--primary-color);
        ">
            <div style="font-size: 1.5rem; margin-bottom: 10px;">
                ${targetOrientation === 'landscape' ? '📱➡️' : '📱⬆️'}
            </div>
            <div>
                ${targetOrientation === 'landscape' ? 
                    'Gira tu dispositivo horizontalmente para mejor experiencia' : 
                    'Gira tu dispositivo verticalmente'}
            </div>
        </div>
    `;
    
    document.body.appendChild(instructions);
    
    setTimeout(() => {
        if (instructions.parentNode) {
            instructions.parentNode.removeChild(instructions);
        }
    }, 4000);
}

function setupOrientationIntegration() {
    // 🎯 Registrar callback de orientación
    if (window.orientationManager) {
        window.orientationManager.registerOrientationCallback(handleOrientationChange);
        
        // 🎮 Agregar controles de orientación
        addOrientationControls();
        
        console.log('📐 Integración de orientación configurada');
    } else {
        console.warn('⚠️ OrientationManager no disponible');
    }
    
    // 📱 Configurar indicador inicial
    updateOrientationIndicator();
}

// ================================================
// 🎛️ EVENT LISTENERS Y CONTROLES
// ================================================

function setupEventListeners() {
    elements.startButton.addEventListener('click', handleLaunchClick);
    elements.pauseButton.addEventListener('click', togglePause);
    elements.helpButton.addEventListener('click', showHelpModal);
    elements.resetButton.addEventListener('click', resetGame);
    
    document.getElementById('soundButton').addEventListener('click', () => {
        if (audioSystem) {
            const enabled = audioSystem.toggle();
            const soundIcon = document.getElementById('soundButton').querySelector('.btn-icon');
            soundIcon.innerHTML = enabled ? '🔊' : '🔇';
        }
    });
    
    // 📺 Botón de pantalla completa
    const fullscreenButton = document.getElementById('fullscreenButton');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', () => {
            if (window.orientationManager) {
                if (document.fullscreenElement) {
                    window.orientationManager.exitFullscreen();
                    fullscreenButton.querySelector('.btn-icon').innerHTML = '📺';
                } else {
                    window.orientationManager.requestFullscreen();
                    fullscreenButton.querySelector('.btn-icon').innerHTML = '📱';
                }
            }
        });
    }
    
    elements.levelSelect.addEventListener('change', () => {
        if (!gameState.isGameActive) {
            gameState.currentLevel = parseInt(elements.levelSelect.value);
            updateUI();
        }
    });
    
    elements.topicCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (!gameState.isGameActive) {
                updateSelectedTopics();
                updateTopicDisplay();
            }
        });
    });
    
    elements.answerButton.addEventListener('click', submitAnswer);
    elements.nextButton.addEventListener('click', continueAfterFeedback);
    
    document.getElementById('closeHelp').addEventListener('click', () => ModalManager.closeModal('helpModal'));
    document.getElementById('nextLevelButton').addEventListener('click', advanceLevel);
    document.getElementById('resumeButton').addEventListener('click', resumeGame);
    document.getElementById('restartFromPause').addEventListener('click', resetGame);
    elements.restartGameButton.addEventListener('click', resetGame);
    
    elements.canvas.addEventListener('mousemove', (e) => {
        const rect = elements.canvas.getBoundingClientRect();
        gameState.spaceship.targetX = e.clientX - rect.left;
        gameState.spaceship.targetY = e.clientY - rect.top;
    });
    
    elements.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = elements.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        gameState.spaceship.targetX = touch.clientX - rect.left;
        gameState.spaceship.targetY = touch.clientY - rect.top;
    }, { passive: false });
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initializeStars();
        initializeCosmicObjects();
    });
    
    elements.footerShip.addEventListener('transitionend', resetFooterShip);
    
    // 🔄 Configurar integración de orientación
    setupOrientationIntegration();
    
    console.log('🎛️ Event listeners configurados');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ================================================
// 🚀 FUNCIÓN MEJORADA PARA EL BOTÓN LANZAR
// ================================================

function handleLaunchClick() {
    if (!gameState.isGameActive) {
        // 🎯 MEJORA: Iniciar juego Y mostrar primera pregunta inmediatamente
        startGame();
    } else {
        if (!gameState.currentQuestion && !gameState.questionActive) {
            showNextQuestion();
        }
    }
}

// ================================================
// 📚 SISTEMA DE PREGUNTAS Y LÓGICA DEL JUEGO
// ================================================

function startGame() {
    if (gameState.isGameActive) return;
    
    console.log('🚀 Iniciando juego...');
    
    if (audioSystem) audioSystem.init();
    
    gameState.isGameActive = true; 
    gameState.isPaused = false;
    
    elements.pauseButton.disabled = false;
    elements.levelSelect.disabled = true; 
    elements.topicCheckboxes.forEach(cb => cb.disabled = true);
    
    const pool = gameState.selectedTopics.flatMap(topic => {
        const topicQuestions = getQuestionsByTopic(topic) || [];
        return topicQuestions.map(q => ({ ...q, topic: topic }));
    });
    
    if (pool.length === 0) { 
        alert("❌ Error: No hay preguntas disponibles"); 
        resetGame(); 
        return; 
    }
    
    shuffleArray(pool);
    gameState.levelQuestionPool = pool;
    
    elements.startButtonText.textContent = 'Siguiente Pregunta';
    elements.startButton.disabled = true; // Deshabilitar temporalmente
    updateUI();
    
    // 🎯 MEJORA PRINCIPAL: Mostrar la primera pregunta automáticamente
    setTimeout(() => {
        showNextQuestion();
    }, 500); // Pequeño delay para que se vea la transición
    
    console.log('✅ Juego iniciado con', pool.length, 'preguntas');
}

function showNextQuestion() {
    if (!gameState.isGameActive || gameState.isPaused) return;
    
    const required = CONFIG.LEVELS[gameState.currentLevel].questions;
    
    if (gameState.currentLevelProgress >= required) { 
        completeLevel(); 
        return; 
    }
    
    if (gameState.levelQuestionPool.length === 0) { 
        console.warn('🔄 Reutilizando preguntas');
        const pool = gameState.selectedTopics.flatMap(topic => {
            const topicQuestions = getQuestionsByTopic(topic) || [];
            return topicQuestions.map(q => ({ ...q, topic: topic }));
        });
        shuffleArray(pool); 
        gameState.levelQuestionPool = pool; 
    }
    
    gameState.currentQuestion = gameState.levelQuestionPool.pop();
    
    elements.startButton.disabled = true;
    elements.startButtonText.textContent = 'Responde la pregunta actual';
    
    displayQuestion();
}

// ================================================
// 📝 FUNCIÓN displayQuestion() MEJORADA CON MATHJAX FUNCIONAL
// ================================================

async function displayQuestion() {
    const q = gameState.currentQuestion;
    if (!q) return;
    
    console.log('📝 Mostrando pregunta:', q.question.substring(0, 50) + '...');
    
    // 🚨 MARCAR QUE HAY UNA PREGUNTA ACTIVA
    gameState.questionActive = true;
    gameState.curiosityBlocked = true;
    
    // 🚨 Usar ModalManager para abrir modal de pregunta
    if (!ModalManager.openModal('questionModal', 'question')) {
        console.error('❌ No se pudo abrir modal de pregunta');
        return;
    }
    
    // 📊 Información de la pregunta
    elements.questionData.innerHTML = `
        <div class="question-metadata">
            <div class="metadata-item">
                <span class="metadata-label">Tema:</span>
                <span class="metadata-value">${getTopicDisplayName(q.topic)}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Dificultad:</span>
                <span class="metadata-value">${'⭐'.repeat(q.difficulty || 1)}</span>
            </div>
        </div>
    `;
    
    // 📝 Texto de la pregunta
    elements.questionText.innerHTML = `<div class="question-main-text">${q.question}</div>`;
    
    // 🧮 Fórmula (si existe)
    if (q.formula) {
        elements.questionText.innerHTML += `
            <div class="math-formula-container">
                <div class="formula-label">Fórmula:</div>
                <div class="math-expression">${q.formula}</div>
            </div>
        `;
    }
    
    // 📊 Datos del problema (si existen)
    if (q.given) {
        const isMobile = window.orientationManager ? 
            window.orientationManager.isMobile() : 
            window.innerWidth < 768;
        
        const dataEntries = Object.entries(q.given);
        
        // 🔧 SIEMPRE FORMATO VERTICAL PARA MEJOR LEGIBILIDAD
        let givenHTML = '<div class="data-section">';
        givenHTML += '<div class="data-label">Datos:</div>';
        givenHTML += '<div class="data-container">';
        
        dataEntries.forEach(([key, value], index) => {
            const formattedKey = key.replace(/_(\w+)/, '_{$1}');
            givenHTML += `
                <div class="data-item">
                    <span class="data-equation">${formattedKey} = ${value}$</span>
                </div>
            `;
        });
        
        givenHTML += '</div></div>';
        elements.questionText.innerHTML += givenHTML;
    }
    
    // 🎯 Renderizar opciones
    await displayOptions();
    
    // 🔧 RENDERIZAR MATHJAX CON DELAY PARA ASEGURAR VISIBILIDAD
    setTimeout(async () => {
        try {
            console.log('🔬 Iniciando renderizado de MathJax...');
            await window.mathRenderSystem.queueRender(elements.questionModal, 300);
            console.log('✅ Pregunta y matemáticas renderizadas correctamente');
        } catch (error) {
            console.error('❌ Error renderizando pregunta:', error);
        }
    }, 200);
}

// 🎯 displayOptions() mejorada
async function displayOptions() {
    elements.optionsContainer.innerHTML = '';
    gameState.selectedAnswer = null;
    elements.answerButton.disabled = true;
    
    gameState.currentQuestion.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-button';
        btn.innerHTML = opt;
        btn.onclick = () => selectOption(idx, btn);
        elements.optionsContainer.appendChild(btn);
    });
    
    // 🔧 Pequeño delay para renderizar opciones con MathJax
    setTimeout(async () => {
        try {
            await window.mathRenderSystem.queueRender(elements.optionsContainer, 100);
            console.log('✅ Opciones renderizadas');
        } catch (error) {
            console.error('❌ Error renderizando opciones:', error);
        }
    }, 100);
}

function selectOption(index, btnEl) {
    document.querySelectorAll('.option-button').forEach(btn => 
        btn.classList.remove('selected')
    );
    
    btnEl.classList.add('selected');
    gameState.selectedAnswer = index;
    elements.answerButton.disabled = false;
}

function submitAnswer() {
    if (gameState.selectedAnswer === null) return;
    
    const isCorrect = gameState.selectedAnswer === gameState.currentQuestion.correct;
    gameState.questionsAnswered++;
    gameState.currentLevelProgress++;
    
    const questionForFeedback = gameState.currentQuestion;
    
    if (isCorrect) {
        gameState.correctAnswers++;
        gameState.score += CONFIG.POINTS_PER_CORRECT;
        
        if (audioSystem) audioSystem.play('success');
        showFeedback('🎉 ¡Correcto!', '¡Excelente trabajo, cadete!', true, questionForFeedback);
        
        console.log('✅ Respuesta correcta');
    } else {
        gameState.lives--;
        
        if (audioSystem) audioSystem.play('error');
        showFeedback('❌ Incorrecto', 'Los errores son para aprender. ¡Revisa la solución!', false, questionForFeedback);
        
        console.log('❌ Respuesta incorrecta');
        
        if (gameState.lives <= 0) { 
            gameOver(); 
            return; 
        }
    }
    
    // 🚨 LIMPIAR ESTADO DE PREGUNTA
    gameState.currentQuestion = null;
    gameState.questionActive = false;
    
    // 🚨 Cerrar modal de pregunta usando ModalManager
    ModalManager.closeModal('questionModal');
    updateUI();
}

// ================================================
// 💬 FUNCIÓN showFeedback() MEJORADA
// ================================================

async function showFeedback(title, text, isCorrect, question) {
    console.log('💬 Mostrando feedback:', title);
    
    // 🚨 Abrir modal de feedback usando ModalManager
    if (!ModalManager.openModal('feedbackModal', 'feedback')) {
        console.error('❌ No se pudo abrir modal de feedback');
        return;
    }
    
    elements.feedbackTitle.textContent = title;
    elements.feedbackText.textContent = text;
    
    if (question && question.explanation) {
        elements.solutionContainer.style.display = 'block';
        elements.solutionContainer.innerHTML = `
            <div class="explanation-container">
                <h4 class="explanation-title">💡 Explicación:</h4>
                <div class="explanation-content">${question.explanation}</div>
            </div>
        `;
    } else {
        elements.solutionContainer.style.display = 'none';
    }
    
    elements.nextButton.onclick = continueAfterFeedback;
    
    // 🔧 RENDERIZAR MATHJAX EN FEEDBACK CON DELAY
    setTimeout(async () => {
        try {
            await window.mathRenderSystem.queueRender(elements.feedbackModal, 200);
            console.log('✅ Feedback renderizado');
        } catch (error) {
            console.error('❌ Error renderizando feedback:', error);
        }
    }, 150);
}

function continueAfterFeedback() {
    // 🚨 Cerrar modal usando ModalManager
    ModalManager.closeModal('feedbackModal');
    
    // 🚨 Permitir curiosidades de nuevo
    gameState.curiosityBlocked = false;
    
    const required = CONFIG.LEVELS[gameState.currentLevel].questions;
    
    if (gameState.currentLevelProgress < required) {
        elements.startButton.disabled = false;
        elements.startButtonText.textContent = 'Siguiente Pregunta';
    }
}

// ================================================
// 🏆 GESTIÓN DE NIVELES Y FINAL DEL JUEGO
// ================================================

function completeLevel() {
    const levelName = CONFIG.LEVELS[gameState.currentLevel].name;
    const accuracy = gameState.questionsAnswered > 0 ? 
        (gameState.correctAnswers / gameState.questionsAnswered * 100).toFixed(1) : 0;
    const bonus = gameState.currentLevel * CONFIG.LEVEL_BONUS_MULTIPLIER;
    const grade = calculateGrade().toFixed(1);
    
    gameState.score += bonus;
    
    if (audioSystem) audioSystem.play('levelUp');
    
    document.getElementById('levelUpTitle').textContent = 
        `🏆 Nivel ${gameState.currentLevel} Completado, Cadete 🧑‍🚀`;
    document.getElementById('levelUpText').innerHTML = 
        `¡Felicidades, ${levelName}! Has demostrado tu valía.`;
    document.getElementById('levelUpStats').innerHTML = `
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div>Precisión: <span class="text-cyan-400">${accuracy}%</span></div>
            <div>Bonus de Nivel: <span class="text-yellow-400">+${bonus}</span></div>
            <div>Puntaje Total: <span class="text-purple-400">${gameState.score}</span></div>
            <div>Nota Final: <span class="text-yellow-400">${grade} / 5.0 ⭐</span></div>
        </div>
    `;
    
    ModalManager.openModal('levelUpModal', 'levelup');
    
    const nextLevelButton = document.getElementById('nextLevelButton');
    if (gameState.currentLevel >= Object.keys(CONFIG.LEVELS).length) {
        nextLevelButton.textContent = '🎊 ¡Misión Cumplida!';
        nextLevelButton.onclick = completeGame;
    } else {
        nextLevelButton.textContent = '🚀 ¡Siguiente Nivel!';
        nextLevelButton.onclick = advanceLevel;
    }
    
    console.log('🏆 Nivel completado');
}

function advanceLevel() { 
    if (gameState.currentLevel < Object.keys(CONFIG.LEVELS).length) { 
        gameState.currentLevel++; 
        gameState.currentLevelProgress = 0; 
        elements.levelSelect.value = gameState.currentLevel; 
        updateUI(); 
        ModalManager.closeModal('levelUpModal');
        elements.startButton.disabled = false; 
        
        console.log('⬆️ Nivel avanzado');
    } else { 
        completeGame(); 
    }
}

function showFinalStats(title) { 
    ModalManager.closeAllModals();
    gameState.isGameActive = false; 
    
    const accuracy = (gameState.correctAnswers / (gameState.questionsAnswered || 1) * 100).toFixed(1); 
    const grade = calculateGrade().toFixed(1); 
    
    elements.finalStatsTitle.innerHTML = `${title} 🧑‍🚀`; 
    elements.finalStatsContent.innerHTML = `
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-base">
            <span class="font-bold text-cyan-300">Puntaje Final:</span>
            <span class="text-right">${gameState.score}</span>
            <span class="font-bold text-cyan-300">Precisión:</span>
            <span class="text-right">${accuracy}%</span>
            <span class="font-bold text-cyan-300">Vidas Restantes:</span>
            <span class="text-right">${gameState.lives} / ${CONFIG.INITIAL_LIVES}</span>
            <span class="font-bold text-cyan-300">Calificación Final:</span>
            <span class="text-right font-bold text-yellow-400">${grade} / 5.0 ⭐</span>
        </div>
    `; 
    
    ModalManager.openModal('finalStatsModal', 'finalstats');
}

function completeGame() { 
    showFinalStats('🌟 ¡Misión Cumplida!'); 
    console.log('🌟 Juego completado');
}

function gameOver() { 
    showFinalStats('💀 Misión Fallida'); 
    console.log('💀 Game Over');
}

// ================================================
// 🎛️ CONTROLES DE JUEGO
// ================================================

function togglePause() { 
    if (!gameState.isGameActive) return; 
    
    gameState.isPaused = !gameState.isPaused; 
    
    if (gameState.isPaused) {
        ModalManager.openModal('pauseModal', 'pause');
    } else {
        ModalManager.closeModal('pauseModal');
    }
    
    console.log('⏸️ Juego pausado/reanudado');
}

function resumeGame() { 
    gameState.isPaused = false; 
    ModalManager.closeModal('pauseModal');
}

function resetGame() { 
    console.log('🔄 Reiniciando juego...');
    
    if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
    }
    
    resetGameState(); 
    
    elements.startButton.disabled = false; 
    elements.pauseButton.disabled = true; 
    elements.levelSelect.disabled = false; 
    elements.topicCheckboxes.forEach(cb => cb.disabled = false); 
    
    ModalManager.closeAllModals();
    initializeStars(); 
    initializeCosmicObjects(); 
    updateUI(); 
    gameLoop(); 
}

function updateSelectedTopics() { 
    const selected = Array.from(elements.topicCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value); 
        
    if (selected.length === 0) { 
        document.getElementById('topicMagnitudes').checked = true; 
        selected.push('magnitudes'); 
    } 
    
    gameState.selectedTopics = selected; 
}

// ================================================
// 📚 FUNCIONES DE MODAL Y UI MEJORADAS
// ================================================

function showHelpModal() { 
    ModalManager.openModal('helpModal', 'help');
}

// ================================================
// 🎨 FÍSICA Y ANIMACIÓN DE OBJETOS MEJORADA
// ================================================

function updateSpaceship() { 
    const ship = gameState.spaceship; 
    const dx = ship.targetX - ship.x; 
    const dy = ship.targetY - ship.y; 
    
    ship.x += dx * 0.1; 
    ship.y += dy * 0.1; 
    ship.angle = Math.atan2(dy, dx); 
    
    ship.trail.push({ x: ship.x, y: ship.y });
    
    if (ship.trail.length > 12) {
        ship.trail.shift();
    }
}

function updateCosmicObjects() { 
    if (gameState.isPaused) return; 
    
    Object.values(gameState.cosmicObjects).flat().forEach((obj, index, arr) => { 
        if (obj.type !== 'planet') { 
            obj.x -= obj.speed; 
            obj.angle += obj.rotationSpeed; 
            
            if (!obj.hasCollided && checkCollision(gameState.spaceship, obj)) { 
                obj.hasCollided = true; 
                handleCollision(obj); 
            } 
            
            if (obj.x < -100) {
                arr[index] = createCosmicObject(obj.type);
            }
        } else { 
            obj.pulsePhase += 0.02; 
        } 
    }); 
}

function checkCollision(ship, obj) { 
    const dx = ship.x - obj.x; 
    const dy = ship.y - obj.y; 
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (CONFIG.SPACESHIP.size + obj.size) / 2;
    
    return distance < minDistance;
}

// 🚨 FUNCIÓN handleCollision() MEJORADA PARA EVITAR CONFLICTOS
function handleCollision(obj) { 
    if (audioSystem) audioSystem.play('collision'); 
    
    createParticleExplosion(obj.x, obj.y, 25, gameState.particles); 
    
    // 🚨 SOLO MOSTRAR CURIOSIDADES SI NO HAY PREGUNTA ACTIVA Y NO ESTÁN BLOQUEADAS
    if (obj.type === 'meteorite' && 
        !gameState.isPaused && 
        !gameState.questionActive && 
        !gameState.curiosityBlocked &&
        !ModalManager.hasModalOfType('question') &&
        Math.random() < 0.5) { 
        
        gameState.isPaused = true; 
        setTimeout(() => { 
            showPhysicsInfo(); 
        }, 100); 
    } 
}

// 🚨 FUNCIÓN showPhysicsInfo() MEJORADA CON MODAL MANAGER
function showPhysicsInfo() { 
    // 🎯 Verificar que no hay conflicto con preguntas
    if (gameState.questionActive || 
        gameState.curiosityBlocked || 
        ModalManager.hasModalOfType('question')) {
        gameState.isPaused = false;
        console.log('⚠️ Curiosidad bloqueada por pregunta activa');
        return;
    }
    
    const curiosity = getRandomCuriosity();
    
    // 🚨 Usar ModalManager para mostrar curiosidad como feedback
    if (!ModalManager.openModal('feedbackModal', 'curiosity')) {
        gameState.isPaused = false;
        return;
    }
    
    elements.feedbackTitle.textContent = `🧑‍🚀 ${curiosity.title}`; 
    elements.feedbackText.innerHTML = ''; 
    elements.solutionContainer.style.display = 'block'; 
    elements.solutionContainer.innerHTML = `
        <div class="curiosity-container">
            <div class="curiosity-content">${curiosity.content}</div>
        </div>
    `;
    elements.nextButton.textContent = "🚀 Entendido"; 
    elements.nextButton.onclick = () => { 
        gameState.isPaused = false; 
        ModalManager.closeModal('feedbackModal');
    }; 
    
    // 🔧 Renderizar MathJax en curiosidades
    setTimeout(async () => {
        try {
            await window.mathRenderSystem.queueRender(elements.feedbackModal, 200);
            console.log('✅ Curiosidad renderizada');
        } catch (error) {
            console.error('❌ Error renderizando curiosidad:', error);
        }
    }, 150);
}

function createParticleExplosion(x, y, count, particleArray) { 
    for (let i = 0; i < count; i++) {
        particleArray.push({ 
            x, y, 
            vx: (Math.random() - 0.5) * 8, 
            vy: (Math.random() - 0.5) * 8, 
            life: 1, 
            decay: 0.02 + Math.random() * 0.02, 
            color: `hsl(${Math.random() * 60}, 100%, 70%)` 
        });
    }
}

function updateParticles(particleArray) { 
    if (gameState.isPaused) return; 
    
    for (let i = particleArray.length - 1; i >= 0; i--) { 
        const p = particleArray[i]; 
        p.x += p.vx; 
        p.y += p.vy; 
        p.life -= p.decay; 
        p.vy += 0.1;
        
        if (p.life <= 0) {
            particleArray.splice(i, 1);
        }
    } 
}

function updateStars() { 
    if (gameState.isPaused) return; 
    
    gameState.stars.forEach(star => { 
        star.x -= star.speed; 
        
        if (star.x < -5) {
            star.x = elements.canvas.width + 5;
        }
    }); 
}

// ================================================
// 🚀 SISTEMA MEJORADO DE ANIMACIONES DEL FOOTER
// ================================================

function launchFooterShip() {
    elements.footerShip.style.transition = 'left 8s linear';
    elements.footerShip.style.left = `${window.innerWidth + 50}px`;
}

function resetFooterShip() {
    elements.footerShip.style.transition = 'none';
    elements.footerShip.style.left = '-50px';
    gameState.footerShipCollision = false;
    setTimeout(launchFooterShip, 50); 
}

// 🎆 SISTEMA MEJORADO DE EXPLOSIONES EN EL FOOTER
function startFooterExplosions() {
    const explosionEmojis = ['💥', '💫', '⚡', '🔥', '✨', '🌟', '💥', '🎆', '🎇', '⭐'];
    let explosionTimer;
    
    function createExplosion() {
        const footer = document.querySelector('.galactic-footer');
        if (!footer) return;
        
        const explosion = document.createElement('div');
        explosion.className = 'footer-explosion';
        explosion.textContent = explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)];
        explosion.style.left = Math.random() * footer.offsetWidth + 'px';
        explosion.style.bottom = Math.random() * 20 + 'px'; // Variar altura
        
        // 🌈 Añadir colores aleatorios
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#54a0ff'];
        explosion.style.color = colors[Math.floor(Math.random() * colors.length)];
        explosion.style.textShadow = `0 0 10px ${explosion.style.color}`;
        
        footer.appendChild(explosion);
        
        // 🎵 Audio opcional para explosión
        if (audioSystem && audioSystem.enabled && Math.random() < 0.3) {
            audioSystem.createTone(400 + Math.random() * 200, 0.1, 'triangle');
        }
        
        setTimeout(() => {
            if (footer.contains(explosion)) {
                footer.removeChild(explosion);
            }
        }, 2000);
    }
    
    function createMultipleExplosions() {
        const count = 2 + Math.floor(Math.random() * 4); // 2-5 explosiones
        for (let i = 0; i < count; i++) {
            setTimeout(createExplosion, i * 200); // Escalonar las explosiones
        }
    }
    
    function scheduleNextExplosion() {
        const delay = 3000 + Math.random() * 8000; // Entre 3-11 segundos
        explosionTimer = setTimeout(() => {
            if (Math.random() < 0.7) {
                createExplosion(); // Explosión simple
            } else {
                createMultipleExplosions(); // Múltiples explosiones
            }
            scheduleNextExplosion();
        }, delay);
    }
    
    // Iniciar sistema de explosiones
    scheduleNextExplosion();
    
    // Explosión inicial de bienvenida
    setTimeout(createMultipleExplosions, 2000);
    
    console.log('🎆 Sistema de explosiones del footer iniciado');
}

// 🌟 Crear explosión manual (para testing)
function triggerFooterExplosion() {
    const footer = document.querySelector('.galactic-footer');
    if (!footer) return;
    
    const explosionEmojis = ['💥', '💫', '⚡', '🔥', '✨', '🌟'];
    const explosion = document.createElement('div');
    explosion.className = 'footer-explosion';
    explosion.textContent = explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)];
    explosion.style.left = Math.random() * footer.offsetWidth + 'px';
    explosion.style.bottom = '10px';
    explosion.style.color = '#ff6b6b';
    explosion.style.textShadow = '0 0 15px #ff6b6b';
    
    footer.appendChild(explosion);
    
    setTimeout(() => {
        if (footer.contains(explosion)) {
            footer.removeChild(explosion);
        }
    }, 2000);
}

// ================================================
// 🎨 FUNCIONES DE DIBUJO EN EL CANVAS
// ================================================

function drawBackground() { 
    const grad = elements.ctx.createLinearGradient(0, 0, 0, elements.canvas.height); 
    grad.addColorStop(0, '#0a0a1f'); 
    grad.addColorStop(1, '#000008'); 
    elements.ctx.fillStyle = grad; 
    elements.ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height); 
}

function drawStars() { 
    gameState.stars.forEach(star => { 
        elements.ctx.globalAlpha = star.alpha; 
        
        if (star.isEmoji) { 
            elements.ctx.font = `${star.radius * 2}px Arial`; 
            elements.ctx.fillText(star.emoji, star.x, star.y); 
        } else { 
            elements.ctx.fillStyle = star.color; 
            elements.ctx.beginPath(); 
            elements.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); 
            elements.ctx.fill(); 
        } 
    }); 
    
    elements.ctx.globalAlpha = 1; 
}

function drawSpaceship() { 
    const ship = gameState.spaceship; 
    const ctx = elements.ctx; 
    
    if(ship.trail.length > 1) { 
        ctx.save();
        ctx.lineWidth = 2; 
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        for (let i = 1; i < ship.trail.length; i++) {
            const alpha = (i / ship.trail.length) * 0.3;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = 'rgba(0, 250, 255, 1)';
            
            ctx.beginPath();
            ctx.moveTo(ship.trail[i-1].x, ship.trail[i-1].y);
            ctx.lineTo(ship.trail[i].x, ship.trail[i].y);
            ctx.stroke();
        }
        ctx.restore();
    } 
    
    ctx.save(); 
    ctx.translate(ship.x, ship.y); 
    ctx.rotate(ship.angle); 
    ctx.shadowColor = '#00faff'; 
    ctx.shadowBlur = 15; 
    ctx.font = `${CONFIG.SPACESHIP.size}px Arial`; 
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle'; 
    ctx.fillText('🚀', 0, 0); 
    ctx.restore(); 
}

function drawCosmicObjects() { 
    const ctx = elements.ctx; 
    
    Object.values(gameState.cosmicObjects).flat().forEach(obj => { 
        ctx.save(); 
        ctx.translate(obj.x, obj.y); 
        ctx.rotate(obj.angle); 
        
        let size = obj.size; 
        
        if (obj.type === 'planet') { 
            const pulse = 1 + Math.sin(obj.pulsePhase) * 0.05; 
            size *= pulse; 
            ctx.shadowColor = '#4466ff'; 
            ctx.shadowBlur = 15 + Math.sin(obj.pulsePhase) * 5; 
        } else { 
            ctx.shadowColor = '#ffaa00'; 
            ctx.shadowBlur = 10; 
        } 
        
        ctx.font = `${size}px Arial`; 
        ctx.textAlign = 'center'; 
        ctx.textBaseline = 'middle'; 
        ctx.fillText(obj.emoji, 0, 0); 
        ctx.restore(); 
    }); 
}

function drawParticles(particleArray) { 
    particleArray.forEach(p => { 
        elements.ctx.globalAlpha = p.life; 
        elements.ctx.fillStyle = p.color; 
        elements.ctx.beginPath(); 
        elements.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); 
        elements.ctx.fill(); 
    }); 
    
    elements.ctx.globalAlpha = 1; 
}

// ================================================
// 🔄 BUCLE PRINCIPAL DEL JUEGO
// ================================================

function gameLoop() {
    if (!gameState.isPaused) {
        elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
        
        drawBackground(); 
        
        updateStars(); 
        drawStars();
        
        updateCosmicObjects(); 
        drawCosmicObjects();
        
        updateSpaceship(); 
        drawSpaceship();
        
        updateParticles(gameState.particles); 
        drawParticles(gameState.particles);
        
        updateParticles(gameState.footerParticles); 
        drawParticles(gameState.footerParticles);
    }
    
    gameState.animationId = requestAnimationFrame(gameLoop);
}

// ================================================
// 🛠️ ACTUALIZACIÓN DE UI Y UTILIDADES
// ================================================

function updateUI() { 
    elements.level.textContent = gameState.currentLevel; 
    elements.score.textContent = gameState.score; 
    
    const req = CONFIG.LEVELS[gameState.currentLevel].questions; 
    elements.progress.textContent = `${gameState.currentLevelProgress}/${req}`; 
    
    const progPerc = req > 0 ? (gameState.currentLevelProgress / req) * 100 : 0; 
    elements.progressFill.style.width = `${progPerc}%`; 
    
    elements.grade.textContent = calculateGrade().toFixed(1); 
    
    updateLivesDisplay(); 
    updateTopicDisplay(); 
}

function updateLivesDisplay() { 
    elements.lives.innerHTML = ''; 
    
    for (let i = 0; i < CONFIG.INITIAL_LIVES; i++) { 
        const heart = document.createElement('span'); 
        heart.className = `heart ${i >= gameState.lives ? 'lost' : ''}`; 
        heart.textContent = '❤️'; 
        elements.lives.appendChild(heart); 
    } 
}

function updateTopicDisplay() { 
    const names = gameState.selectedTopics.map(getTopicDisplayName); 
    const display = names.length > 2 ? 
        `${names.slice(0, 2).join(', ')}...` : 
        names.join(' y '); 
    elements.currentTopic.textContent = display; 
}

function getTopicDisplayName(topic) { 
    const names = { 
        magnitudes: 'Magnitudes', 
        si: 'SI', 
        cinematica: 'Cinemática', 
        mru: 'MRU', 
        mrua: 'MRUA', 
        mcu: 'MCU', 
        gravedad: 'Vertical', 
        parabolico: 'Parabólico' 
    }; 
    return names[topic] || topic; 
}

function calculateGrade() { 
    if (gameState.questionsAnswered === 0) return 0.0; 
    
    const accuracy = gameState.correctAnswers / gameState.questionsAnswered; 
    return Math.min(5.0, accuracy * 5.0); 
}

// ================================================
// 🎯 FUNCIONES DE INTEGRACIÓN
// ================================================

function getQuestionsByTopic(topic) {
    if (typeof window.questionDatabase !== 'undefined') {
        return window.questionDatabase[topic] || [];
    }
    console.warn('⚠️ questionDatabase no disponible');
    return [];
}

function getRandomCuriosity() {
    // 🧠 Usar directamente la función global de curiosities.js
    if (typeof window.curiosityDatabase !== 'undefined') {
        const allCuriosities = [];
        
        // 📝 Recopilar todas las curiosidades
        Object.keys(window.curiosityDatabase).forEach(category => {
            window.curiosityDatabase[category].forEach(curiosity => {
                allCuriosities.push(curiosity);
            });
        });
        
        if (allCuriosities.length === 0) {
            return {
                title: 'Dato Curioso',
                content: 'La física está llena de maravillas esperando ser descubiertas. ¡Sigue explorando!'
            };
        }
        
        const randomIndex = Math.floor(Math.random() * allCuriosities.length);
        return allCuriosities[randomIndex];
    }
    
    // 🔄 Fallback si curiosities.js no está disponible
    console.warn('⚠️ curiosityDatabase no disponible');
    return {
        title: 'Dato Curioso',
        content: 'La velocidad de la luz en el vacío es aproximadamente 299,792,458 metros por segundo. ¡Es la velocidad máxima del universo!'
    };
}

// ================================================
// 🚀 INICIALIZACIÓN PRINCIPAL
// ================================================

function initializeGame() {
    console.log('🎮 Iniciando Academia Espacial...');
    
    initializeDOMElements();
    audioSystem = new AudioSystem();
    resizeCanvas();
    resetGameState();
    setupEventListeners();
    initializeStars();
    initializeCosmicObjects();
    launchFooterShip(); 
    startFooterExplosions();
    updateUI();
    gameLoop();
    
    // 🔧 INICIALIZAR SISTEMA MATEMÁTICO CUANDO MATHJAX ESTÉ LISTO
    if (window.MathJax && MathJax.startup) {
        MathJax.startup.promise.then(() => {
            window.mathRenderSystem.initialize();
            console.log('✅ Sistema matemático listo');
        });
    } else {
        // 🔄 Fallback: intentar inicializar después de un delay
        setTimeout(() => {
            if (window.MathJax && window.mathRenderSystem) {
                window.mathRenderSystem.initialize();
                console.log('✅ Sistema matemático inicializado (fallback)');
            }
        }, 2000);
    }
    
    console.log('✅ Juego inicializado correctamente');
}

// ================================================
// 🎮 INICIALIZACIÓN AUTOMÁTICA
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 DOM cargado, inicializando...');
    
    setTimeout(() => {
        initializeGame();
        
        // 🧪 Funciones de desarrollo
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.debugGame = () => console.log('🐛 Estado:', gameState);
            window.triggerExplosion = triggerFooterExplosion; // Para testing
            window.updateConfigForOrientation = updateConfigForOrientation; // Para testing
            window.testMathJax = () => window.mathRenderSystem.renderMath(document.body);
            window.debugModals = () => console.log('🪟 Modales:', ModalManager);
            
            // 📐 Funciones de debug de orientación
            window.debugOrientation = () => {
                if (window.orientationManager) {
                    console.table(window.orientationManager.getScreenInfo());
                }
            };
            
            window.testOrientationChange = () => {
                if (window.orientationManager) {
                    const current = window.orientationManager.currentOrientation;
                    const opposite = current === 'portrait' ? 'landscape' : 'portrait';
                    handleOrientationChange(opposite, current, window.orientationManager.deviceType);
                }
            };
            
            window.toggleOrientationLock = () => {
                if (window.orientationManager) {
                    const target = window.orientationManager.isLandscape() ? 'portrait' : 'landscape';
                    window.orientationManager.suggestOrientationLock(target);
                }
            };
            
            console.log('🐛 Modo debug activado - Funciones disponibles:');
            console.log('- debugGame()');
            console.log('- triggerExplosion()');
            console.log('- debugOrientation()');
            console.log('- testOrientationChange()');
            console.log('- toggleOrientationLock()');
            console.log('- updateConfigForOrientation()');
            console.log('- testMathJax()');
            console.log('- debugModals()');
        }
    }, 100);
});

// ================================================
// 📐 CSS PARA ANIMACIONES DE ORIENTACIÓN
// ================================================

// Agregar estas animaciones CSS al documento
const orientationStyles = document.createElement('style');
orientationStyles.textContent = `
    @keyframes orientationPulse {
        0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.8); 
        }
        20% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.1); 
        }
        80% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.9); 
        }
    }
    
    .orientation-feedback * {
        pointer-events: none;
    }
`;

document.head.appendChild(orientationStyles);

// ================================================
// 🌟 EXPOSICIÓN DE FUNCIONES GLOBALES
// ================================================

// Exponer funciones principales para integración
window.setupOrientationIntegration = setupOrientationIntegration;
window.updateConfigForOrientation = updateConfigForOrientation;
window.handleOrientationChange = handleOrientationChange;
window.resizeCanvas = resizeCanvas;
window.ModalManager = ModalManager;

console.log('📜 game.js mejorado con modales verticales, MathJax funcional y sin conflictos cargado completamente');