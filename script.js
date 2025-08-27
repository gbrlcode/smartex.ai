// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor, digite um endereço de email válido.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Enviando mensagem...', 'info');
        
        setTimeout(() => {
            showNotification('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.', 'success');
            this.reset();
        }, 2000);
    });
}

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Por favor, digite seu endereço de email.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, digite um endereço de email válido.', 'error');
            return;
        }
        
        showNotification('Inscrevendo na newsletter...', 'info');
        
        setTimeout(() => {
            showNotification('Inscrito com sucesso na nossa newsletter!', 'success');
            this.reset();
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// AI Chatbot Demo
let chatbotOpen = false;
const chatbotDemo = document.getElementById('chatbotDemo');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');

// Chatbot responses
const chatbotResponses = {
    greetings: [
        "Olá! Sou o assistente IA da SmartEx. Como posso ajudá-lo hoje?",
        "Oi! Bem-vindo à SmartEx. Com que posso ajudá-lo?",
        "Saudações! Estou aqui para ajudá-lo a conhecer nossas soluções de IA."
    ],
    services: [
        "Oferecemos quatro serviços principais: Automação de Negócios, ChatBots de IA, Marketing Otimizado por IA e Desenvolvimento de Sites Profissionais. Qual mais lhe interessa?",
        "Nossos serviços principais incluem automação de processos, chatbots inteligentes, campanhas de marketing baseadas em dados e desenvolvimento web personalizado. Sobre qual gostaria de saber mais?",
        "Especializamo-nos em soluções empresariais impulsionadas por IA e desenvolvimento web profissional. Posso falar sobre nossos serviços de automação, chatbot, marketing ou desenvolvimento de sites."
    ],
    automation: [
        "Nosso serviço de Automação de Negócios pode reduzir tarefas manuais em até 80% e otimizar todo seu fluxo de trabalho. Gostaria de agendar uma consultoria?",
        "Ajudamos empresas a otimizar operações através de automação inteligente. Isso inclui otimização de processos, automação de fluxo de trabalho e análise de performance.",
        "A automação de negócios é perfeita para empresas que buscam escalar eficientemente. Podemos automatizar tarefas repetitivas e melhorar a produtividade em toda sua organização."
    ],
    chatbot: [
        "Nossos ChatBots de IA fornecem suporte ao cliente 24/7, qualificação de leads e podem lidar com consultas complexas. São perfeitos para melhorar a experiência do cliente.",
        "Construímos chatbots inteligentes que podem integrar com sua plataforma e-commerce, lidar com consultas de clientes e até qualificar leads automaticamente.",
        "Nossos chatbots usam IA avançada para entender a intenção do cliente e fornecer respostas personalizadas. Também podem trabalhar em múltiplos idiomas!"
    ],
    marketing: [
        "Nossas campanhas de Marketing Otimizado por IA usam machine learning para melhorar continuamente o desempenho e maximizar seu ROI.",
        "Usamos algoritmos de IA para otimizar campanhas publicitárias, direcionar o público certo e acompanhar resultados em tempo real. Isso geralmente resulta em 200%+ de melhoria nas conversões.",
        "Nossas soluções de marketing incluem otimização de campanhas, segmentação de audiência, acompanhamento de ROI e testes A/B - tudo impulsionado por IA."
    ],
    website: [
        "Nosso serviço de Desenvolvimento de Sites Profissionais cria sites impressionantes e de alta conversão com recursos impulsionados por IA e otimização SEO.",
        "Construímos sites personalizados que combinam design moderno com chatbots de IA, sistemas de captura de leads e layouts responsivos mobile-first.",
        "Nosso desenvolvimento web inclui design personalizado, integração de IA, otimização SEO e experiências de usuário focadas em conversão que geram resultados."
    ],
    pricing: [
        "Nossos preços variam de acordo com suas necessidades específicas e escopo do projeto. Gostaria de agendar uma consultoria gratuita para discutir seus requisitos?",
        "Oferecemos soluções personalizadas, então o preço depende da complexidade e escala do seu projeto. Deixe-me conectá-lo com nossa equipe para um orçamento detalhado.",
        "Fornecemos opções de preços flexíveis para diferentes tamanhos de empresas. A melhor maneira de obter preços precisos é através de uma chamada de consultoria."
    ],
    contact: [
        "Você pode nos contatar em hello@smartex.ai ou nos ligar em +1 (555) 123-4567. Adoraríamos discutir seu projeto!",
        "Sinta-se à vontade para preencher nosso formulário de contato nesta página, ou nos enviar um email diretamente em hello@smartex.ai. Geralmente respondemos em 24 horas.",
        "A melhor maneira de começar é através de nosso formulário de contato ou nos ligando. Oferecemos consultorias gratuitas para entender suas necessidades."
    ],
    default: [
        "Não tenho certeza se entendi isso. Poderia reformular ou perguntar sobre nossos serviços, preços ou como nos contatar?",
        "Estou aqui para ajudar com informações sobre os serviços da SmartEx. Você pode perguntar sobre nossas soluções de IA, preços ou como entrar em contato.",
        "Deixe-me ajudá-lo a conhecer a SmartEx. Você pode perguntar sobre nossos serviços, solicitar preços ou descobrir como nos contatar."
    ]
};

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
        chatbotDemo.style.display = 'flex';
        setTimeout(() => {
            chatbotDemo.style.opacity = '1';
            chatbotDemo.style.transform = 'translateY(0)';
        }, 10);
    } else {
        chatbotDemo.style.opacity = '0';
        chatbotDemo.style.transform = 'translateY(20px)';
        setTimeout(() => {
            chatbotDemo.style.display = 'none';
        }, 300);
    }
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse('greetings');
    } else if (message.includes('service') || message.includes('what do you do')) {
        return getRandomResponse('services');
    } else if (message.includes('automation') || message.includes('automate')) {
        return getRandomResponse('automation');
    } else if (message.includes('chatbot') || message.includes('bot')) {
        return getRandomResponse('chatbot');
    } else if (message.includes('marketing') || message.includes('advertising')) {
        return getRandomResponse('marketing');
    } else if (message.includes('website') || message.includes('web') || message.includes('development')) {
        return getRandomResponse('website');
    } else if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
        return getRandomResponse('pricing');
    } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
        return getRandomResponse('contact');
    } else {
        return getRandomResponse('default');
    }
}

