// ================================================
// 🧠 BANCO DE DATOS CURIOSOS DE FÍSICA
// Archivo: curiosities.js
// ================================================

/* 🎯 ESTRUCTURA DE CURIOSIDAD:
 * {
 *   title: 'string',        // 📝 Título de la curiosidad
 *   content: 'string',      // 📖 Contenido (puede incluir LaTeX con $$)
 *   category: 'string',     // 🏷️ Categoría de física
 *   difficulty: 1|2|3,      // ⭐ Nivel de complejidad
 *   source?: 'string'       // 📚 Fuente opcional
 * }
 */

const curiosityDatabase = {
    
    // 🌌 FÍSICA FUNDAMENTAL Y CURIOSIDADES GENERALES
    fundamental: [
        {
            title: 'La Velocidad de la Luz',
            content: 'La velocidad de la luz en el vacío es exactamente $$c = 299,792,458 \\, m/s$$. ¡Es tan rápida que podría dar la vuelta a la Tierra 7.5 veces en un solo segundo!',
            category: 'fundamental',
            difficulty: 1,
            source: 'Constantes físicas fundamentales'
        },
        {
            title: 'Ecuación Más Famosa del Universo',
            content: 'La ecuación $$E = mc^2$$ de Einstein nos dice que una pequeñísima cantidad de masa puede convertirse en una enorme cantidad de energía. ¡Un gramo de materia contiene la energía equivalente a 21,000 toneladas de TNT!',
            category: 'fundamental',
            difficulty: 2,
            source: 'Relatividad Especial - Einstein'
        },
        {
            title: 'El Principio de Incertidumbre',
            content: 'Según Heisenberg, es imposible conocer simultáneamente con precisión absoluta la posición y el momento de una partícula: $$\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$$. ¡La naturaleza misma es probabilística!',
            category: 'fundamental',
            difficulty: 3,
            source: 'Mecánica Cuántica'
        },
        {
            title: 'Gravedad Universal',
            content: 'Newton descubrió que la fuerza gravitatoria entre dos objetos es $$F = G\\frac{m_1 m_2}{r^2}$$. ¡La misma fuerza que hace caer una manzana mantiene la Luna en órbita!',
            category: 'fundamental',
            difficulty: 2,
            source: 'Principia Mathematica - Newton'
        }
    ],

    // ⚡ ELECTRICIDAD Y MAGNETISMO
    electromagnetism: [
        {
            title: 'Rayos: Electricidad Natural',
            content: 'Un rayo típico transporta unos 30,000 amperios de corriente y alcanza temperaturas de 30,000°C - ¡cinco veces más caliente que la superficie del Sol!',
            category: 'electromagnetism',
            difficulty: 1,
            source: 'Meteorología'
        },
        {
            title: 'Campos Electromagnéticos',
            content: 'Las ecuaciones de Maxwell $$\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}$$ nos enseñan que los campos eléctricos y magnéticos están íntimamente conectados. ¡Sin esta conexión no existirían las ondas de radio!',
            category: 'electromagnetism',
            difficulty: 3,
            source: 'Ecuaciones de Maxwell'
        },
        {
            title: 'Superconductividad',
            content: 'Algunos materiales a temperaturas muy bajas pueden conducir electricidad sin resistencia alguna. ¡Una corriente eléctrica en un superconductor puede fluir para siempre sin perder energía!',
            category: 'electromagnetism',
            difficulty: 2,
            source: 'Física de Materiales'
        }
    ],

    // 🌡️ TERMODINÁMICA Y TEMPERATURA
    thermodynamics: [
        {
            title: 'Cero Absoluto',
            content: 'La temperatura más baja posible es el cero absoluto: $$T = 0 \\, K = -273.15°C$$. ¡A esta temperatura, incluso los átomos dejan de moverse!',
            category: 'thermodynamics',
            difficulty: 1,
            source: 'Termodinámica'
        },
        {
            title: 'Entropía del Universo',
            content: 'La segunda ley de la termodinámica establece que $$\\Delta S \\geq 0$$. ¡El universo tiende hacia el desorden máximo, y por eso no podemos "deshacernos" del calor!',
            category: 'thermodynamics',
            difficulty: 3,
            source: 'Segunda Ley de la Termodinámica'
        },
        {
            title: 'Máquinas Térmicas',
            content: 'La eficiencia máxima teórica de una máquina térmica está dada por $$\\eta = 1 - \\frac{T_f}{T_c}$$. ¡Ningún motor puede ser 100% eficiente debido a las leyes de la termodinámica!',
            category: 'thermodynamics',
            difficulty: 2,
            source: 'Ciclo de Carnot'
        }
    ],

    // 🌊 ONDAS Y SONIDO
    waves: [
        {
            title: 'Silencio en el Espacio',
            content: 'En el espacio exterior no hay sonido porque las ondas sonoras necesitan un medio material para propagarse. ¡Las explosiones de las películas espaciales son artísticamente dramáticas pero físicamente incorrectas!',
            category: 'waves',
            difficulty: 1,
            source: 'Acústica'
        },
        {
            title: 'Ondas Gravitacionales',
            content: 'Einstein predijo que la gravedad se propaga como ondas a la velocidad de la luz. ¡En 2015, LIGO detectó por primera vez estas ondulaciones en el espacio-tiempo causadas por la colisión de agujeros negros!',
            category: 'waves',
            difficulty: 3,
            source: 'Relatividad General'
        },
        {
            title: 'Efecto Doppler',
            content: 'La frecuencia observada de una onda cambia cuando la fuente se mueve: $$f\' = f\\frac{v \\pm v_o}{v \\pm v_s}$$. ¡Es por esto que la sirena de una ambulancia suena diferente cuando se acerca o se aleja!',
            category: 'waves',
            difficulty: 2,
            source: 'Acústica'
        }
    ],

    // 🚀 ASTRONOMÍA Y COSMOLOGÍA
    astronomy: [
        {
            title: 'Agujeros Negros',
            content: 'Un agujero negro es tan denso que ni siquiera la luz puede escapar. ¡Si pudieras comprimir la Tierra hasta el tamaño de una canica, se convertiría en un agujero negro!',
            category: 'astronomy',
            difficulty: 2,
            source: 'Astrofísica'
        },
        {
            title: 'Expansión del Universo',
            content: 'El universo se expande según la ley de Hubble: $$v = H_0 \\cdot d$$. ¡Las galaxias más distantes se alejan de nosotros más rápido, y algunas ya se mueven más rápido que la luz!',
            category: 'astronomy',
            difficulty: 3,
            source: 'Cosmología'
        },
        {
            title: 'Estrellas de Neutrones',
            content: 'Una cucharadita de material de estrella de neutrones pesaría aproximadamente mil millones de toneladas. ¡Estas estrellas son tan densas que un centímetro cúbico pesa lo mismo que el Monte Everest!',
            category: 'astronomy',
            difficulty: 2,
            source: 'Astrofísica Estelar'
        },
        {
            title: 'Velocidad de Escape',
            content: 'Para escapar de la gravedad de la Tierra necesitas una velocidad mínima de $$v_e = \\sqrt{\\frac{2GM}{r}} \\approx 11.2 \\, km/s$$. ¡Los cohetes deben alcanzar esta velocidad para llegar al espacio!',
            category: 'astronomy',
            difficulty: 2,
            source: 'Mecánica Orbital'
        }
    ],

    // ⚛️ FÍSICA CUÁNTICA Y PARTÍCULAS
    quantum: [
        {
            title: 'Entrelazamiento Cuántico',
            content: 'Dos partículas pueden estar "entrelazadas" de tal forma que medir una afecta instantáneamente a la otra, sin importar la distancia. ¡Einstein lo llamó "acción fantasmal a distancia"!',
            category: 'quantum',
            difficulty: 3,
            source: 'Mecánica Cuántica'
        },
        {
            title: 'Efecto Túnel Cuántico',
            content: 'En el mundo cuántico, las partículas pueden "atravesar" barreras que clásicamente serían imposibles de superar. ¡Este efecto hace posible que funcionen los transistores en tu teléfono!',
            category: 'quantum',
            difficulty: 3,
            source: 'Física Cuántica'
        },
        {
            title: 'Dualidad Onda-Partícula',
            content: 'Los electrones y fotones se comportan como ondas y como partículas dependiendo de cómo los observemos. ¡La energía de un fotón es $$E = h\\nu$$, conectando su naturaleza ondulatoria con la corpuscular!',
            category: 'quantum',
            difficulty: 2,
            source: 'Mecánica Cuántica'
        },
        {
            title: 'Gato de Schrödinger',
            content: 'Según la interpretación de Copenhague de la mecánica cuántica, un gato puede estar simultáneamente vivo y muerto hasta que alguien abra la caja para observarlo. ¡Es una paradoja que ilustra lo extraño del mundo cuántico!',
            category: 'quantum',
            difficulty: 3,
            source: 'Interpretación Cuántica'
        }
    ],

    // 🏃 MECÁNICA Y MOVIMIENTO
    mechanics: [
        {
            title: 'Caída Libre de Galileo',
            content: 'Galileo demostró que todos los objetos caen con la misma aceleración en el vacío, independientemente de su masa. ¡Una pluma y un martillo caen igual en la Luna, como demostró el astronauta David Scott!',
            category: 'mechanics',
            difficulty: 1,
            source: 'Experimentos de Galileo'
        },
        {
            title: 'Conservación del Momento',
            content: 'El momento se conserva en todas las colisiones: $$\\sum \\vec{p}_{inicial} = \\sum \\vec{p}_{final}$$. ¡Es por esto que los cohetes pueden moverse en el espacio sin "empujar" contra nada!',
            category: 'mechanics',
            difficulty: 2,
            source: 'Leyes de Newton'
        },
        {
            title: 'Precesión Giroscópica',
            content: 'Un giroscopio en rotación mantiene su orientación en el espacio. ¡Esta propiedad se usa en los sistemas de navegación de aviones y naves espaciales!',
            category: 'mechanics',
            difficulty: 2,
            source: 'Mecánica de Cuerpos Rígidos'
        },
        {
            title: 'Fuerza Centrípeta',
            content: 'Para mantener un objeto en movimiento circular se necesita una fuerza dirigida hacia el centro: $$F_c = \\frac{mv^2}{r}$$. ¡Es la gravedad la que proporciona esta fuerza para mantener la Luna en órbita!',
            category: 'mechanics',
            difficulty: 2,
            source: 'Mecánica Clásica'
        }
    ],

    // 💎 ÓPTICA Y LUZ
    optics: [
        {
            title: 'Arco Iris Circular',
            content: 'Los arco iris son en realidad círculos completos. Solo vemos arcos porque el suelo bloquea la parte inferior. ¡Desde un avión puedes ver el círculo completo!',
            category: 'optics',
            difficulty: 1,
            source: 'Óptica Atmosférica'
        },
        {
            title: 'Reflexión Total Interna',
            content: 'Cuando la luz viaja de un medio más denso a uno menos denso con un ángulo mayor que el crítico, se refleja completamente. ¡Este principio hace posible la fibra óptica de internet!',
            category: 'optics',
            difficulty: 2,
            source: 'Óptica Geométrica'
        },
        {
            title: 'Interferencia Cuántica',
            content: 'En el experimento de la doble rendija, un solo fotón puede interferir consigo mismo, creando patrones de interferencia. ¡Esto demuestra la naturaleza ondulatoria de la luz!',
            category: 'optics',
            difficulty: 3,
            source: 'Óptica Cuántica'
        }
    ],

    // 🌍 FÍSICA DE LA TIERRA
    earth_physics: [
        {
            title: 'Campo Magnético Terrestre',
            content: 'El campo magnético de la Tierra nos protege de la radiación solar. ¡Sin él, la atmósfera sería arrastrada por el viento solar como le pasó a Marte!',
            category: 'earth_physics',
            difficulty: 2,
            source: 'Geofísica'
        },
        {
            title: 'Resonancia de Schumann',
            content: 'La cavidad entre la superficie terrestre y la ionosfera resuena a aproximadamente 7.83 Hz. ¡Algunos científicos creen que esta frecuencia influye en los ritmos biológicos!',
            category: 'earth_physics',
            difficulty: 3,
            source: 'Física Atmosférica'
        },
        {
            title: 'Gravedad Variable',
            content: 'La gravedad no es igual en toda la Tierra. Es ligeramente menor en el ecuador ($$g = 9.78 \\, m/s^2$$) que en los polos ($$g = 9.83 \\, m/s^2$$) debido a la rotación y forma de la Tierra.',
            category: 'earth_physics',
            difficulty: 2,
            source: 'Geodesia'
        }
    ]
};

