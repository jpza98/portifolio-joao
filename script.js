function tryImageFormats() {
    const profileImage = document.getElementById('profileImage');
    const placeholder = document.getElementById('imagePlaceholder');
    
    if (!profileImage || !placeholder) return;
    
    const imageNames = ['jp', 'foto'];
    const formats = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];
    let currentName = 0;
    let currentFormat = 0;
    
    function tryNextFormat() {
        if (currentName < imageNames.length) {
            if (currentFormat < formats.length) {
                const name = imageNames[currentName];
                const format = formats[currentFormat];
                profileImage.src = `images/${name}.${format}`;
                currentFormat++;
            } else {
                currentFormat = 0;
                currentName++;
                tryNextFormat();
            }
        } else {
            profileImage.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    }
    
    profileImage.onerror = tryNextFormat;
    tryNextFormat();
}

document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.onerror = tryImageFormats;
        tryImageFormats();
    }
    
    loadClientLogos();
    
    document.querySelectorAll('img[data-client]').forEach(img => {
        img.addEventListener('load', () => {
            img.style.display = 'block';
            const parent = img.closest('.client-card');
            if (parent) {
                const fallback = parent.querySelector('.logo-fallback');
                if (fallback) {
                    fallback.style.display = 'none';
                }
            }
        });
        
        img.addEventListener('error', () => {
            handleLogoError(img);
        });
    });
});

window.handleLogoError = function(img) {
    const parent = img.closest('.client-card');
    if (parent) {
        const fallback = parent.querySelector('.logo-fallback');
        if (fallback) {
            img.style.display = 'none';
            fallback.style.display = 'flex';
        }
    }
};

function loadClientLogos() {
    const clientLogos = {
        'caixa': [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Caixa_Econ%C3%B4mica_Federal_logo.svg/512px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png',
            'https://logos-world.net/wp-content/uploads/2021/02/Caixa-Economica-Federal-Logo.png'
        ],
        'bradesco': [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Bradesco_logo.svg/512px-Bradesco_logo.svg.png',
            'https://logos-world.net/wp-content/uploads/2020/11/Bradesco-Logo.png'
        ],
        'santander': [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Santander_logo.svg/512px-Santander_logo.svg.png',
            'https://logos-world.net/wp-content/uploads/2020/11/Santander-Logo.png'
        ],
        'itau': [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ita%C3%BA_logo.svg/512px-Ita%C3%BA_logo.svg.png',
            'https://logos-world.net/wp-content/uploads/2020/11/Itau-Logo.png'
        ],
        'brb': [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BRB_Banco_de_Brasilia_logo.svg/512px-BRB_Banco_de_Brasilia_logo.svg.png'
        ],
        'correios': [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Correios_logo.svg/512px-Correios_logo.svg.png',
            'https://logos-world.net/wp-content/uploads/2021/03/Correios-Logo.png'
        ],
        'cnh': [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/CNH_Industrial_logo.svg/512px-CNH_Industrial_logo.svg.png'
        ]
    };
    
    Object.keys(clientLogos).forEach(client => {
        const img = document.querySelector(`img[data-client="${client}"]`);
        if (!img) return;
        
        setTimeout(() => {
            if (img.naturalHeight === 0 || !img.complete) {
                const urls = clientLogos[client];
                let currentUrlIndex = 1;
                
                function tryNextUrl() {
                    if (currentUrlIndex < urls.length) {
                        const testImg = new Image();
                        testImg.onload = () => {
                            img.src = urls[currentUrlIndex];
                            img.style.display = 'block';
                            const parent = img.closest('.client-card');
                            if (parent) {
                                const fallback = parent.querySelector('.logo-fallback');
                                if (fallback) {
                                    fallback.style.display = 'none';
                                }
                            }
                        };
                        testImg.onerror = () => {
                            currentUrlIndex++;
                            tryNextUrl();
                        };
                        testImg.src = urls[currentUrlIndex];
                    } else {
                        handleLogoError(img);
                    }
                }
                
                tryNextUrl();
            } else {
                const parent = img.closest('.client-card');
                if (parent) {
                    const fallback = parent.querySelector('.logo-fallback');
                    if (fallback) {
                        fallback.style.display = 'none';
                    }
                }
            }
        }, 2000);
    });
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navMenuMobile = document.getElementById('navMenuMobile');

if (hamburger && navMenuMobile) {
    hamburger.addEventListener('click', () => {
        navMenuMobile.classList.toggle('left-[-100%]');
        navMenuMobile.classList.toggle('left-0');
        hamburger.classList.toggle('active');
    });

    navMenuMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenuMobile.classList.add('left-[-100%]');
            navMenuMobile.classList.remove('left-0');
            hamburger.classList.remove('active');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
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

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

const USE_EMAILJS = true;
const USE_JAVA_BACKEND = false;

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'pjXUGVHu9yKxCO5z2',
    SERVICE_ID: 'service_4glv9y4',
    TEMPLATE_ID: 'template_qrqinzh'
};

const JAVA_BACKEND_URL = 'https://seu-backend.railway.app/api/contact';

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    const formData = {
        fromName: document.getElementById('name').value,
        fromEmail: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    if (USE_EMAILJS && typeof emailjs !== 'undefined') {
        const templateParams = {
            title: formData.subject,
            name: formData.fromName,
            email: formData.fromEmail,
            message: formData.message,
            time: new Date().toLocaleString('pt-BR')
        };
        
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY)
            .then(() => {
                showSuccess(submitButton, originalText, contactForm);
            })
            .catch((error) => {
                if (error.status !== 200) {
                    console.error('Erro ao enviar email:', error);
                    showError(submitButton, originalText);
                }
            });
    } else if (USE_JAVA_BACKEND) {
        fetch(JAVA_BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showSuccess(submitButton, originalText, contactForm);
        })
        .catch((error) => {
            console.error('Erro ao enviar email:', error);
            showError(submitButton, originalText);
        });
    } else {
        showError(submitButton, originalText);
    }
});

function showSuccess(button, originalText, form) {
    button.textContent = 'Mensagem Enviada!';
    button.style.background = '#10b981';
    form.reset();
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 3000);
}

function showError(button, originalText) {
    button.textContent = 'Erro ao enviar. Tente novamente.';
    button.style.background = '#ef4444';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 3000);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});


