// Função para tentar diferentes formatos de imagem
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
            // Se nenhum formato funcionar, mostra o placeholder
            profileImage.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    }
    
    profileImage.onerror = tryNextFormat;
    tryNextFormat();
}

// Tentar carregar a imagem quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.onerror = tryImageFormats;
        // Tenta carregar a imagem
        tryImageFormats();
    }
    
    // Carregar logos dos clientes imediatamente
    loadClientLogos();
});

// Função global para tratar erro de logo (chamada pelo onerror do HTML)
window.handleLogoError = function(img) {
    // Procura o fallback no elemento pai (div)
    const parent = img.closest('.client-card');
    if (parent) {
        const fallback = parent.querySelector('.logo-fallback');
        if (fallback) {
            img.style.display = 'none';
            fallback.style.display = 'flex';
        }
    }
};

// Função para carregar logos com múltiplas URLs de fallback
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
    
    // Carregar cada logo tentando múltiplas URLs
    Object.keys(clientLogos).forEach(client => {
        const img = document.querySelector(`img[data-client="${client}"]`);
        if (!img) return;
        
        const urls = clientLogos[client];
        let currentUrlIndex = 0;
        
        function tryNextUrl() {
            if (currentUrlIndex < urls.length) {
                // Tenta carregar diretamente na imagem
                img.onload = () => {
                    img.style.display = 'block';
                    img.style.opacity = '0.8';
                    // Esconde o fallback quando a imagem carregar
                    const parent = img.closest('.client-card');
                    if (parent) {
                        const fallback = parent.querySelector('.logo-fallback');
                        if (fallback) {
                            fallback.style.display = 'none';
                        }
                    }
                };
                img.onerror = () => {
                    currentUrlIndex++;
                    if (currentUrlIndex < urls.length) {
                        img.src = urls[currentUrlIndex];
                    } else {
                        // Se nenhuma URL funcionar, mantém o fallback de texto
                        img.style.display = 'none';
                        const parent = img.closest('.client-card');
                        if (parent) {
                            const fallback = parent.querySelector('.logo-fallback');
                            if (fallback) {
                                fallback.style.display = 'flex';
                            }
                        }
                    }
                };
                img.src = urls[currentUrlIndex];
            }
        }
        
        // Inicia imediatamente
        tryNextUrl();
    });
}

// Menu Mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navMenuMobile = document.getElementById('navMenuMobile');

if (hamburger && navMenuMobile) {
    hamburger.addEventListener('click', () => {
        navMenuMobile.classList.toggle('left-[-100%]');
        navMenuMobile.classList.toggle('left-0');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navMenuMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenuMobile.classList.add('left-[-100%]');
            navMenuMobile.classList.remove('left-0');
            hamburger.classList.remove('active');
        });
    });
}

// Scroll suave para seções
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

// Navbar com efeito de scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animação de entrada para elementos
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

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch para enviar para um servidor
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Exemplo de feedback visual
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular envio (substitua por sua lógica real)
    setTimeout(() => {
        submitButton.textContent = 'Mensagem Enviada!';
        submitButton.style.background = '#10b981';
        
        // Resetar formulário
        contactForm.reset();
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 3000);
    }, 1500);
    
    console.log('Dados do formulário:', formData);
});

// Adicionar efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Atualizar link ativo na navegação
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