function getRandomResponse(category) {
    const responses = chatbotResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
    }, 1000);
}

// Enter key to send message
if (chatbotInput) {
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat');
    animateElements.forEach(el => observer.observe(el));
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Form validation enhancement
function enhanceFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório.';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, digite um endereço de email válido.';
        }
    }
    
    // Apply validation result
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
        field.parentNode.appendChild(errorDiv);
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', enhanceFormValidation);

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ef4444;
    }
    
    .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add smooth reveal animation for sections
function addRevealAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', addRevealAnimations);

// Calendar Booking System
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// Initialize calendar
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarDates = document.getElementById('calendarDates');
    calendarDates.innerHTML = '';
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const date = daysInPrevMonth - i;
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date other-month';
        dateElement.textContent = date;
        calendarDates.appendChild(dateElement);
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date available';
        dateElement.textContent = day;
        
        // Check if date is in the past
        const checkDate = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkDate < today) {
            dateElement.className = 'calendar-date unavailable';
        } else {
            dateElement.addEventListener('click', () => selectDate(day));
        }
        
        calendarDates.appendChild(dateElement);
    }
    
    // Next month days to fill the grid
    const totalCells = 42; // 6 rows * 7 days
    const remainingCells = totalCells - (firstDay + daysInMonth);
    
    for (let day = 1; day <= remainingCells; day++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date other-month';
        dateElement.textContent = day;
        calendarDates.appendChild(dateElement);
    }
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    hideTimeSlots();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    hideTimeSlots();
}

function selectDate(day) {
    // Remove previous selection
    document.querySelectorAll('.calendar-date.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selection to clicked date
    const dateElements = document.querySelectorAll('.calendar-date.available');
    dateElements[day - 1].classList.add('selected');
    
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    showTimeSlots();
}

function showTimeSlots() {
    document.getElementById('timeSlots').style.display = 'block';
    // Reset time selection
    selectedTime = null;
    document.querySelectorAll('.time-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
}

function hideTimeSlots() {
    document.getElementById('timeSlots').style.display = 'none';
    selectedDate = null;
    selectedTime = null;
}

function selectTime(time) {
    // Remove previous selection
    document.querySelectorAll('.time-slot.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selection to clicked time
    event.target.classList.add('selected');
    selectedTime = time;
}

function bookConsultation() {
    if (!selectedDate || !selectedTime) {
        showNotification('Por favor, selecione uma data e horário para sua consultoria.', 'error');
        return;
    }
    
    const dateStr = selectedDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const timeStr = selectedTime;
    
    showNotification(`Agendando consultoria para ${dateStr} às ${timeStr}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Agendado com sucesso! Enviaremos um convite de calendário para ${dateStr} às ${timeStr}.`, 'success');
        
        // Reset selections
        hideTimeSlots();
        document.querySelectorAll('.calendar-date.selected').forEach(el => {
            el.classList.remove('selected');
        });
    }, 2000);
}