// ================================================
// 🎯 FUNCIONES DE ACCESO A CURIOSIDADES
// ================================================

/**
 * 🎲 Obtiene una curiosidad completamente aleatoria
 * @returns {Object} Objeto curiosidad con título y contenido
 */
function getRandomCuriosity() {
    const allCuriosities = [];
    
    // 📝 Recopilar todas las curiosidades
    Object.keys(curiosityDatabase).forEach(category => {
        curiosityDatabase[category].forEach(curiosity => {
            allCuriosities.push(curiosity);
        });
    });
    
    if (allCuriosities.length === 0) {
        return {
            title: 'Dato Curioso',
            content: 'La física está llena de maravillas esperando ser descubiertas. ¡Sigue explorando!',
            category: 'general',
            difficulty: 1
        };
    }
    
    const randomIndex = Math.floor(Math.random() * allCuriosities.length);
    return allCuriosities[randomIndex];
}

/**
 * 📚 Obtiene curiosidades por categoría
 * @param {string} category - Categoría deseada
 * @returns {Array} Array de curiosidades de la categoría
 */
function getCuriositiesByCategory(category) {
    return curiosityDatabase[category] || [];
}

/**
 * ⭐ Obtiene curiosidades por nivel de dificultad
 * @param {number} difficulty - Nivel de dificultad (1-3)
 * @returns {Array} Array de curiosidades del nivel especificado
 */
