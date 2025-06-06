
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    
    
    const playAudio = () => {
        audio.play().catch(e => {
            console.log('Audio autoplay bloqueado por el navegador');
            
            document.addEventListener('click', () => {
                audio.play().catch(err => console.log('Error al reproducir audio:', err));
            }, { once: true });
        });
    };
    
    
    if (audio.readyState >= 3) {
        playAudio();
    } else {
        audio.addEventListener('canplaythrough', playAudio, { once: true });
    }
    
    
    audio.volume = 0.9; 
});


const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


const animatedElements = document.querySelectorAll('.timeline-item, .experience-item, .characteristic-item, .skill-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500); 
}


const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    typeWriter(heroTagline, originalText, 50);
}


const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
       
        if (!name || !email || !subject || !message) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
       
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        
        const phoneNumber = '524821081936'; 
        const whatsappMessage = `Hola Víctor, me llamo ${name}.

Asunto: ${subject}

Mensaje: ${message}

Mi email de contacto: ${email}`;
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        setTimeout(() => {
            
            window.open(whatsappUrl, '_blank');
            
            
            showMessage('¡Mensaje enviado! Se abrirá WhatsApp para completar el envío.', 'success');
            
            
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function showMessage(text, type) {
    
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
        animation: slideIn 0.3s ease;
    `;
    
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}


const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});


function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}


window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


const createObserver = (className, animationType = 'fadeInUp') => {
    const elements = document.querySelectorAll(className);
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
};


createObserver('.section-title');
createObserver('.timeline-content');
createObserver('.experience-item');
createObserver('.characteristic-item');


let konamiCode = [];
const sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > sequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === sequence.join(',')) {
        
        document.body.style.background = 'linear-gradient(45deg, #2c5530, #4a8552)';
        showMessage('¡Modo desarrollador activado! 🚀', 'success');
        konamiCode = [];
        
        
        setTimeout(() => {
            document.body.style.background = '';
        }, 3000);
    }
});

console.log('🚀 Portafolio de Víctor Rubio Francisco - Desarrollado con ❤️');
console.log('💡 Tip: Prueba el código Konami para una sorpresa!');