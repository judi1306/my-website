// Основной JavaScript код
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });

    // CTA Button Handler
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Анимация кнопки
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Показать сообщение
            showNotification('Спасибо за интерес! Свяжемся с вами в ближайшее время.', 'success');
            
            // Прокрутка к форме контактов
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 1000);
        });
    }

    // Learn More Button
    const learnMoreBtn = document.getElementById('learnMore');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Простая валидация
            if (formData.name && formData.email && formData.message) {
                // Имитация отправки
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification(`Спасибо, ${formData.name}! Ваше сообщение отправлено. Мы ответим в течение 24 часов.`, 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showNotification('Пожалуйста, заполните все поля формы.', 'error');
            }
        });
    }

    // Scroll Animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.about-card, .service-card, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Добавляем стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(notification);
        
        // Закрытие по кнопке
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Автоматическое закрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Event Listeners for scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        handleScrollAnimations();
    });

    // Initial animations
    handleScrollAnimations();
    
    // Console greeting
    console.log('🚀 Добро пожаловать на наш сайт!');
    console.log('💡 Сайт создан с использованием современных веб-технологий');
});