function getCuriositiesByDifficulty(difficulty) {
    const filtered = [];
    
    Object.keys(curiosityDatabase).forEach(category => {
        curiosityDatabase[category].forEach(curiosity => {
            if (curiosity.difficulty === difficulty) {
                filtered.push(curiosity);
            }
        });
    });
    
    return filtered;
}

/**
 * 🎯 Obtiene una curiosidad aleatoria de una categoría específica
 * @param {string} category - Categoría deseada
 * @returns {Object|null} Curiosidad aleatoria o null si no existe la categoría
 */
function getRandomCuriosityByCategory(category) {
    const categoryItems = getCuriositiesByCategory(category);
    
    if (categoryItems.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * categoryItems.length);
    return categoryItems[randomIndex];
}

/**
 * 🔍 Busca curiosidades por palabra clave en título o contenido
 * @param {string} keyword - Palabra clave a buscar
 * @returns {Array} Array de curiosidades que contienen la palabra clave
 */
function searchCuriosities(keyword) {
    const results = [];
    const searchTerm = keyword.toLowerCase();
    
    Object.keys(curiosityDatabase).forEach(category => {
        curiosityDatabase[category].forEach(curiosity => {
            const titleMatch = curiosity.title.toLowerCase().includes(searchTerm);
            const contentMatch = curiosity.content.toLowerCase().includes(searchTerm);
            
            if (titleMatch || contentMatch) {
                results.push({
                    ...curiosity,
                    matchType: titleMatch ? 'title' : 'content'
                });
            }
        });
    });
    
    return results;
}

