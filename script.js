const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- fotos de perfil alternando no hero ----------
(function avatarSlideshow() {
    const avatar = document.getElementById('avatar');
    const dotsEl = document.getElementById('avatarDots');
    const placeholder = document.getElementById('imagePlaceholder');
    if (!avatar) return;

    const slides = [...avatar.querySelectorAll('.avatar-slide')];
    const INTERVAL = 4500;
    let current = 0;
    let timer;

    const dots = slides.map((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Foto ${i + 1}`);
        dot.addEventListener('click', () => { show(i); restart(); });
        dotsEl.appendChild(dot);
        return dot;
    });

    const usable = () => slides.filter(s => !s.classList.contains('broken'));

    function show(i) {
        if (slides[i].classList.contains('broken')) return;
        current = i;
        slides.forEach((s, k) => s.classList.toggle('active', k === i));
        dots.forEach((d, k) => d.classList.toggle('active', k === i));
        if (!prefersReducedMotion) {
            avatar.classList.remove('scan');
            void avatar.offsetWidth; // reinicia a animação
            avatar.classList.add('scan');
        }
    }

    function next() {
        for (let step = 1; step <= slides.length; step++) {
            const i = (current + step) % slides.length;
            if (!slides[i].classList.contains('broken')) { show(i); return; }
        }
    }

    function restart() {
        clearInterval(timer);
        if (!prefersReducedMotion && usable().length > 1) timer = setInterval(next, INTERVAL);
    }

    function markBroken(slide) {
        const i = slides.indexOf(slide);
        slide.classList.add('broken');
        dots[i].style.display = 'none';
        if (!usable().length) {
            placeholder.style.display = 'block';
            dotsEl.style.display = 'none';
            clearInterval(timer);
        } else if (i === current) {
            next();
        }
        if (usable().length < 2) dotsEl.style.display = 'none';
    }

    slides.forEach(slide => {
        if (slide.complete && slide.naturalWidth === 0) markBroken(slide);
        else slide.addEventListener('error', () => markBroken(slide));
    });

    // pausa com a aba em segundo plano
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearInterval(timer); else restart();
    });

    show(usable().length ? slides.indexOf(usable()[0]) : 0);
    avatar.classList.remove('scan');
    restart();
})();

// ---------- navbar, progresso e link ativo ----------
const navbar = document.getElementById('navbar');
const progress = document.getElementById('progress');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(y / max) * 100}%` : '0';

    let current = '';
    sections.forEach(section => {
        if (y >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- menu mobile ----------
const hamburger = document.getElementById('hamburger');
const navMenuMobile = document.getElementById('navMenuMobile');

if (hamburger && navMenuMobile) {
    hamburger.addEventListener('click', () => {
        navMenuMobile.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenuMobile.classList.contains('open') ? 'hidden' : '';
    });
    navMenuMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenuMobile.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ---------- scroll suave com offset da navbar ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        // cards da timeline ficam um pouco mais abaixo da navbar
        const offset = target.classList.contains('tl-item') ? 110 : 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

        if (target.classList.contains('tl-item')) {
            target.classList.remove('flash');
            setTimeout(() => target.classList.add('flash'), prefersReducedMotion ? 0 : 600);
            setTimeout(() => target.classList.remove('flash'), prefersReducedMotion ? 1600 : 2200);
        }
    });
});

// ---------- brilho que segue o cursor ----------
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', e => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }, { passive: true });
}

// borda iluminada nos cards
document.querySelectorAll('.card.glow').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
});

// ---------- efeito de digitação no hero ----------
const roles = [
    'Sênior Full Stack Software Engineer',
    'PHP · módulos e APIs do SEI',
    'Java 17 + Spring Boot',
    'React · Next.js · TypeScript',
    'Angular 17 · Micro Front-end',
    'Microsserviços & APIs REST',
    'IA & RAG no SEI @ TRF2'
];
const typedEl = document.getElementById('typed');

function runTyped() {
    if (!typedEl) return;
    if (prefersReducedMotion) { typedEl.textContent = roles[0]; return; }
    let r = 0, c = 0, deleting = false;
    (function tick() {
        const word = roles[r];
        typedEl.textContent = word.slice(0, c);
        let delay = deleting ? 35 : 70;
        if (!deleting && c === word.length) { deleting = true; delay = 1800; }
        else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
        c += deleting ? -1 : 1;
        setTimeout(tick, delay);
    })();
}
runTyped();

// ---------- terminal "cat perfil.json" ----------
const terminalLines = [
    ['<span class="p">joao@dev</span>:<span class="n">~</span>$ ', 'cat perfil.json', true],
    ['{', ''],
    ['  <span class="k">"nome"</span>: <span class="s">"João Pedro Zimiani Ancioto"</span>,', ''],
    ['  <span class="k">"cargo"</span>: <span class="s">"Sênior Full Stack Software Engineer"</span>,', ''],
    ['  <span class="k">"linguagem_principal"</span>: <span class="s">"PHP"</span>,', ''],
    ['  <span class="k">"empresa"</span>: <span class="s">"Basis Tecnologia"</span>,', ''],
    ['  <span class="k">"cliente"</span>: <span class="s">"TRF2 — Tribunal Regional Federal da 2ª Região"</span>,', ''],
    ['  <span class="k">"projetos"</span>: [<span class="s">"MODJUS"</span>, <span class="s">"SEI REST API"</span>, <span class="s">"SEI Criar"</span>, <span class="s">"SEI Monitora"</span>, <span class="s">"Apoia (PDPJ)"</span>],', ''],
    ['  <span class="k">"backend"</span>: [<span class="s">"PHP"</span>, <span class="s">"Java 17"</span>, <span class="s">"Spring Boot"</span>, <span class="s">"Node.js"</span>],', ''],
    ['  <span class="k">"frontend"</span>: [<span class="s">"React"</span>, <span class="s">"Next.js"</span>, <span class="s">"Angular 17"</span>],', ''],
    ['  <span class="k">"experiencia_anos"</span>: <span class="n">4</span>,', ''],
    ['  <span class="k">"cafe_por_dia"</span>: <span class="n">Infinity</span>', ''],
    ['}', ''],
    ['<span class="p">joao@dev</span>:<span class="n">~</span>$ ', '', true]
];

function runTerminal() {
    const term = document.getElementById('terminal');
    if (!term) return;
    const cursor = '<span class="cur"></span>';

    if (prefersReducedMotion) {
        term.innerHTML = terminalLines.map(([html, typed]) => html + typed).join('\n') + cursor;
        return;
    }

    let done = '';
    let line = 0;
    function nextLine() {
        if (line >= terminalLines.length) { term.innerHTML = done + cursor; return; }
        const [html, typed, isCommand] = terminalLines[line];
        if (isCommand && typed) {
            let i = 0;
            (function type() {
                term.innerHTML = done + html + typed.slice(0, i) + cursor;
                if (i++ < typed.length) setTimeout(type, 55);
                else { done += html + typed + '\n'; line++; setTimeout(nextLine, 350); }
            })();
        } else {
            done += html + typed + (line < terminalLines.length - 1 ? '\n' : '');
            term.innerHTML = done + cursor;
            line++;
            setTimeout(nextLine, 70);
        }
    }
    nextLine();
}

// ---------- contadores ----------
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    if (prefersReducedMotion) { el.textContent = target; return; }
    const start = performance.now();
    const duration = 1400;
    (function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(frame);
    })(start);
}

