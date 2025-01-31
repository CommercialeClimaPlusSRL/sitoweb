/* filepath: /c:/Users/joshb/Desktop/SITO/script.js */
// Add map initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    const map = L.map('map', {
        center: [44.227407, 12.026658],
        zoom: 15,
        dragging: false,     // Disable dragging
        touchZoom: false,    // Disable touch zoom
        scrollWheelZoom: false, // Disable scroll wheel zoom
        doubleClickZoom: false, // Disable double click zoom
        boxZoom: false,      // Disable box zoom
        zoomControl: false   // Remove zoom control
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker
    L.marker([44.227407, 12.026658])
        .addTo(map)
        .bindPopup('<strong>Commerciale ClimaPlus s.r.l.</strong><br>Viale Bologna 26, 47122 Forlì')
        .openPopup();

    // Single observer for all animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                observer.unobserve(entry.target); // Smetti di osservare una volta animato
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    // Observe all sections and images at once
    document.querySelectorAll('.section, img[data-src]').forEach(el => observer.observe(el));

    // Add toast to body
    const toast = createToast();

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function createToast() {
        const toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
        return toast;
    }

    // Improved captcha - Move to top
    let correctAnswer;
    const captchaSpan1 = document.getElementById('num1');
    const captchaSpan2 = document.getElementById('num2');
    const captchaInput = document.getElementById('captcha');

    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 20) + 1; // Random number between 1-20
        const num2 = Math.floor(Math.random() * 20) + 1;
        if (captchaSpan1 && captchaSpan2) {
            captchaSpan1.textContent = num1;
            captchaSpan2.textContent = num2;
            correctAnswer = num1 + num2;
        }
        return correctAnswer;
    }

    // Generate initial captcha immediately
    generateCaptcha();

    // Regenerate captcha when input is focused
    captchaInput.addEventListener('focus', function() {
        if (!this.value) {
            generateCaptcha();
        }
    });
});