/**
 * 📊 Obtiene estadísticas del banco de curiosidades
 * @returns {Object} Estadísticas del banco de datos
 */
function getCuriosityStats() {
    const stats = {
        totalCuriosities: 0,
        byCategory: {},
        byDifficulty: { 1: 0, 2: 0, 3: 0 },
        categories: Object.keys(curiosityDatabase)
    };
    
    Object.keys(curiosityDatabase).forEach(category => {
        const categoryItems = curiosityDatabase[category];
        stats.byCategory[category] = categoryItems.length;
        stats.totalCuriosities += categoryItems.length;
        
        categoryItems.forEach(curiosity => {
            stats.byDifficulty[curiosity.difficulty]++;
        });
    });
    
    return stats;
}

/**
 * 🎲 Obtiene múltiples curiosidades aleatorias sin repetir
 * @param {number} count - Número de curiosidades deseadas
 * @param {Array} excludeCategories - Categorías a excluir (opcional)
 * @returns {Array} Array de curiosidades únicas
 */
function getMultipleRandomCuriosities(count, excludeCategories = []) {
    const allCuriosities = [];
    
    Object.keys(curiosityDatabase).forEach(category => {
        if (!excludeCategories.includes(category)) {
            curiosityDatabase[category].forEach(curiosity => {
                allCuriosities.push(curiosity);
            });
        }
    });
    
    // 🔄 Mezclar array
    for (let i = allCuriosities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCuriosities[i], allCuriosities[j]] = [allCuriosities[j], allCuriosities[i]];
    }
    
    return allCuriosities.slice(0, Math.min(count, allCuriosities.length));
}

