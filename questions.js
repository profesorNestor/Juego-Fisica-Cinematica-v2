// =================================================================================
// =================================================================================
// 📚 BANCO DE PREGUNTAS DE FÍSICA PARA ACADEMIA ESPACIAL 🚀
// Versión: 2.0 (Revisado y Mejorado por Asesor Científico)
//
// Este archivo contiene toda la base de datos de preguntas para el juego.
// ¡Está diseñado para ser fácil de leer, mantener y ampliar!
// =================================================================================
// =================================================================================

console.log('📚 Cargando banco de preguntas mejorado...');

/*
 * =================================================================================
 * 📝 ESTRUCTURA DE CADA OBJETO DE PREGUNTA
 * =================================================================================
 *
 * Cada pregunta es un objeto JavaScript con las siguientes propiedades:
 *
 * - type: 'string'         -> 'theory' para preguntas teóricas, 'calculation' para problemas.
 * - question: 'string'     -> El texto de la pregunta. ¡Puede contener LaTeX!
 * - options: ['array']    -> Un array con 4 strings, representando las opciones de respuesta.
 * - correct: number       -> El índice (0, 1, 2, o 3) de la respuesta correcta en el array 'options'.
 * - explanation: 'string' -> Una explicación detallada que se muestra después de responder. También soporta LaTeX.
 * - difficulty: number    -> Nivel de dificultad (1: Fácil, 2: Intermedio, 3: Difícil).
 * - formula?: 'string'    -> (Opcional) La fórmula principal usada en la pregunta, para mostrarla.
 * - given?: {object}      -> (Opcional) Un objeto con los datos iniciales del problema.
 *
 * 🚨 IMPORTANTE PARA LATEX:
 * Dentro de las cadenas de texto de JavaScript (en 'question', 'options', 'explanation', etc.),
 * TODOS los comandos de LaTeX deben usar un doble backslash (\\).
 * Ejemplo: Escribe '\\sqrt{x}' en lugar de '\sqrt{x}'.
 *
 * =================================================================================
 */