// ---------- revelar ao rolar ----------
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('in');
        el.querySelectorAll('[data-count]').forEach(animateCount);
        if (el.classList.contains('terminal') && el.querySelector('#terminal')) runTerminal();
        revealObserver.unobserve(el);
        // devolve as transições normais (hover) depois da entrada
        setTimeout(() => {
            el.classList.remove('reveal', 'in');
            el.style.transitionDelay = '';
        }, 1200);
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    revealObserver.observe(el);
});

// ---------- filtro de habilidades ----------
const skillTabs = document.querySelectorAll('.skill-tab');
const skills = document.querySelectorAll('.skill');
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        skills.forEach(skill => {
            skill.classList.toggle('hide', filter !== 'all' && skill.dataset.cat !== filter);
        });
    });
});

// ---------- letreiro de clientes (duplica para loop infinito) ----------
const clientTrack = document.getElementById('clientTrack');
if (clientTrack) {
    clientTrack.innerHTML += clientTrack.innerHTML;
    clientTrack.querySelectorAll('.client').forEach((c, i, all) => {
        if (i >= all.length / 2) c.setAttribute('aria-hidden', 'true');
    });
}

// ---------- rede de partículas no hero ----------
(function particles() {
    const canvas = document.getElementById('particles');
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    const hero = document.getElementById('home');
    let w, h, points = [], running = true;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        w = hero.offsetWidth;
        h = hero.offsetHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(Math.floor((w * h) / 14000), 110);
        points = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.6
        }));
    }

    function draw() {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);
        const maxDist = 130;
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
            const md = Math.hypot(mdx, mdy);
            if (md < 140) { p.x += mdx / md * 0.8; p.y += mdy / md * 0.8; }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
            ctx.fill();

            for (let j = i + 1; j < points.length; j++) {
                const q = points[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < maxDist) {
                    ctx.strokeStyle = `rgba(239, 68, 68, ${0.18 * (1 - d / maxDist)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    hero.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });

    // pausa quando o hero sai da tela
    new IntersectionObserver(([entry]) => {
        const wasRunning = running;
        running = entry.isIntersecting;
        if (running && !wasRunning) draw();
    }).observe(hero);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    resize();
    draw();
})();

// ---------- ano no rodapé ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- formulário de contato ----------
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

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const label = submitButton.querySelector('.btn-label');
        const originalText = label.textContent;

        label.textContent = 'enviando...';
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
                .then(() => showSuccess(submitButton, label, originalText, contactForm))
                .catch((error) => {
                    console.error('Erro ao enviar email:', error);
                    showError(submitButton, label, originalText);
                });
        } else if (USE_JAVA_BACKEND) {
            fetch(JAVA_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(() => showSuccess(submitButton, label, originalText, contactForm))
                .catch((error) => {
                    console.error('Erro ao enviar email:', error);
                    showError(submitButton, label, originalText);
                });
        } else {
            showError(submitButton, label, originalText);
        }
    });
}

function showSuccess(button, label, originalText, form) {
    label.textContent = '✓ mensagem enviada!';
    button.style.background = '#16a34a';
    form.reset();
    setTimeout(() => {
        label.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 3000);
}

function showError(button, label, originalText) {
    label.textContent = '✗ erro ao enviar — tente novamente';
    button.style.background = '#991b1b';
    setTimeout(() => {
        label.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 3000);
}