/**
 * 🏷️ Obtiene el nombre de visualización de una categoría
 * @param {string} category - Código de la categoría
 * @returns {string} Nombre legible de la categoría
 */
function getCategoryDisplayName(category) {
    const displayNames = {
        fundamental: '🌌 Física Fundamental',
        electromagnetism: '⚡ Electromagnetismo',
        thermodynamics: '🌡️ Termodinámica',
        waves: '🌊 Ondas y Sonido',
        astronomy: '🚀 Astronomía',
        quantum: '⚛️ Física Cuántica',
        mechanics: '🏃 Mecánica',
        optics: '💎 Óptica',
        earth_physics: '🌍 Física Terrestre'
    };
    
    return displayNames[category] || category;
}

/**
 * 🎯 Obtiene curiosidades relacionadas con un tema de física específico
 * @param {string} physicsTopic - Tema de física (magnitudes, cinematica, etc.)
 * @returns {Array} Array de curiosidades relacionadas
 */
function getCuriositiesByPhysicsTopic(physicsTopic) {
    const topicMappings = {
        magnitudes: ['fundamental', 'mechanics'],
        si: ['fundamental'],
        cinematica: ['mechanics', 'astronomy'],
        mru: ['mechanics'],
        mrua: ['mechanics'],
        mcu: ['mechanics', 'astronomy'],
        gravedad: ['mechanics', 'astronomy'],
        parabolico: ['mechanics', 'astronomy']
    };
    
    const relevantCategories = topicMappings[physicsTopic] || ['fundamental'];
    const results = [];
    
    relevantCategories.forEach(category => {
        results.push(...getCuriositiesByCategory(category));
    });
    
    return results;
}

/**
 * 🧠 Obtiene una curiosidad educativa basada en el progreso del jugador
 * @param {Object} gameState - Estado actual del juego
 * @returns {Object} Curiosidad apropiada para el contexto
 */
function getContextualCuriosity(gameState) {
    if (!gameState) return getRandomCuriosity();
    
    // 🎯 Seleccionar dificultad basada en el nivel del jugador
    let targetDifficulty = 1;
    if (gameState.currentLevel >= 2) targetDifficulty = 2;
    if (gameState.currentLevel >= 3) targetDifficulty = 3;
    
    // 📚 Obtener curiosidades relacionadas con los temas seleccionados
    const topicCuriosities = [];
    if (gameState.selectedTopics) {
        gameState.selectedTopics.forEach(topic => {
            topicCuriosities.push(...getCuriositiesByPhysicsTopic(topic));
        });
    }
    
    // 🔍 Filtrar por dificultad apropiada
    const appropriateCuriosities = topicCuriosities.filter(c => c.difficulty <= targetDifficulty);
    
    if (appropriateCuriosities.length > 0) {
        const randomIndex = Math.floor(Math.random() * appropriateCuriosities.length);
        return appropriateCuriosities[randomIndex];
    }
    
    // 🔄 Fallback a curiosidad aleatoria de dificultad apropiada
    const fallbackCuriosities = getCuriositiesByDifficulty(targetDifficulty);
    if (fallbackCuriosities.length > 0) {
        const randomIndex = Math.floor(Math.random() * fallbackCuriosities.length);
        return fallbackCuriosities[randomIndex];
    }
    
    return getRandomCuriosity();
}

// ================================================
// 🎨 CURIOSIDADES DINÁMICAS (GENERADAS PROCEDURALMENTE)
// ================================================

/**
 * 🔢 Genera curiosidades numéricas dinámicas
 * @returns {Object} Curiosidad con datos numéricos interesantes
 */