// ---------------------------------------------------------------------------------
// 📖 INICIO DE LA BASE DE DATOS PRINCIPAL
// ---------------------------------------------------------------------------------
const questionDatabase = {

    // =============================================================================
    // 📏 TEMA: MAGNITUDES FÍSICAS Y VECTORES (10 Preguntas)
    // Key: 'magnitudes'
    // =============================================================================
    magnitudes: [
        {
            type: 'theory',
            question: '¿Cuál de las siguientes es una magnitud escalar?',
            options: ['Velocidad', 'Aceleración', 'Temperatura', 'Fuerza'],
            correct: 2,
            explanation: 'La temperatura es una magnitud escalar porque se define completamente con un número y una unidad (ej. 25°C), sin necesidad de una dirección.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Qué caracteriza a una magnitud vectorial?',
            options: ['Solo tiene magnitud', 'Tiene magnitud, dirección y sentido', 'Solo tiene dirección', 'No tiene unidades'],
            correct: 1,
            explanation: 'Las magnitudes vectoriales como la fuerza o la velocidad necesitan magnitud (qué tan grande), dirección (la línea sobre la que actúa) y sentido (hacia dónde en esa línea) para quedar completamente definidas.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Cuál de las siguientes magnitudes es vectorial?',
            options: ['Masa', 'Tiempo', 'Desplazamiento', 'Energía'],
            correct: 2,
            explanation: 'El desplazamiento es una magnitud vectorial porque indica no solo cuánto te moviste (magnitud), sino también en qué dirección y sentido lo hiciste (ej. 50 metros al Norte).',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'La masa es una magnitud:',
            options: ['Vectorial', 'Escalar', 'Fundamental y vectorial', 'Derivada y vectorial'],
            correct: 1,
            explanation: 'La masa es una magnitud escalar fundamental del Sistema Internacional. Solo requiere un valor numérico y su unidad (ej. 70 kg).',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Si un vector de fuerza tiene componentes $F_x = 6\\,N$ y $F_y = 8\\,N$, ¿cuál es su magnitud total?',
            formula: '$|\\vec{F}| = \\sqrt{F_x^2 + F_y^2}$',
            given: { F_x: 6, F_y: 8 },
            options: ['10 N', '14 N', '2 N', '48 N'],
            correct: 0,
            explanation: 'La magnitud de un vector se calcula con el Teorema de Pitágoras: $|\\vec{F}| = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\,N$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Cuál es la diferencia principal entre distancia recorrida y desplazamiento?',
            options: ['No hay diferencia', 'La distancia es vectorial y el desplazamiento escalar', 'La distancia es escalar y el desplazamiento vectorial', 'Ambos son siempre iguales'],
            correct: 2,
            explanation: 'La distancia es la longitud total del camino (escalar, ej. 100m caminados), mientras que el desplazamiento es el vector desde el punto inicial al final (vectorial, ej. 20m al Este).',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un vector de 10 m de magnitud forma un ángulo de 37° con el eje X. ¿Cuál es su componente horizontal $V_x$?',
            formula: '$V_x = V \\cdot \\cos(\\theta)$',
            given: { F: 10, theta: '37°' },
            options: ['6 m', '8 m', '7.5 m', '5 m'],
            correct: 1,
            // Nota: Se usan aproximaciones comunes para ángulos notables en problemas de física.
            explanation: 'La componente horizontal se calcula como $V_x = 10 \\cdot \\cos(37°)$. Usando la aproximación común $\\cos(37°) \\approx 0.8$, obtenemos $V_x = 10 \\times 0.8 = 8\\,m$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'El producto escalar (o producto punto) de dos vectores $\\vec{A} \\cdot \\vec{B}$ siempre resulta en:',
            options: ['Otro vector', 'Un número (escalar)', 'Una matriz', 'Un vector perpendicular'],
            correct: 1,
            explanation: 'El producto escalar de dos vectores siempre da como resultado una cantidad escalar (un número sin dirección), que representa la proyección de un vector sobre el otro.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Si caminas 4 metros hacia el Norte y luego 3 metros hacia el Este, ¿cuál es la magnitud de tu desplazamiento?',
            options: ['7 m', '5 m', '1 m', '12 m'],
            correct: 1,
            explanation: 'Los vectores son perpendiculares, formando un triángulo rectángulo. Usamos Pitágoras: $|\\vec{d}| = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5\\,m$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Cuántas son las magnitudes físicas fundamentales en el Sistema Internacional (SI)?',
            options: ['Siete', 'Cinco', 'Nueve', 'Infinitas'],
            correct: 0,
            explanation: 'El Sistema Internacional (SI) define siete magnitudes fundamentales: longitud (metro), masa (kilogramo), tiempo (segundo), corriente eléctrica (amperio), temperatura (kelvin), cantidad de sustancia (mol) e intensidad luminosa (candela).',
            difficulty: 3
        }
    ],

    // =============================================================================
    // ⚖️ TEMA: SISTEMA INTERNACIONAL DE UNIDADES (15 Preguntas)
    // Key: 'si'
    // =============================================================================
    si: [
        {
            type: 'theory',
            question: '¿Cuál es la unidad de la fuerza en el Sistema Internacional (SI)?',
            options: ['Dina', 'Newton', 'Libra', 'Pascal'],
            correct: 1,
            explanation: 'El Newton (N) es la unidad derivada para la fuerza en el SI. Se define como la fuerza necesaria para acelerar 1 kg de masa a 1 m/s², es decir: $1\\,N = 1\\,kg \\cdot m/s^2$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un coche se mueve a 72 km/h. ¿Cuál es su velocidad en m/s?',
            formula: '$v_{\\text{m/s}} = v_{\\text{km/h}} \\div 3.6$',
            given: { v_kmh: 72 },
            options: ['20 m/s', '25 m/s', '36 m/s', '15 m/s'],
            correct: 0,
            explanation: 'Para convertir de km/h a m/s, se divide por 3.6. Entonces: $72 \\div 3.6 = 20\\,m/s$.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Cuál de las siguientes es la unidad SI para la Presión?',
            options: ['Atmósfera', 'Pascal', 'Bar', 'Torr'],
            correct: 1,
            explanation: 'El Pascal (Pa) es la unidad SI para presión. Se define como la fuerza de 1 Newton aplicada sobre un área de 1 metro cuadrado: $1\\,Pa = 1\\,N/m^2$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: '¿A cuántos metros equivalen 250 centímetros?',
            options: ['0.25 m', '2.5 m', '25 m', '25000 m'],
            correct: 1,
            explanation: 'Sabiendo que 1 metro tiene 100 centímetros, para convertir de cm a m, se divide por 100: $250 \\div 100 = 2.5\\,m$.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'En el SI, la unidad para medir Energía y Trabajo es el:',
            options: ['Vatio (Watt)', 'Caloría', 'Joule', 'Newton'],
            correct: 2,
            explanation: 'El Joule (J) es la unidad SI para energía, trabajo y calor. Se define como el trabajo hecho por una fuerza de 1 Newton a lo largo de 1 metro.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un atleta corre 1.5 km en 5 minutos. ¿Cuál es su rapidez promedio en m/s?',
            formula: '$v = \\frac{d}{t}$',
            given: { d: '1.5 km', t: '5 min' },
            options: ['5 m/s', '300 m/s', '30 m/s', '0.3 m/s'],
            correct: 0,
            explanation: 'Primero convertimos todo a unidades del SI. Distancia: $1.5\\,km = 1500\\,m$. Tiempo: $5\\,min = 300\\,s$. Luego, $v = \\frac{1500\\,m}{300\\,s} = 5\\,m/s$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Cuál es la unidad SI para la Potencia (el ritmo al que se transfiere energía)?',
            options: ['Joule', 'Kilovatio-hora', 'Vatio (Watt)', 'Caballo de fuerza'],
            correct: 2,
            explanation: 'El Vatio o Watt (W) es la unidad SI para potencia. Representa la transferencia de 1 Joule de energía por segundo: $1\\,W = 1\\,J/s$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Convierte 1.5 horas a segundos:',
            options: ['90 s', '3600 s', '5400 s', '9000 s'],
            correct: 2,
            explanation: 'Una hora tiene 60 minutos, y cada minuto tiene 60 segundos. Por lo tanto, 1 hora = $3600\\,s$. Entonces, $1.5\\,h \\times 3600\\,s/h = 5400\\,s$.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Cuál de estas NO es una unidad fundamental del SI?',
            options: ['Kilogramo (masa)', 'Metro (longitud)', 'Voltio (potencial eléctrico)', 'Segundo (tiempo)'],
            correct: 2,
            explanation: 'El Voltio es una unidad derivada ($1V = 1 J/C$), no fundamental. Las siete fundamentales son el metro, kilogramo, segundo, amperio, kelvin, mol y candela.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un área de $500\\,cm^2$ equivale en $m^2$ a:',
            options: ['0.05 m²', '0.5 m²', '5 m²', '50 m²'],
            correct: 0,
            explanation: 'Como $1\\,m = 100\\,cm$, entonces $1\\,m^2 = (100\\,cm)^2 = 10000\\,cm^2$. Para convertir de $cm^2$ a $m^2$, dividimos por 10000: $\\frac{500}{10000} = 0.05\\,m^2$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Qué representa el prefijo "giga" (G) en el SI?',
            options: ['$10^6$ (un millón)', '$10^9$ (mil millones)', '$10^{12}$ (un billón)', '$10^{-9}$ (milmillonésima)'],
            correct: 1,
            explanation: 'El prefijo "giga" (G) representa un factor de $10^9$, es decir, mil millones. Por ejemplo, 1 Gigavatio (GW) son mil millones de vatios.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'La densidad del mercurio es 13.6 g/cm³. ¿Cuál es su valor en kg/m³?',
            formula: '$\\rho_{\\text{kg/m³}} = \\rho_{\\text{g/cm³}} \\times 1000$',
            options: ['13.6 kg/m³', '136 kg/m³', '1360 kg/m³', '13600 kg/m³'],
            correct: 3,
            explanation: 'Para convertir de g/cm³ a kg/m³, se multiplica por 1000. Por lo tanto: $13.6 \\times 1000 = 13600\\,kg/m^3$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Cuál es la unidad SI para la frecuencia de una onda?',
            options: ['Hertz (Hz)', 'Radián por segundo (rad/s)', 'Decibelio (dB)', 'Metro (m)'],
            correct: 0,
            explanation: 'El Hertz (Hz) es la unidad SI para frecuencia. Se define como un ciclo o una vibración por segundo ($1\\,Hz = 1\\,s^{-1}$).',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un recipiente contiene 500 mililitros (mL) de agua. ¿Qué volumen es este en litros (L)?',
            options: ['0.5 L', '5 L', '0.05 L', '50 L'],
            correct: 0,
            explanation: 'Como 1 Litro (L) equivale a 1000 mililitros (mL), para convertir de mL a L, se divide por 1000: $500 \\div 1000 = 0.5\\,L$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Qué unidad SI mide la cantidad de sustancia a nivel molecular?',
            options: ['Kilogramo', 'Gramo', 'Mol', 'Unidad de Masa Atómica'],
            correct: 2,
            explanation: 'El mol (mol) es la unidad SI para cantidad de sustancia. Representa un número específico de partículas (átomos, moléculas), conocido como el número de Avogadro ($N_A \\approx 6.022 \\times 10^{23}$).',
            difficulty: 2
        }
    ],

    // =============================================================================
    // 🚀 TEMA: CINEMÁTICA (Conceptos Fundamentales) (15 Preguntas)
    // Key: 'cinematica'
    // =============================================================================
    cinematica: [
        {
            type: 'theory',
            question: '¿Qué es un sistema de referencia en física?',
            options: ['Un conjunto de objetos en movimiento', 'Un punto o conjunto de ejes desde el cual se describe el movimiento', 'La velocidad de un objeto', 'La trayectoria de una partícula'],
            correct: 1,
            explanation: 'Un sistema de referencia es el marco (un punto y un sistema de coordenadas) que un observador usa para medir posiciones y describir el movimiento. ¡El movimiento es siempre relativo a uno!',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Cuál es la diferencia entre trayectoria y desplazamiento?',
            options: ['No hay diferencia', 'La trayectoria es un vector y el desplazamiento es el camino', 'La trayectoria es el camino recorrido y el desplazamiento es el vector entre el inicio y el fin', 'Ambos son escalares'],
            correct: 2,
            explanation: 'La trayectoria es la línea real que un objeto sigue (puede ser curva). El desplazamiento es simplemente una flecha (vector) que va en línea recta desde donde empezaste hasta donde terminaste.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un auto viaja 30 km hacia el norte y luego 40 km hacia el este. ¿Cuál es la magnitud de su desplazamiento total?',
            formula: '$|\\vec{d}| = \\sqrt{d_x^2 + d_y^2}$',
            given: { d_norte: '30 km', d_este: '40 km' },
            options: ['70 km', '50 km', '35 km', '10 km'],
            correct: 1,
            explanation: 'El desplazamiento es la hipotenusa de un triángulo rectángulo. Usando Pitágoras: $|\\vec{d}| = \\sqrt{30^2 + 40^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50\\,km$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'La afirmación "el movimiento es relativo" significa que:',
            options: ['Todos los objetos se mueven igual', 'La descripción del movimiento depende del observador (sistema de referencia)', 'No existe el reposo absoluto', 'Ambas B y C son correctas'],
            correct: 3,
            explanation: 'El movimiento es relativo porque su descripción (velocidad, posición) cambia dependiendo del sistema de referencia del observador. Como no hay un punto "fijo" en el universo, no existe un reposo absoluto.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Qué representa el vector de posición $\\vec{r}$?',
            options: ['La distancia total recorrida', 'La velocidad instantánea', 'La ubicación de un punto respecto a un origen de coordenadas', 'La aceleración del objeto'],
            correct: 2,
            explanation: 'El vector de posición $\\vec{r}$ es una flecha que va desde el origen (0,0) de nuestro sistema de referencia hasta la ubicación actual del objeto.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Si un objeto está en $\\vec{r_i} = (3, 4)\\,$m y se mueve a $\\vec{r_f} = (7, 1)\\,$m, ¿cuál es su vector desplazamiento $\\Delta\\vec{r}$?',
            formula: '$\\Delta\\vec{r} = \\vec{r_f} - \\vec{r_i}$',
            given: { r_i: '(3, 4) m', r_f: '(7, 1) m' },
            options: ['(4, -3) m', '(10, 5) m', '(4, 3) m', '(-4, 3) m'],
            correct: 0,
            explanation: 'El desplazamiento es el vector final menos el inicial: $\\Delta\\vec{r} = (7, 1) - (3, 4) = (7-3, 1-4) = (4, -3)\\,m$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Cuándo se considera que un objeto está en reposo?',
            options: ['Cuando su velocidad es constante y no nula', 'Cuando su posición no cambia respecto a su sistema de referencia', 'Cuando su aceleración es cero', 'Solo si está en el origen (0,0)'],
            correct: 1,
            explanation: 'Un objeto está en reposo (relativo) si su posición permanece constante con el tiempo, medido desde un sistema de referencia específico.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'La velocidad media se define como:',
            options: ['El promedio de la velocidad inicial y final', 'El desplazamiento dividido por el intervalo de tiempo', 'La velocidad en un instante muy pequeño', 'La distancia total dividida por el tiempo total'],
            correct: 1,
            explanation: 'La velocidad media (un vector) se calcula como $\\vec{v_m} = \\frac{\\Delta\\vec{r}}{\\Delta t}$, donde $\\Delta\\vec{r}$ es el vector desplazamiento y $\\Delta t$ es el tiempo transcurrido.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un móvil recorre 120 metros en 8 segundos a velocidad constante. ¿Cuál es su rapidez?',
            formula: '$v = \\frac{d}{t}$',
            given: { distancia: '120 m', tiempo: '8 s' },
            options: ['15 m/s', '20 m/s', '12 m/s', '960 m/s'],
            correct: 0,
            explanation: 'La rapidez es $v = \\frac{\\text{distancia}}{\\text{tiempo}} = \\frac{120\\,m}{8\\,s} = 15\\,m/s$.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Cuál es la diferencia clave entre velocidad media y velocidad instantánea?',
            options: ['No hay ninguna diferencia', 'La media es para todo el recorrido, la instantánea es en un momento exacto', 'Una es vectorial y la otra escalar', 'Sus unidades son diferentes'],
            correct: 1,
            explanation: 'La velocidad media promedia el movimiento sobre un intervalo de tiempo largo, mientras que la velocidad instantánea es la velocidad que tiene un objeto en un preciso instante (lo que marca el velocímetro de un coche).',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un objeto cambia su velocidad de 10 m/s a 30 m/s en 4 segundos. ¿Cuál es su aceleración media?',
            formula: '$\\vec{a_m} = \\frac{\\Delta\\vec{v}}{\\Delta t}$',
            given: { v_i: '10 m/s', v_f: '30 m/s', tiempo: '4 s' },
            options: ['5 m/s²', '10 m/s²', '20 m/s²', '8 m/s²'],
            correct: 0,
            explanation: 'La aceleración media es $a_m = \\frac{v_f - v_i}{\\Delta t} = \\frac{30 - 10}{4} = \\frac{20}{4} = 5\\,m/s^2$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'En un plano Cartesiano (x, y) usado para describir movimiento, ¿qué información proporciona la coordenada "y"?',
            options: ['La posición horizontal', 'La posición vertical', 'La velocidad', 'El tiempo'],
            correct: 1,
            explanation: 'Por convención, en el plano Cartesiano el eje X representa la posición horizontal y el eje Y representa la posición vertical.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un punto se mueve de (2, 3) m a (8, 7) m. ¿Cuál es la magnitud de su desplazamiento?',
            formula: '$|\\Delta\\vec{r}| = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$',
            given: { posicion_inicial: '(2, 3) m', posicion_final: '(8, 7) m' },
            options: ['10 m', '7.2 m', '6 m', '4 m'],
            correct: 1,
            explanation: 'El vector desplazamiento es $(8-2, 7-3) = (6, 4)\\,$m. La magnitud es $|\\Delta\\vec{r}| = \\sqrt{6^2 + 4^2} = \\sqrt{36 + 16} = \\sqrt{52} \\approx 7.2\\,m$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'Si dos observadores en movimiento miden la velocidad del mismo objeto, ¿obtendrán el mismo resultado?',
            options: ['Sí, la velocidad es absoluta', 'Generalmente no, medirán velocidades diferentes', 'Sí, pero solo si el objeto está en reposo', 'Solo si se mueven en la misma dirección'],
            correct: 1,
            explanation: 'Debido a la relatividad del movimiento (Principio de Relatividad de Galileo), observadores en diferentes sistemas de referencia inerciales medirán velocidades diferentes para el mismo objeto.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Una partícula tiene $\\vec{v_0} = (3, 4)$ m/s y $\\vec{a} = (2, -1)$ m/s². ¿Cuál es su velocidad $\\vec{v}$ después de 2 s?',
            formula: '$\\vec{v} = \\vec{v_0} + \\vec{a}t$',
            given: { v_0: '(3, 4) m/s', a: '(2, -1) m/s²', t: '2 s' },
            options: ['(7, 2) m/s', '(5, 3) m/s', '(4, 1) m/s', '(8, 2) m/s'],
            correct: 0,
            explanation: 'La velocidad es $\\vec{v} = \\vec{v_0} + \\vec{a}t = (3, 4) + (2, -1) \\times 2 = (3, 4) + (4, -2) = (7, 2)\\,m/s$.',
            difficulty: 3
        }
    ],

    // =============================================================================
    // 🚗 TEMA: MOVIMIENTO RECTILÍNEO UNIFORME (MRU) (15 Preguntas)
    // Key: 'mru'
    // =============================================================================
    mru: [
        {
            type: 'theory',
            question: '¿Cuál es la característica principal del Movimiento Rectilíneo Uniforme (MRU)?',
            options: ['La aceleración es constante y positiva', 'La velocidad es constante', 'La distancia recorrida es siempre cero', 'La aceleración varía con el tiempo'],
            correct: 1,
            explanation: 'En un MRU, un objeto se mueve en línea recta a velocidad constante, lo que implica que su aceleración es cero.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Cuál es la ecuación de posición para el MRU?',
            options: ['$x(t) = x_0 + v \\cdot t$', '$x(t) = x_0 + v_0 t + \\frac{1}{2}at^2$', '$v = v_0 + at$', '$x = vt^2$'],
            correct: 0,
            explanation: 'La ecuación del MRU es $x(t) = x_0 + v \\cdot t$, donde $x_0$ es la posición inicial, $v$ es la velocidad constante y $t$ es el tiempo.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un auto parte de $x_0 = 10\\,m$ y viaja con $v = 20\\,m/s$. ¿En qué posición estará después de 5 s?',
            formula: '$x = x_0 + v \\cdot t$',
            given: { x_0: '10 m', v: '20 m/s', t: '5 s' },
            options: ['110 m', '100 m', '90 m', '120 m'],
            correct: 0,
            explanation: 'Usando $x = x_0 + v \\cdot t$, sustituimos: $x = 10 + (20 \\times 5) = 10 + 100 = 110\\,m$.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'En un MRU, la aceleración es siempre...',
            options: ['Positiva', 'Negativa', 'Cero', 'Variable'],
            correct: 2,
            explanation: 'En el MRU, la aceleración es siempre cero porque, por definición, la velocidad no cambia.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un tren viaja a velocidad constante de 90 km/h durante 1.5 horas. ¿Qué distancia recorre?',
            formula: '$d = v \\cdot t$',
            given: { v: '90 km/h', t: '1.5 h' },
            options: ['135 km', '60 km', '91.5 km', '180 km'],
            correct: 0,
            explanation: 'La distancia recorrida es $d = v \\cdot t = 90 \\times 1.5 = 135\\,km$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Una partícula se encuentra en $x = 20\\,m$ en $t=2\\,s$ y en $x = 50\\,m$ en $t=5\\,s$. ¿Cuál es su velocidad?',
            formula: '$v = \\frac{\\Delta x}{\\Delta t}$',
            given: { x_i: '20 m', t_i: '2 s', x_f: '50 m', t_f: '5 s' },
            options: ['10 m/s', '15 m/s', '30 m/s', '7.5 m/s'],
            correct: 0,
            explanation: 'La velocidad es $v = \\frac{x_f - x_i}{t_f - t_i} = \\frac{50 - 20}{5 - 2} = \\frac{30}{3} = 10\\,m/s$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'En una gráfica de posición vs. tiempo ($x$ vs $t$) para un MRU, ¿qué representa la pendiente de la recta?',
            options: ['La aceleración', 'La velocidad', 'La posición inicial', 'La distancia total'],
            correct: 1,
            explanation: 'En una gráfica $x$ vs $t$, la pendiente ($\Delta x / \Delta t$) representa la velocidad del objeto. En un MRU, esta pendiente es constante.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Dos autos A y B se mueven uno hacia el otro. A parte de $x=0$ a $20\\,m/s$ y B parte de $x=300\\,m$ a $-10\\,m/s$. ¿En qué tiempo se encuentran?',
            formula: '$x_A(t) = x_B(t)$',
            given: { v_A: '20 m/s', v_B: '-10 m/s', d_inicial: '300 m' },
            options: ['10 s', '15 s', '30 s', '5 s'],
            correct: 0,
            explanation: 'Se encuentran cuando sus posiciones son iguales: $20t = 300 - 10t$. Despejando: $30t = 300$, por lo tanto $t = 10\\,s$.',
            difficulty: 3
        },
        {
            type: 'theory',
            question: '¿Cómo es la gráfica de velocidad vs. tiempo ($v$ vs $t$) en un MRU?',
            options: ['Una parábola', 'Una línea recta horizontal', 'Una línea recta con pendiente', 'Una línea curva'],
            correct: 1,
            explanation: 'En un MRU, la velocidad es constante, por lo que la gráfica $v$ vs $t$ es una línea recta horizontal, indicando que el valor de $v$ no cambia con el tiempo.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un móvil tiene la ecuación de movimiento $x(t) = 15 - 5t$ (en SI). ¿Cuál es su posición inicial y su velocidad?',
            formula: '$x(t) = x_0 + v \\cdot t$',
            given: { ecuacion: 'x = 15 - 5t' },
            options: ['$x_0 = 15\\,m$, $v = -5\\,m/s$', '$x_0 = -5\\,m$, $v = 15\\,m/s$', '$x_0 = 15\\,m$, $v = 5\\,m/s$', '$x_0 = 10\\,m$, $v = 1\\,m/s$'],
            correct: 0,
            explanation: 'Comparando la ecuación dada con la forma general $x(t) = x_0 + v \\cdot t$, se deduce que la posición inicial $x_0 = 15\\,m$ y la velocidad $v = -5\\,m/s$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un ciclista viaja a 5 m/s. ¿Cuánto tiempo tarda en recorrer 1 km?',
            formula: '$t = \\frac{d}{v}$',
            given: { v: '5 m/s', d: '1 km' },
            options: ['200 s', '50 s', '100 s', '20 s'],
            correct: 0,
            explanation: 'Primero, convertimos 1 km a metros: $1\\,km = 1000\\,m$. Luego, el tiempo es $t = \\frac{d}{v} = \\frac{1000}{5} = 200\\,s$.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'Si un objeto tiene un MRU con velocidad negativa, significa que...',
            options: ['Está frenando', 'Se mueve en el sentido negativo del eje de coordenadas', 'Su aceleración es negativa', 'Está dando la vuelta'],
            correct: 1,
            explanation: 'Un signo negativo en la velocidad simplemente indica la dirección del movimiento. Si el eje positivo es hacia la derecha, una velocidad negativa significa que se mueve hacia la izquierda.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un objeto parte de $x_0 = -20\\,m$ y se mueve con velocidad $v = 8\\,m/s$. ¿En qué posición estará en $t = 5\\,s$?',
            formula: '$x = x_0 + v \\cdot t$',
            given: { x_0: '-20 m', v: '8 m/s', t: '5 s' },
            options: ['20 m', '60 m', '-60 m', '40 m'],
            correct: 0,
            explanation: 'La posición final es $x = -20 + (8 \\times 5) = -20 + 40 = 20\\,m$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'En una gráfica de velocidad vs. tiempo ($v$ vs $t$) de un MRU, ¿qué representa el área bajo la recta?',
            options: ['La aceleración', 'El desplazamiento', 'La velocidad media', 'La posición final'],
            correct: 1,
            explanation: 'El área bajo la curva en una gráfica $v$ vs $t$ (que es un rectángulo en el MRU) representa el desplazamiento del objeto ($\Delta x = v \cdot \Delta t$).',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Dos móviles parten del mismo punto en sentidos opuestos. Uno a 10 m/s y el otro a 15 m/s. ¿Qué distancia los separa después de 4 s?',
            formula: '$d_{total} = d_1 + d_2 = |v_1|t + |v_2|t$',
            given: { v_1: '10 m/s', v_2: '-15 m/s', t: '4 s' },
            options: ['100 m', '20 m', '40 m', '60 m'],
            correct: 0,
            explanation: 'El primero recorre $10 \\times 4 = 40\\,m$. El segundo recorre $15 \\times 4 = 60\\,m$ en sentido opuesto. La distancia total que los separa es $40 + 60 = 100\\,m$.',
            difficulty: 3
        }
    ],

    // =============================================================================
    // 🏎️ TEMA: MOVIMIENTO RECTILÍNEO UNIFORMEMENTE ACELERADO (MRUA) (15 Preguntas)
    // Key: 'mrua'
    // =============================================================================
    mrua: [
        {
            type: 'theory',
            question: 'En un MRUA, ¿qué magnitud permanece constante y no nula durante todo el movimiento?',
            options: ['La velocidad', 'La posición', 'La aceleración', 'El desplazamiento'],
            correct: 2,
            explanation: 'La característica que define al MRUA es que la aceleración es constante y diferente de cero. Esto provoca que la velocidad cambie de manera uniforme.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Cuál de las siguientes es una ecuación fundamental del MRUA?',
            options: ['$x = v \\cdot t$', '$v_f = v_0 + a \\cdot t$', '$a = v \\cdot t$', '$x = a \\cdot t$'],
            correct: 1,
            explanation: 'La ecuación $v_f = v_0 + a \\cdot t$ relaciona la velocidad final ($v_f$) con la velocidad inicial ($v_0$), la aceleración constante ($a$) y el tiempo ($t$).',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un auto parte del reposo ($v_0 = 0$) y acelera a 4 m/s². ¿Qué velocidad alcanza después de 5 segundos?',
            formula: '$v_f = v_0 + a \\cdot t$',
            given: { v_0: '0 m/s', a: '4 m/s²', t: '5 s' },
            options: ['20 m/s', '9 m/s', '1 m/s', '16 m/s'],
            correct: 0,
            explanation: 'Usando $v_f = v_0 + a \\cdot t$, tenemos $v_f = 0 + 4 \\times 5 = 20\\,m/s$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un objeto parte del reposo con $a=2\\,m/s^2$. ¿Qué distancia recorre en los primeros 3 segundos?',
            formula: '$\\Delta x = v_0 t + \\frac{1}{2}at^2$',
            given: { v_0: '0 m/s', a: '2 m/s²', t: '3 s' },
            options: ['9 m', '18 m', '6 m', '3 m'],
            correct: 0,
            explanation: 'Usando $\\Delta x = v_0 t + \\frac{1}{2}at^2$, tenemos $\\Delta x = (0)(3) + \\frac{1}{2}(2)(3^2) = 0 + 9 = 9\\,m$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un móvil con $v_0 = 10\\,m/s$ acelera a $2\\,m/s^2$ durante 4 s. ¿Cuál es su velocidad final?',
            formula: '$v_f = v_0 + a \\cdot t$',
            given: { v_0: '10 m/s', a: '2 m/s²', t: '4 s' },
            options: ['18 m/s', '16 m/s', '28 m/s', '20 m/s'],
            correct: 0,
            explanation: 'La velocidad final es $v_f = 10 + (2 \\times 4) = 10 + 8 = 18\\,m/s$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un auto frena desde 25 m/s hasta detenerse en 5 s. ¿Cuál es su aceleración (de frenado)?',
            formula: '$a = \\frac{v_f - v_0}{t}$',
            given: { v_0: '25 m/s', v_f: '0 m/s', t: '5 s' },
            options: ['-5 m/s²', '-10 m/s²', '5 m/s²', '-2.5 m/s²'],
            correct: 0,
            explanation: 'Despejando: $a = \\frac{v_f - v_0}{t} = \\frac{0 - 25}{5} = -5\\,m/s^2$. El signo negativo indica que es una desaceleración.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un objeto con $v_0=6\\,m/s$ acelera a $2\\,m/s^2$. ¿Qué velocidad final tiene tras recorrer 40 m?',
            formula: '$v_f^2 = v_0^2 + 2a\\Delta x$',
            given: { v_0: '6 m/s', a: '2 m/s²', x: '40 m' },
            options: ['14 m/s', '196 m/s', '10 m/s', '18 m/s'],
            correct: 0,
            explanation: 'Usamos la ecuación que no depende del tiempo: $v_f^2 = 6^2 + 2(2)(40) = 36 + 160 = 196$. Luego, $v_f = \\sqrt{196} = 14\\,m/s$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'Una aceleración negativa en un MRUA significa que...',
            options: ['El objeto siempre está frenando', 'La velocidad es negativa', 'El vector aceleración apunta en el sentido negativo del eje', 'El objeto se mueve más lento que la luz'],
            correct: 2,
            explanation: 'Una aceleración negativa simplemente apunta en sentido contrario al positivo. Puede significar frenar (si la velocidad es positiva) o acelerar en sentido negativo (si la velocidad es negativa).',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un móvil pasa de 8 m/s a 20 m/s recorriendo 70 m. ¿Cuánto tiempo tardó?',
            formula: '$\\Delta x = \\frac{(v_0 + v_f)t}{2}$',
            given: { v_0: '8 m/s', v_f: '20 m/s', x: '70 m' },
            options: ['5 s', '7 s', '2.5 s', '10 s'],
            correct: 0,
            explanation: 'Usamos la ecuación que relaciona distancia y velocidades: $70 = \\frac{(8 + 20)t}{2} = \\frac{28t}{2} = 14t$. Despejando, $t = \\frac{70}{14} = 5\\,s$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un objeto parte del reposo y recorre 50 m en 5 s con aceleración constante. ¿Cuál es su aceleración?',
            formula: '$\\Delta x = v_0 t + \\frac{1}{2}at^2$',
            given: { v_0: '0 m/s', x: '50 m', t: '5 s' },
            options: ['4 m/s²', '10 m/s²', '2 m/s²', '5 m/s²'],
            correct: 0,
            explanation: 'Despejando de $\\Delta x = \\frac{1}{2}at^2$: $50 = \\frac{1}{2}a(5^2) = \\frac{25a}{2}$. Por tanto, $a = \\frac{50 \\times 2}{25} = 4\\,m/s^2$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: 'En un MRUA, la gráfica de posición vs. tiempo ($x$ vs $t$) es una:',
            options: ['Línea recta horizontal', 'Línea recta con pendiente constante', 'Parábola', 'Curva exponencial'],
            correct: 2,
            explanation: 'Debido al término $t^2$ en la ecuación de posición ($x(t) = x_0 + v_0 t + \\frac{1}{2}at^2$), la gráfica de posición contra tiempo es siempre una parábola.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un auto acelera desde 15 m/s hasta 25 m/s en una distancia de 100 m. ¿Cuál es su aceleración?',
            formula: '$a = \\frac{v_f^2 - v_0^2}{2\\Delta x}$',
            given: { v_0: '15 m/s', v: '25 m/s', x: '100 m' },
            options: ['2 m/s²', '4 m/s²', '1 m/s²', '0.5 m/s²'],
            correct: 0,
            explanation: 'Despejando de $v_f^2 = v_0^2 + 2a\\Delta x$: $a = \\frac{25^2 - 15^2}{2(100)} = \\frac{625 - 225}{200} = \\frac{400}{200} = 2\\,m/s^2$.',
            difficulty: 3
        },
        {
            type: 'calculation',
            // PREGUNTA CORREGIDA: Los datos originales no tenían solución real.
            question: 'Un objeto con $v_0=10\\,m/s$ y $a=-2\\,m/s^2$ recorre 24 m. ¿Cuál es su velocidad final?',
            formula: '$v_f^2 = v_0^2 + 2a\\Delta x$',
            given: { v_0: '10 m/s', a: '-2 m/s²', x: '24 m' },
            options: ['4 m/s', '2 m/s', 'Se detuvo antes', '6 m/s'],
            correct: 1,
            explanation: 'Usando $v_f^2 = v_0^2 + 2a\\Delta x$: $v_f^2 = 10^2 + 2(-2)(24) = 100 - 96 = 4$. La velocidad final es $v_f = \\sqrt{4} = 2\\,m/s$.',
            difficulty: 3
        },
        {
            type: 'theory',
            question: 'En una gráfica de aceleración vs. tiempo ($a$ vs $t$) para un MRUA, ¿qué representa el área bajo la recta?',
            options: ['El desplazamiento', 'El cambio de velocidad ($\\Delta v$)', 'La velocidad final', 'La posición'],
            correct: 1,
            explanation: 'El área bajo la curva en una gráfica $a$ vs $t$ representa el cambio total en la velocidad, ya que $\\Delta v = a \cdot \\Delta t$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un móvil parte con 5 m/s y tras recorrer 60 m su velocidad es 15 m/s. ¿Cuánto tiempo tardó?',
            formula: '$\\Delta x = \\frac{(v_0 + v_f)t}{2}$',
            given: { v_0: '5 m/s', v: '15 m/s', x: '60 m' },
            options: ['6 s', '4 s', '8 s', '10 s'],
            correct: 0,
            explanation: 'Usando $\\Delta x = \\frac{(v_0+v_f)t}{2}$: $60 = \\frac{(5+15)t}{2} = \\frac{20t}{2} = 10t$. Despejando, $t = 6\\,s$.',
            difficulty: 3
        }
    ],

    // =============================================================================
    // ⭕ TEMA: MOVIMIENTO CIRCULAR UNIFORME (MCU) (15 Preguntas)
    // Key: 'mcu'
    // =============================================================================
    mcu: [
        {
            type: 'theory',
            question: 'En un Movimiento Circular Uniforme (MCU), ¿qué magnitud vectorial está cambiando constantemente?',
            options: ['La rapidez o celeridad', 'El vector velocidad lineal', 'La velocidad angular', 'El radio'],
            correct: 1,
            explanation: 'En un MCU, la rapidez (el módulo de la velocidad) es constante, pero el vector velocidad lineal siempre cambia de dirección, ya que siempre es tangente a la trayectoria circular.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'Un radián (rad) se define como el ángulo cuyo arco mide...',
            options: ['Lo mismo que el diámetro', 'Lo mismo que el radio', '360 grados', 'Pi veces el radio'],
            correct: 1,
            explanation: 'Un radián es la medida de un ángulo central en un círculo tal que la longitud del arco que subtiende es igual a la longitud del radio. $\\theta = \\frac{s}{r}$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un punto en una rueda de 0.5 m de radio recorre un arco de 2 m. ¿Qué ángulo ha girado en radianes?',
            formula: '$\\theta = \\frac{s}{r}$',
            given: { s: '2 m', r: '0.5 m' },
            options: ['4 rad', '1 rad', '2.5 rad', 'π rad'],
            correct: 0,
            explanation: 'El ángulo es $\\theta = \\frac{\\text{arco}}{\\text{radio}} = \\frac{2\\,m}{0.5\\,m} = 4\\,rad$.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'La velocidad angular ($\\omega$) mide:',
            options: ['La distancia recorrida por segundo', 'Los metros por segundo', 'El ángulo girado por unidad de tiempo', 'Las vueltas totales'],
            correct: 2,
            explanation: 'La velocidad angular $\\omega$ mide la rapidez con la que un objeto gira o rota, y se expresa comúnmente en radianes por segundo (rad/s).',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Una partícula se mueve en un círculo de radio 3 m con velocidad angular $\\omega = 2\\,$rad/s. ¿Cuál es su velocidad lineal (rapidez)?',
            formula: '$v = \\omega \\cdot r$',
            given: { omega: '2 rad/s', r: '3 m' },
            options: ['6 m/s', '1.5 m/s', '5 m/s', '9 m/s'],
            correct: 0,
            explanation: 'La velocidad lineal (o tangencial) es $v = \\omega \\cdot r = 2 \\times 3 = 6\\,m/s$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un disco gira $5\\pi$ radianes en 2 segundos. ¿Cuál es su velocidad angular media?',
            formula: '$\\omega = \\frac{\\Delta\\theta}{\\Delta t}$',
            given: { theta: '5π rad', t: '2 s' },
            options: ['2.5π rad/s', '5π rad/s', '10π rad/s', '2.5 rad/s'],
            correct: 0,
            explanation: 'La velocidad angular es $\\omega = \\frac{\\Delta\\theta}{\\Delta t} = \\frac{5\\pi}{2} = 2.5\\pi\\,rad/s$.',
            difficulty: 2
        },
        {
            type: 'theory',
            question: '¿Qué representa el período (T) en un MCU?',
            options: ['La mitad del tiempo de una vuelta', 'El tiempo que tarda en dar una vuelta completa', 'El número de vueltas que da en un segundo', 'La velocidad a la que gira'],
            correct: 1,
            explanation: 'El período (T) es el tiempo, medido en segundos, que un objeto tarda en completar una revolución o ciclo completo.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Una rueda da 10 vueltas en 4 segundos. ¿Cuál es su período (T)?',
            formula: '$T = \\frac{\\text{tiempo total}}{\\text{número de vueltas}}$',
            given: { n: '10 vueltas', t: '4 s' },
            options: ['0.4 s', '2.5 s', '40 s', '14 s'],
            correct: 0,
            explanation: 'El período es $T = \\frac{4\\,s}{10\\,\\text{vueltas}} = 0.4\\,s$ por vuelta.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un motor gira a 120 RPM (revoluciones por minuto). ¿Cuál es su frecuencia (f) en Hertz (Hz)?',
            formula: '$f(\\text{Hz}) = \\frac{\\text{RPM}}{60}$',
            given: { RPM: '120 rev/min' },
            options: ['2 Hz', '120 Hz', '60 Hz', '0.5 Hz'],
            correct: 0,
            explanation: 'La frecuencia en Hz es revoluciones por segundo. Convertimos: $120\\,\\frac{rev}{min} \\times \\frac{1\\,min}{60\\,s} = 2\\,\\frac{rev}{s} = 2\\,Hz$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Una partícula tiene un período de 0.2 s. ¿Cuál es su frecuencia?',
            formula: '$f = \\frac{1}{T}$',
            given: { T: '0.2 s' },
            options: ['5 Hz', '0.2 Hz', '2 Hz', '10 Hz'],
            correct: 0,
            explanation: 'La frecuencia es el inverso del período: $f = \\frac{1}{T} = \\frac{1}{0.2} = 5\\,Hz$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un objeto gira con un período de $\\pi$ segundos. ¿Cuál es su velocidad angular?',
            formula: '$\\omega = \\frac{2\\pi}{T}$',
            given: { T: 'π s' },
            options: ['2 rad/s', 'π rad/s', '2π rad/s', '1 rad/s'],
            correct: 0,
            explanation: 'La velocidad angular es $\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{\\pi} = 2\\,rad/s$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un satélite orbita con $v = 4000\\,m/s$ en una órbita de radio $R = 8 \\times 10^6\\,m$. ¿Cuál es su aceleración centrípeta?',
            formula: '$a_c = \\frac{v^2}{r}$',
            given: { v: '4000 m/s', r: '8×10⁶ m' },
            options: ['2 m/s²', '0.5 m/s²', '8 m/s²', '16 m/s²'],
            correct: 0,
            explanation: 'La aceleración centrípeta es $a_c = \\frac{v^2}{r} = \\frac{(4000)^2}{8 \\times 10^6} = \\frac{1.6 \\times 10^7}{8 \\times 10^6} = 2\\,m/s^2$.',
            difficulty: 3
        },
        {
            type: 'theory',
            question: 'En un MCU, el vector de aceleración centrípeta siempre apunta...',
            options: ['En la misma dirección que la velocidad', 'Hacia el centro de la circunferencia', 'Hacia afuera del círculo (es centrífuga)', 'En dirección opuesta a la velocidad'],
            correct: 1,
            explanation: 'La aceleración centrípeta es la responsable de cambiar la dirección del vector velocidad, y para lograrlo, siempre apunta hacia el centro de la trayectoria circular.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'El borde de un carrusel de 5 m de radio se mueve a 10 m/s. ¿Cuál es su velocidad angular?',
            formula: '$\\omega = \\frac{v}{r}$',
            given: { v: '10 m/s', r: '5 m' },
            options: ['2 rad/s', '0.5 rad/s', '50 rad/s', '15 rad/s'],
            correct: 0,
            explanation: 'Despejando de $v = \\omega r$, obtenemos $\\omega = \\frac{v}{r} = \\frac{10\\,m/s}{5\\,m} = 2\\,rad/s$.',
            difficulty: 3
        },
        {
            type: 'theory',
            question: 'Dos niños están en un carrusel, uno cerca del centro y otro en el borde. ¿Cuál de las siguientes afirmaciones es correcta?',
            options: ['Ambos tienen la misma velocidad lineal', 'Ambos tienen la misma velocidad angular', 'Ambos tienen la misma aceleración centrípeta', 'El del centro va más rápido'],
            correct: 1,
            explanation: 'Todo punto en un cuerpo rígido que rota (como un carrusel) completa una vuelta en el mismo tiempo, por lo tanto, todos los puntos tienen la misma velocidad angular ($\\omega$).',
            difficulty: 3
        }
    ],

    // =============================================================================
    // 🌍 TEMA: MOVIMIENTO VERTICAL Y CAÍDA LIBRE (10 Preguntas)
    // Key: 'gravedad'
    // =============================================================================
    gravedad: [
        {
            type: 'theory',
            question: 'En el vacío (sin aire), si se dejan caer un martillo y una pluma desde la misma altura, ¿cuál llega primero al suelo?',
            options: ['El martillo, por ser más pesado', 'La pluma, por ser más ligera', 'Llegan exactamente al mismo tiempo', 'Depende de la forma de los objetos'],
            correct: 2,
            explanation: 'Galileo demostró (y los astronautas en la Luna confirmaron) que en ausencia de resistencia del aire, todos los objetos caen con la misma aceleración ($g \\approx 9.8\\,m/s^2$), independientemente de su masa.',
            difficulty: 1
        },
        {
            type: 'theory',
            question: 'La aceleración de la gravedad ($g$) se considera negativa en las ecuaciones de movimiento ($g = -9.8\\,m/s^2$) porque...',
            options: ['Es una fuerza que nos atrae', 'Convencionalmente, apunta hacia abajo, en el sentido negativo del eje Y', 'Siempre frena los objetos', 'La gravedad es una fuerza débil'],
            correct: 1,
            explanation: 'Por convención, en física se suele establecer el eje Y positivo hacia arriba. Como la gravedad siempre tira de los objetos hacia abajo, su aceleración tiene signo negativo.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Se deja caer una pelota desde el reposo. ¿Qué velocidad tendrá después de 3 segundos? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$v_f = v_0 + gt$',
            given: { v_0: '0 m/s', g: '-10 m/s²', t: '3 s' },
            options: ['-30 m/s', '30 m/s', '-10 m/s', '-3.3 m/s'],
            correct: 0,
            explanation: 'La velocidad es $v_f = v_0 + gt = 0 + (-10) \\times 3 = -30\\,m/s$. El signo negativo indica que se mueve hacia abajo.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Una piedra se deja caer desde un acantilado. ¿Qué altura habrá descendido después de 2 segundos? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$\\Delta y = v_0 t + \\frac{1}{2}gt^2$',
            given: { v_0: '0 m/s', g: '-10 m/s²', t: '2 s' },
            options: ['-20 m', '20 m', '-10 m', '-40 m'],
            correct: 0,
            explanation: 'La posición es $\\Delta y = (0)(2) + \\frac{1}{2}(-10)(2^2) = 0 - 5 \\times 4 = -20\\,m$. El signo negativo indica un descenso de 20 m.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Se lanza una pelota verticalmente hacia arriba con $v_0 = 30\\,m/s$. ¿Cuál será su velocidad después de 2 segundos? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$v_f = v_0 + gt$',
            given: { v_0: '30 m/s', g: '-10 m/s²', t: '2 s' },
            options: ['10 m/s', '50 m/s', '-10 m/s', '20 m/s'],
            correct: 0,
            explanation: 'La velocidad es $v_f = 30 + (-10) \\times 2 = 30 - 20 = 10\\,m/s$. Aún se mueve hacia arriba, pero más lento.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Una flecha se dispara hacia arriba con 40 m/s. ¿Cuánto tiempo tarda en alcanzar su altura máxima? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$t_{subida} = -\\frac{v_0}{g}$',
            given: { v_0: '40 m/s', v_f: '0 m/s', g: '-10 m/s²' },
            options: ['4 s', '8 s', '2 s', '40 s'],
            correct: 0,
            explanation: 'En la altura máxima, la velocidad final es $v_f = 0$. De $v_f = v_0 + gt$, tenemos $0 = 40 + (-10)t$. Despejando, $t = \\frac{40}{10} = 4\\,s$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Se deja caer un objeto y tarda 3 segundos en llegar al suelo. ¿Desde qué altura se dejó caer? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$h = |\\frac{1}{2}gt^2|$',
            given: { v_0: '0 m/s', t: '3 s', g: '-10 m/s²' },
            options: ['45 m', '90 m', '30 m', '15 m'],
            correct: 0,
            explanation: 'La altura de caída es $h = |\\Delta y| = |(0)(3) + \\frac{1}{2}(-10)(3^2)| = |-5 \\times 9| = 45\\,m$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Se lanza una pelota hacia arriba con 20 m/s. ¿Cuál es la altura máxima que alcanza? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$h_{max} = -\\frac{v_0^2}{2g}$',
            given: { v_0: '20 m/s', v_f: '0 m/s', g: '-10 m/s²' },
            options: ['20 m', '40 m', '10 m', '30 m'],
            correct: 0,
            explanation: 'En la altura máxima $v_f=0$. De $v_f^2 = v_0^2 + 2g\\Delta y$, tenemos $0 = 20^2 + 2(-10)h_{max}$. Entonces $20h_{max} = 400$, y $h_{max} = 20\\,m$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Una pelota lanzada hacia arriba con $v_0$ tarda 6 segundos en volver al punto de partida. ¿Con qué velocidad fue lanzada? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$t_{vuelo} = 2 \\cdot t_{subida} = -\\frac{2v_0}{g}$',
            given: { t_vuelo: '6 s', g: '-10 m/s²' },
            options: ['30 m/s', '60 m/s', '15 m/s', '120 m/s'],
            correct: 0,
            explanation: 'El tiempo total de vuelo es el doble del tiempo de subida. $t_{subida} = 3\\,s$. Usando $v_f = v_0 + gt$ para la subida: $0 = v_0 + (-10)(3)$, por lo tanto $v_0 = 30\\,m/s$.',
            difficulty: 3
        },
        {
            type: 'calculation',
            // PREGUNTA CORREGIDA: Los datos originales y las opciones no coincidían.
            question: 'Un objeto es lanzado hacia arriba con $v_0=8\\,m/s$. ¿Qué desplazamiento vertical tuvo al alcanzar $v_f=-12\\,m/s$? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$v_f^2 = v_0^2 + 2g\\Delta y$',
            given: { v_0: '8 m/s', v_f: '-12 m/s', g: '-10 m/s²' },
            options: ['-4 m', '4 m', '-8 m', '8 m'],
            correct: 0,
            explanation: 'Usamos la ecuación que no depende del tiempo: $(-12)^2 = 8^2 + 2(-10)\\Delta y$. Esto es $144 = 64 - 20\\Delta y$. Despejando: $80 = -20\\Delta y$, así que $\\Delta y = -4\\,m$.',
            difficulty: 3
        }
    ],

    // =============================================================================
    // 🏹 TEMA: MOVIMIENTO PARABÓLICO (15 Preguntas)
    // Key: 'parabolico'
    // =============================================================================
    parabolico: [
        {
            type: 'theory',
            question: 'El movimiento parabólico es una composición de dos movimientos independientes. Estos son:',
            options: ['Dos MRU', 'Dos MRUA', 'MRU en el eje X y MRUA en el eje Y', 'MRUA en el eje X y MRU en el eje Y'],
            correct: 2,
            explanation: 'El movimiento parabólico (lanzamiento de proyectiles) se analiza como un MRU en el eje horizontal (velocidad horizontal constante) y un MRUA en el eje vertical (afectado por la gravedad).',
            difficulty: 1
        },
        {
            type: 'theory',
            question: '¿Qué componente de la velocidad de un proyectil permanece constante (ignorando la fricción del aire)?',
            options: ['La componente vertical ($v_y$)', 'La componente horizontal ($v_x$)', 'Ambas componentes', 'La velocidad total'],
            correct: 1,
            explanation: 'En el movimiento parabólico ideal, no hay fuerzas horizontales, por lo que la componente horizontal de la velocidad ($v_x$) permanece constante durante todo el vuelo.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un proyectil se lanza con $v_0=40\\,m/s$ a un ángulo de 30°. ¿Cuál es la componente horizontal de la velocidad inicial ($v_{0x}$)?',
            formula: '$v_{0x} = v_0 \\cdot \\cos(\\theta)$',
            given: { v_0: '40 m/s', theta: '30°' },
            options: ['34.6 m/s', '20 m/s', '40 m/s', '25.5 m/s'],
            correct: 0,
            explanation: 'La componente horizontal es $v_{0x} = 40 \\cdot \\cos(30°) = 40 \\cdot \\frac{\\sqrt{3}}{2} \\approx 34.6\\,m/s$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un proyectil se lanza con $v_0=40\\,m/s$ a un ángulo de 30°. ¿Cuál es la componente vertical de la velocidad inicial ($v_{0y}$)?',
            formula: '$v_{0y} = v_0 \\cdot \\sin(\\theta)$',
            given: { v_0: '40 m/s', theta: '30°' },
            options: ['20 m/s', '34.6 m/s', '40 m/s', '15 m/s'],
            correct: 0,
            explanation: 'La componente vertical es $v_{0y} = 40 \\cdot \\sin(30°) = 40 \\cdot 0.5 = 20\\,m/s$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Un proyectil con $v_x = 15\\,m/s$ (constante) vuela durante 4 segundos. ¿Qué distancia horizontal (alcance) recorre?',
            formula: '$x = v_x \\cdot t$',
            given: { v_x: '15 m/s', t: '4 s' },
            options: ['60 m', '19 m', '3.75 m', '30 m'],
            correct: 0,
            explanation: 'La distancia horizontal es simplemente $x = v_x \\cdot t = 15 \\times 4 = 60\\,m$.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'En el punto más alto de su trayectoria, un proyectil lanzado a 30° con $v_0=50\\,m/s$ tiene una velocidad de:',
            formula: '$v_{alto} = v_{0x} = v_0 \\cos(\\theta)$',
            given: { v_0: '50 m/s', theta: '30°' },
            options: ['0 m/s', '25 m/s', '43.3 m/s', '50 m/s'],
            correct: 2,
            explanation: 'En el punto más alto, la componente vertical de la velocidad ($v_y$) es cero. La velocidad total es igual a la componente horizontal, que es constante: $v_x = 50 \\cdot \\cos(30°) \\approx 43.3\\,m/s$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un proyectil se lanza con $v_{0y} = 30\\,m/s$. ¿Cuál es el tiempo total de vuelo? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$t_{vuelo} = -\\frac{2v_{0y}}{g}$',
            given: { v_oy: '30 m/s', g: '-10 m/s²' },
            options: ['6 s', '3 s', '1.5 s', '9 s'],
            correct: 0,
            explanation: 'El tiempo de subida es $t_s = -v_{0y}/g = -30/(-10) = 3s$. El tiempo total de vuelo es el doble: $2 \\times 3s = 6s$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un proyectil con $v_{0x} = 20\\,m/s$ tiene un tiempo de vuelo de 8 s. ¿Cuál es su alcance horizontal máximo?',
            formula: '$R = v_{0x} \\cdot t_{vuelo}$',
            given: { v_ox: '20 m/s', t_vuelo: '8 s' },
            options: ['160 m', '2.5 m', '28 m', '80 m'],
            correct: 0,
            explanation: 'El alcance horizontal máximo es $R = v_{0x} \\cdot t_{vuelo} = 20 \\times 8 = 160\\,m$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un proyectil se lanza con $v_{0y} = 20\\,m/s$. ¿Cuál es la altura máxima que alcanza? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$H_{max} = -\\frac{v_{0y}^2}{2g}$',
            given: { v_oy: '20 m/s', g: '-10 m/s²' },
            options: ['20 m', '40 m', '10 m', '2 m'],
            correct: 0,
            explanation: 'La altura máxima es $H_{max} = -\\frac{v_{0y}^2}{2g} = -\\frac{20^2}{2(-10)} = -\\frac{400}{-20} = 20\\,m$.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Se lanza un proyectil con velocidad de 30 m/s a 45°. ¿Cuál es su alcance horizontal? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$R = \\frac{v_0^2 \\sin(2\\theta)}{|g|}$',
            given: { v_0: '30 m/s', theta: '45°', g: '10 m/s²' },
            options: ['90 m', '45 m', '180 m', '60 m'],
            correct: 0,
            explanation: 'El alcance es $R = \\frac{30^2 \\cdot \\sin(2 \\times 45°)}{10} = \\frac{900 \\cdot \\sin(90°)}{10} = \\frac{900 \\cdot 1}{10} = 90\\,m$.',
            difficulty: 3
        },
        {
            type: 'theory',
            question: '¿Con qué ángulo de lanzamiento se logra el máximo alcance horizontal (en terreno plano)?',
            options: ['30°', '45°', '60°', '90°'],
            correct: 1,
            explanation: 'El alcance máximo se obtiene con un ángulo de 45°, porque esto maximiza el valor de $\\sin(2\\theta)$ en la fórmula del alcance, haciéndolo igual a 1.',
            difficulty: 2
        },
        {
            type: 'calculation',
            question: 'Un cañón dispara un proyectil a 60° con $v_0=100\\,m/s$. Después de 5 segundos, ¿cuál es su velocidad vertical $v_y$? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$v_y(t) = v_{0y} + gt$',
            given: { v_0: '100 m/s', theta: '60°', t: '5 s', g: '-10 m/s²' },
            options: ['36.6 m/s', '50 m/s', '86.6 m/s', '136.6 m/s'],
            correct: 0,
            explanation: 'Primero, $v_{0y} = 100 \\cdot \\sin(60°) \\approx 86.6\\,m/s$. Luego, $v_y = 86.6 + (-10)(5) = 86.6 - 50 = 36.6\\,m/s$.',
            difficulty: 3
        },
        {
            type: 'theory',
            question: 'En el punto más alto de la trayectoria parabólica, la aceleración del proyectil es...',
            options: ['Cero', 'Igual a $g$, apuntando hacia abajo', 'Igual a $g$, apuntando hacia adelante', 'Variable'],
            correct: 1,
            explanation: 'La aceleración de un proyectil en vuelo (ideal) es siempre la aceleración de la gravedad, $g$, y siempre apunta verticalmente hacia abajo, incluso en el punto más alto.',
            difficulty: 1
        },
        {
            type: 'calculation',
            question: 'Se lanza una bola horizontalmente desde 80 m de altura con $v_x=10\\,m/s$. ¿Cuánto tiempo tarda en llegar al suelo? (usa $g \\approx 10\\,m/s^2$)',
            formula: '$t = \\sqrt{\\frac{2h}{|g|}}$',
            given: { h: '80 m', v_x: '10 m/s', g: '10 m/s²' },
            options: ['4 s', '8 s', '16 s', '2.8 s'],
            correct: 0,
            explanation: 'El tiempo de caída solo depende de la altura: $h = \\frac{1}{2}gt^2$. Despejando, $t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 80}{10}} = \\sqrt{16} = 4\\,s$.',
            difficulty: 3
        },
        {
            type: 'calculation',
            question: 'Un proyectil lanzado a 60° con $v_0=20\\,m/s$ sigue la ecuación de trayectoria $y(x) = (\\tan\\theta_0)x - \\frac{g}{2v_0^2\\cos^2\\theta_0}x^2$. ¿Cuál es la ecuación?',
            formula: '$y(x) = (\\tan\\theta_0)x - \\frac{g}{2v_0^2\\cos^2\\theta_0}x^2$',
            given: { v_0: '20 m/s', theta: '60°', g: '10 m/s²' },
            options: ['$y = 1.73x - 0.05x^2$', '$y = 0.87x - 0.025x^2$', '$y = 1.73x - 0.025x^2$', '$y = x - 0.05x^2$'],
            correct: 0,
            explanation: 'Sustituimos: $\\tan(60°)=\\sqrt{3}\\approx 1.73$. El término de $x^2$ es $\\frac{10}{2(20^2)(\\cos^2 60°)} = \\frac{10}{2(400)(0.5^2)} = \\frac{10}{800(0.25)} = \\frac{10}{200} = 0.05$. La ecuación es $y = 1.73x - 0.05x^2$.',
            difficulty: 3
        }
    ]

// ---------------------------------------------------------------------------------
// 📖 FIN DE LA BASE DE DATOS PRINCIPAL
// ---------------------------------------------------------------------------------
};


// 🌟 Exponer la base de datos al objeto 'window' global para que sea accesible desde otros scripts (como game.js)
window.questionDatabase = questionDatabase;

// 🚀 Mensaje de confirmación en la consola del navegador
console.log(`✅ Banco de preguntas cargado y mejorado. ${Object.keys(questionDatabase).length} temas disponibles con un total de 110 preguntas.`);