// ================================================
// CONFIGURACIÓN DE MATHJAX PARA ECUACIONES LATEX
// Archivo: mathjax-config.js
// ================================================

window.MathJax = {
  tex: {
    // Delimitadores para ecuaciones en línea
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    
    // Delimitadores para ecuaciones centradas
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    
    // Procesar caracteres de escape
    processEscapes: true,
    
    // Procesar entornos matemáticos
    processEnvironments: true
  },
  
  // Configuraciones adicionales
  options: {
    // Etiquetas HTML que MathJax debe ignorar
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
  },
  
  // Configuración de inicio
  startup: {
    ready: () => {
      console.log('✅ MathJax configurado correctamente para LaTeX');
      MathJax.startup.defaultReady();
    }
  }
};