function generateNumericalCuriosity() {
    const numericalFacts = [
        {
            title: 'Escala del Universo',
            content: `El universo observable tiene un diámetro de aproximadamente $9.3 \\times 10^{26}$ metros. ¡Si fuera del tamaño de una pelota de fútbol, un átomo sería del tamaño de una canica!`,
            difficulty: 2
        },
        {
            title: 'Energía Nuclear',
            content: `La fusión nuclear en el Sol convierte $4.26 \\times 10^9$ kg de masa en energía cada segundo según $E = mc^2$. ¡Es como si 4.26 millones de toneladas desaparecieran y se convirtieran en luz!`,
            difficulty: 3
        },
        {
            title: 'Densidad Extrema',
            content: `La densidad de un agujero negro puede alcanzar $10^{18}$ kg/m³. ¡Un centímetro cúbico pesaría mil millones de toneladas!`,
            difficulty: 2
        },
        {
            title: 'Temperatura Estelar',
            content: `El núcleo del Sol alcanza temperaturas de $15 \\times 10^6$ K. ¡A esta temperatura, incluso los átomos de hidrógeno se fusionan para formar helio!`,
            difficulty: 2
        }
    ];
    
    const randomFact = numericalFacts[Math.floor(Math.random() * numericalFacts.length)];
    return {
        ...randomFact,
        category: 'numerical',
        source: 'Datos científicos'
    };
}

/**
 * 🎲 Genera una curiosidad de comparación de escalas
 * @returns {Object} Curiosidad sobre escalas en el universo
 */
function generateScaleCuriosity() {
    const scaleComparisons = [
        {
            title: 'Del Átomo al Universo',
            content: 'Si un átomo fuera del tamaño de una pelota de ping-pong, una pelota de ping-pong real sería del tamaño de la Tierra. ¡Y si la Tierra fuera una pelota de ping-pong, el universo observable sería como nuestro sistema solar!',
            difficulty: 2
        },
        {
            title: 'Velocidades Cósmicas',
            content: 'Mientras caminas a $1.4 \\, m/s$, la Tierra gira a $460 \\, m/s$, orbita el Sol a $30,000 \\, m/s$, y el sistema solar se mueve por la galaxia a $220,000 \\, m/s$. ¡Nunca estás realmente quieto!',
            difficulty: 2
        },
        {
            title: 'Tiempo Cósmico',
            content: 'Si la historia del universo (13.8 mil millones de años) fuera un año, la Tierra se formaría en septiembre, la vida compleja aparecería en noviembre, y toda la historia humana sería los últimos 14 segundos del año.',
            difficulty: 1
        }
    ];
    
    const randomComparison = scaleComparisons[Math.floor(Math.random() * scaleComparisons.length)];
    return {
        ...randomComparison,
        category: 'scale',
        source: 'Comparaciones cósmicas'
    };
}

// ================================================
// 🎯 FUNCIONES DE VALIDACIÓN Y TESTING
// ================================================

/**
 * ✅ Valida la estructura del banco de curiosidades
 * @returns {Array} Array de errores encontrados (vacío si todo está correcto)
 */
function validateCuriosityDatabase() {
    const errors = [];
    
    Object.keys(curiosityDatabase).forEach(category => {
        if (!Array.isArray(curiosityDatabase[category])) {
            errors.push(`Categoría ${category}: debe ser un array`);
            return;
        }
        
        curiosityDatabase[category].forEach((curiosity, index) => {
            // ✅ Validar campos obligatorios
            if (!curiosity.title) {
                errors.push(`${category}[${index}]: falta campo 'title'`);
            }
            if (!curiosity.content) {
                errors.push(`${category}[${index}]: falta campo 'content'`);
            }
            if (!curiosity.category) {
                errors.push(`${category}[${index}]: falta campo 'category'`);
            }
            if (!curiosity.difficulty || curiosity.difficulty < 1 || curiosity.difficulty > 3) {
                errors.push(`${category}[${index}]: 'difficulty' debe ser 1, 2 o 3`);
            }
            
            // ✅ Validar coherencia de categoría
            if (curiosity.category !== category) {
                errors.push(`${category}[${index}]: categoría inconsistente`);
            }
        });
    });
    
    return errors;
}

/**
 * 🧪 Función de testing para verificar funcionalidad
 * @returns {Object} Resultados de las pruebas
 */
function testCuriosityFunctions() {
    const results = {
        randomCuriosity: null,
        categorySearch: null,
        difficultyFilter: null,
        stats: null,
        validation: null
    };
    
    try {
        // 🎲 Test curiosidad aleatoria
        results.randomCuriosity = getRandomCuriosity();
        
        // 📚 Test búsqueda por categoría
        results.categorySearch = getCuriositiesByCategory('fundamental').length;
        
        // ⭐ Test filtro por dificultad
        results.difficultyFilter = getCuriositiesByDifficulty(1).length;
        
        // 📊 Test estadísticas
        results.stats = getCuriosityStats();
        
        // ✅ Test validación
        results.validation = validateCuriosityDatabase();
        
    } catch (error) {
        results.error = error.message;
    }
    
    return results;
}

