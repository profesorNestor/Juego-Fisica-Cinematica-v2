// ================================================
// 📐 SISTEMA DE ORIENTACIÓN ADAPTATIVA
// Archivo: orientation-manager.js
// ================================================

console.log('📐 Cargando sistema de orientación adaptativa...');

class OrientationManager {
    constructor() {
        this.currentOrientation = this.getOrientation();
        this.deviceType = this.getDeviceType();
        this.isLandscapeOptimal = false;
        this.orientationLocked = false;
        
        // Callbacks para diferentes eventos
        this.onOrientationChange = [];
        this.onDeviceTypeChange = [];
        
        this.init();
    }

    init() {
        // 🎯 Configurar event listeners
        this.setupEventListeners();
        
        // 📱 Aplicar configuración inicial
        this.applyOrientationSettings();
        
        // 🔧 Configurar meta viewport dinámico
        this.updateViewport();
        
        console.log('📐 Sistema de orientación iniciado:', {
            device: this.deviceType,
            orientation: this.currentOrientation,
            landscapeOptimal: this.isLandscapeOptimal
        });
    }

    setupEventListeners() {
        // 📐 Cambio de orientación de pantalla
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100); // Delay para esperar el cambio completo
        });

        // 📐 Cambio de tamaño de ventana
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 📱 Detección de fullscreen
        document.addEventListener('fullscreenchange', () => {
            this.handleFullscreenChange();
        });

        // 🔒 API de bloqueo de orientación (si está disponible)
        if (screen.orientation) {
            screen.orientation.addEventListener('change', () => {
                this.handleScreenOrientationChange();
            });
        }
    }

    getDeviceType() {
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

    getOrientation() {
        // 📐 Múltiples métodos de detección
        if (screen.orientation) {
            return screen.orientation.angle === 0 || screen.orientation.angle === 180 ? 'portrait' : 'landscape';
        }
        
        if (window.orientation !== undefined) {
            return Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
        }
        
        // Fallback basado en dimensiones
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }

    handleOrientationChange() {
        const newOrientation = this.getOrientation();
        const newDeviceType = this.getDeviceType();
        
        if (newOrientation !== this.currentOrientation) {
            console.log('📐 Cambio de orientación:', this.currentOrientation, '→', newOrientation);
            
            const oldOrientation = this.currentOrientation;
            this.currentOrientation = newOrientation;
            
            // 🔄 Aplicar nuevas configuraciones
            this.applyOrientationSettings();
            this.updateViewport();
            
            // 🎮 Notificar al juego
            this.notifyOrientationChange(oldOrientation, newOrientation);
        }

        if (newDeviceType !== this.deviceType) {
            console.log('📱 Cambio de tipo de dispositivo:', this.deviceType, '→', newDeviceType);
            this.deviceType = newDeviceType;
            this.notifyDeviceTypeChange();
        }
    }

    handleResize() {
        // 🔄 Reajustar después de cambio de tamaño
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.handleOrientationChange();
            this.adjustGameLayout();
        }, 250);
    }

    applyOrientationSettings() {
        const body = document.body;
        const gameWrapper = document.getElementById('gameWrapper');
        
        // 🗑️ Limpiar clases previas
        body.classList.remove('orientation-portrait', 'orientation-landscape', 'mobile-portrait', 'mobile-landscape', 'desktop-mode');
        
        // ➕ Añadir clases actuales
        body.classList.add(`orientation-${this.currentOrientation}`);
        
        if (this.deviceType.includes('mobile')) {
            body.classList.add(`mobile-${this.currentOrientation}`);
            
            // 📱 Configuración especial para móviles
            if (this.currentOrientation === 'landscape') {
                this.enableLandscapeMode();
            } else {
                this.enablePortraitMode();
            }
        } else {
            body.classList.add('desktop-mode');
        }

        // 🎮 Actualizar configuración del juego
        this.updateGameConfiguration();
    }

    enableLandscapeMode() {
        console.log('📱➡️ Activando modo horizontal');
        
        const gameWrapper = document.getElementById('gameWrapper');
        const statsBar = document.querySelector('.stats-bar');
        const controlsContainer = document.querySelector('.controls-container');
        
        // 🎯 Aplicar estilos de landscape
        document.documentElement.style.setProperty('--landscape-height', `${window.innerHeight}px`);
        document.documentElement.style.setProperty('--landscape-width', `${window.innerWidth}px`);
        
        // 📐 Configurar layout horizontal
        if (gameWrapper) {
            gameWrapper.classList.add('landscape-layout');
        }
        
        // 📊 Compactar barra de estadísticas
        if (statsBar) {
            statsBar.classList.add('compact-horizontal');
        }
        
        // 🎛️ Reorganizar controles
        if (controlsContainer) {
            controlsContainer.classList.add('horizontal-controls');
        }

        // 🔒 Sugerir bloqueo de orientación
        this.suggestOrientationLock('landscape');
    }

    enablePortraitMode() {
        console.log('📱⬆️ Activando modo vertical');
        
        const gameWrapper = document.getElementById('gameWrapper');
        const statsBar = document.querySelector('.stats-bar');
        const controlsContainer = document.querySelector('.controls-container');
        
        // 🗑️ Limpiar estilos de landscape
        document.documentElement.style.removeProperty('--landscape-height');
        document.documentElement.style.removeProperty('--landscape-width');
        
        // 📐 Configurar layout vertical
        if (gameWrapper) {
            gameWrapper.classList.remove('landscape-layout');
        }
        
        if (statsBar) {
            statsBar.classList.remove('compact-horizontal');
        }
        
        if (controlsContainer) {
            controlsContainer.classList.remove('horizontal-controls');
        }
    }

    updateViewport() {
        // 📱 Meta viewport dinámico
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            document.head.appendChild(viewportMeta);
        }

        let viewportContent = 'width=device-width, initial-scale=1.0';
        
        if (this.deviceType.includes('mobile')) {
            if (this.currentOrientation === 'landscape') {
                // 🌐 Optimizado para horizontal móvil
                viewportContent += ', maximum-scale=1.0, user-scalable=yes, viewport-fit=cover';
            } else {
                // 🌐 Optimizado para vertical móvil
                viewportContent += ', maximum-scale=1.5, user-scalable=yes';
            }
        } else {
            viewportContent += ', user-scalable=yes';
        }
        
        viewportMeta.content = viewportContent;
        console.log('🌐 Viewport actualizado:', viewportContent);
    }

    updateGameConfiguration() {
        // 🎮 Actualizar configuración del juego según orientación
        if (window.gameState && window.CONFIG) {
            const isHorizontal = this.currentOrientation === 'landscape';
            const isMobile = this.deviceType.includes('mobile');
            
            if (isMobile && isHorizontal) {
                // 📱➡️ Configuración especial móvil horizontal
                window.CONFIG.COSMIC_OBJECTS.meteorites.count = Math.min(window.CONFIG.COSMIC_OBJECTS.meteorites.count, 3);
                window.CONFIG.SPACESHIP.speed = Math.max(window.CONFIG.SPACESHIP.speed * 0.8, 1.5);
            }
        }
    }

    adjustGameLayout() {
        // 🎮 Reajustar canvas y elementos del juego
        if (window.resizeCanvas) {
            window.resizeCanvas();
        }
        
        if (window.gameState) {
            // 🌟 Reinicializar elementos visuales
            if (window.initializeStars) window.initializeStars();
            if (window.initializeCosmicObjects) window.initializeCosmicObjects();
        }
    }

    // 🔒 API de bloqueo de orientación
    async suggestOrientationLock(orientation = 'landscape') {
        if (!screen.orientation || !screen.orientation.lock) {
            console.log('⚠️ API de bloqueo de orientación no disponible');
            return false;
        }

        try {
            await screen.orientation.lock(orientation);
            this.orientationLocked = true;
            console.log(`🔒 Orientación bloqueada en: ${orientation}`);
            return true;
        } catch (error) {
            console.log('⚠️ No se pudo bloquear la orientación:', error.message);
            return false;
        }
    }

    async unlockOrientation() {
        if (!screen.orientation || !screen.orientation.unlock) {
            return false;
        }

        try {
            screen.orientation.unlock();
            this.orientationLocked = false;
            console.log('🔓 Orientación desbloqueada');
            return true;
        } catch (error) {
            console.log('⚠️ Error desbloqueando orientación:', error.message);
            return false;
        }
    }

    // 🎯 Callbacks y notificaciones
    notifyOrientationChange(oldOrientation, newOrientation) {
        this.onOrientationChange.forEach(callback => {
            try {
                callback(newOrientation, oldOrientation, this.deviceType);
            } catch (error) {
                console.error('❌ Error en callback de orientación:', error);
            }
        });
    }

    notifyDeviceTypeChange() {
        this.onDeviceTypeChange.forEach(callback => {
            try {
                callback(this.deviceType, this.currentOrientation);
            } catch (error) {
                console.error('❌ Error en callback de tipo de dispositivo:', error);
            }
        });
    }

    // 📱 Métodos públicos para el juego
    registerOrientationCallback(callback) {
        this.onOrientationChange.push(callback);
    }

    registerDeviceTypeCallback(callback) {
        this.onDeviceTypeChange.push(callback);
    }

    isLandscape() {
        return this.currentOrientation === 'landscape';
    }

    isPortrait() {
        return this.currentOrientation === 'portrait';
    }

    isMobile() {
        return this.deviceType.includes('mobile');
    }

    // 🎮 Fullscreen para mejorar experiencia
    async requestFullscreen() {
        const element = document.documentElement;
        
        try {
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            }
            
            console.log('📺 Modo pantalla completa activado');
            return true;
        } catch (error) {
            console.log('⚠️ No se pudo activar pantalla completa:', error.message);
            return false;
        }
    }

    exitFullscreen() {
        try {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            console.log('📺 Modo pantalla completa desactivado');
        } catch (error) {
            console.log('⚠️ Error saliendo de pantalla completa:', error.message);
        }
    }

    // 🔧 Utilidades
    getScreenInfo() {
        return {
            orientation: this.currentOrientation,
            deviceType: this.deviceType,
            dimensions: {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: (window.innerWidth / window.innerHeight).toFixed(2)
            },
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight
            },
            orientationLocked: this.orientationLocked,
            isFullscreen: document.fullscreenElement !== null
        };
    }

    // 🧪 Métodos de desarrollo/debug
    toggleOrientation() {
        // Solo para testing - forzar cambio
        const oppositeOrientation = this.currentOrientation === 'portrait' ? 'landscape' : 'portrait';
        this.suggestOrientationLock(oppositeOrientation);
    }

    logStatus() {
        console.table(this.getScreenInfo());
    }
}

// 🌐 Instancia global
window.OrientationManager = OrientationManager;

// 🚀 Auto-inicialización
let orientationManager = null;

function initOrientationManager() {
    if (!orientationManager) {
        orientationManager = new OrientationManager();
        window.orientationManager = orientationManager;
        
        // 🎮 Registrar callbacks del juego si está disponible
        if (window.gameState) {
            orientationManager.registerOrientationCallback((newOrientation, oldOrientation, deviceType) => {
                console.log(`🎮 Juego notificado: ${oldOrientation} → ${newOrientation} (${deviceType})`);
                // Aquí se pueden agregar más acciones específicas del juego
            });
        }
    }
    return orientationManager;
}

// 📱 Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOrientationManager);
} else {
    initOrientationManager();
}

console.log('📐 Sistema de orientación adaptativa cargado');