// ================================================
// 🌐 EXPORTACIONES Y CONFIGURACIÓN GLOBAL
// ================================================

// 🌟 Exponer funciones principales al objeto window para uso global
window.curiosityDatabase = curiosityDatabase;
window.getRandomCuriosity = getRandomCuriosity;
window.getCuriositiesByCategory = getCuriositiesByCategory;
window.getCuriositiesByDifficulty = getCuriositiesByDifficulty;
window.getRandomCuriosityByCategory = getRandomCuriosityByCategory;
window.searchCuriosities = searchCuriosities;
window.getCuriosityStats = getCuriosityStats;
window.getMultipleRandomCuriosities = getMultipleRandomCuriosities;
window.getCategoryDisplayName = getCategoryDisplayName;
window.getCuriositiesByPhysicsTopic = getCuriositiesByPhysicsTopic;
window.getContextualCuriosity = getContextualCuriosity;
window.generateNumericalCuriosity = generateNumericalCuriosity;
window.generateScaleCuriosity = generateScaleCuriosity;

// 🧪 Exponer funciones de testing en desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.validateCuriosities = validateCuriosityDatabase;
    window.testCuriosities = testCuriosityFunctions;
    console.log('🧪 Funciones de testing disponibles: validateCuriosities(), testCuriosities()');
}

// 📊 Mostrar estadísticas al cargar
console.log('🧠 Banco de curiosidades cargado:');
console.log(getCuriosityStats());

// ✅ Ejecutar validación automática
const validationErrors = validateCuriosityDatabase();
if (validationErrors.length > 0) {
    console.warn('⚠️ Errores encontrados en el banco de curiosidades:', validationErrors);
} else {
    console.log('✅ Banco de curiosidades validado correctamente');
}

// ================================================
// 📚 DOCUMENTACIÓN DE USO
// ================================================

/*
🎯 GUÍA DE USO DE CURIOSITIES.JS:

📝 FUNCIONES PRINCIPALES:
- getRandomCuriosity() - Obtiene una curiosidad aleatoria
- getCuriositiesByCategory(category) - Curiosidades por categoría
- getCuriositiesByDifficulty(difficulty) - Filtrar por dificultad
- searchCuriosities(keyword) - Buscar por palabra clave
- getContextualCuriosity(gameState) - Curiosidad contextual al juego

📊 CATEGORÍAS DISPONIBLES:
- fundamental: Física fundamental y constantes universales
- electromagnetism: Electricidad, magnetismo y campos
- thermodynamics: Temperatura, calor y entropía
- waves: Ondas, sonido y vibraciones
- astronomy: Espacio, estrellas y cosmología
- quantum: Mecánica cuántica y física de partículas
- mechanics: Movimiento, fuerzas y mecánica clásica
- optics: Luz, óptica y fenómenos visuales
- earth_physics: Física de la Tierra y geofísica

⭐ NIVELES DE DIFICULTAD:
1 - Conceptos básicos, accesibles para principiantes
2 - Nivel intermedio, requiere conocimientos previos
3 - Avanzado, conceptos complejos y matemáticas

🎮 INTEGRACIÓN CON EL JUEGO:
- Se llama automáticamente desde game.js
- getContextualCuriosity() adapta el contenido al progreso del jugador
- Las curiosidades aparecen al colisionar con meteoritos

🧮 SOPORTE PARA MATHJAX:
- Usar $ para fórmulas en línea: $E = mc^2$
- Usar $ para fórmulas centradas: $F = ma$
- Se renderiza automáticamente en el juego

📊 EJEMPLO DE USO:
```javascript
// Obtener curiosidad aleatoria
const curiosity = getRandomCuriosity();
console.log(curiosity.title, curiosity.content);

// Buscar curiosidades sobre Einstein
const einsteinFacts = searchCuriosities('Einstein');

// Obtener estadísticas
const stats = getCuriosityStats();
console.log(`Total: ${stats.totalCuriosities} curiosidades`);
```
*/

console.log('🧠 curiosities.js cargado completamente');
console.log('📚 Sistema de curiosidades listo para el juego');

// ================================================
// 🏁 FIN DEL ARCHIVO CURIOSITIES.JS
// ================================================