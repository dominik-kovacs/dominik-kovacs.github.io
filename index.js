const boot = document.getElementById('boot');
const bootLines = boot.querySelectorAll('.boot-line');
const frame = document.querySelector('.frame');

let bootDelay = 0;
bootLines.forEach((line, i) => {
    bootDelay += 400 + Math.random() * 300;
    setTimeout(() => line.classList.add('visible'), bootDelay);
});

setTimeout(() => {
    boot.classList.add('fade-out');
    frame.style.opacity = '1';
    frame.style.transition = 'opacity 0.4s';
    setTimeout(() => boot.remove(), 400);
    initApp();
}, bootDelay + 600);

function initApp() {
    const startDate = new Date(2018, 10, 1);
    const years = Math.floor((new Date() - startDate) / (365.25 * 24 * 60 * 60 * 1000));
    document.getElementById('years-exp').textContent = years + '+';
    document.getElementById('years-bio').textContent = years;

    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour >= 5 && hour < 12) greeting = 'Good morning';
    else if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
    document.getElementById('greeting').textContent = greeting;

    const header = document.querySelector('.general-header');
    const motto = document.querySelector('.general-motto');
    const headerText = header.textContent;
    const mottoText = motto.textContent;
    header.textContent = '';
    motto.textContent = '';
    motto.style.visibility = 'hidden';

    typeText(header, headerText, 60).then(() => {
        motto.style.visibility = 'visible';
        return typeText(motto, mottoText, 30);
    });

    const themes = ['default', 'green', 'blue'];
    let themeIndex = 0;
    const saved = localStorage.getItem('theme');
    if (saved) {
        themeIndex = themes.indexOf(saved);
        if (themeIndex > 0) document.documentElement.setAttribute('data-theme', saved);
    }
    document.getElementById('theme-toggle').addEventListener('click', () => {
        themeIndex = (themeIndex + 1) % themes.length;
        const theme = themes[themeIndex];
        if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        localStorage.setItem('theme', theme);
    });

    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    let activeIndex = 0;

    function activate(index) {
        const direction = index > activeIndex ? 'slide-right' : 'slide-left';
        sections[activeIndex].classList.remove('active');
        navItems[activeIndex].classList.remove('active');
        activeIndex = index;
        const next = sections[activeIndex];
        next.classList.remove('slide-left', 'slide-right');
        next.classList.add(direction);
        next.classList.add('active');
        navItems[activeIndex].classList.add('active');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                next.classList.remove('slide-left', 'slide-right');
            });
        });

        if (next.id === 'skills') animateSkillBars();
        if (next.id === 'experience') animateJobs();
        if (next.id === 'visitor') populateVisitor();
    }

    navItems.forEach((item, i) => {
        item.addEventListener('click', () => activate(i));
    });

    function animateSkillBars() {
        const fills = sections[activeIndex].querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
            const target = fill.style.width;
            fill.style.width = '0';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { fill.style.width = target; });
            });
        });
    }

    function animateJobs() {
        const jobs = document.querySelectorAll('.job');
        jobs.forEach(job => job.classList.remove('visible'));
        jobs.forEach((job, i) => {
            setTimeout(() => job.classList.add('visible'), i * 150);
        });
    }

    let visitorPopulated = false;
    function populateVisitor() {
        if (visitorPopulated) return;
        visitorPopulated = true;
        const grid = document.getElementById('visitor-info');
        const data = [];

        const ua = navigator.userAgent;
        let browser = 'Unknown';
        if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Edg')) browser = 'Edge';
        else if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Safari')) browser = 'Safari';
        data.push(['Browser', browser]);

        let os = 'Unknown';
        if (ua.includes('Windows')) os = 'Windows';
        else if (ua.includes('Mac OS')) os = 'macOS';
        else if (ua.includes('Linux')) os = 'Linux';
        else if (ua.includes('Android')) os = 'Android';
        else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
        data.push(['Operating System', os]);

        data.push(['Screen Resolution', `${screen.width} × ${screen.height}`]);
        data.push(['Viewport', `${window.innerWidth} × ${window.innerHeight}`]);
        data.push(['Color Depth', `${screen.colorDepth}-bit`]);
        data.push(['Device Pixel Ratio', `${devicePixelRatio}x`]);
        data.push(['Language', navigator.language]);
        data.push(['Timezone', Intl.DateTimeFormat().resolvedOptions().timeZone]);
        data.push(['Local Time', new Date().toLocaleString()]);
        data.push(['CPU Cores', navigator.hardwareConcurrency || '?']);
        data.push(['RAM', navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Hidden']);
        data.push(['Online', navigator.onLine ? 'Yes' : 'No']);
        data.push(['Touch Device', navigator.maxTouchPoints > 0 ? 'Yes' : 'No']);
        data.push(['Connection', navigator.connection ? navigator.connection.effectiveType.toUpperCase() : 'Unknown']);
        data.push(['Platform', navigator.platform]);
        data.push(['Cookies Enabled', navigator.cookieEnabled ? 'Yes' : 'No']);

        let i = 0;
        const interval = setInterval(() => {
            if (i >= data.length) { clearInterval(interval); return; }
            const [label, value] = data[i];
            const row = document.createElement('div');
            row.className = 'visitor-row';
            row.innerHTML = `<div class="visitor-label">${label}</div><div class="visitor-value">${value}</div>`;
            row.style.opacity = '0';
            row.style.transform = 'translateY(10px)';
            grid.appendChild(row);
            requestAnimationFrame(() => {
                row.style.transition = 'opacity 0.3s, transform 0.3s';
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            });
            i++;
        }, 80);
    }

    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                konamiIndex = 0;
                startMatrix();
                return;
            }
        } else {
            konamiIndex = 0;
        }

        if (e.key === 'ArrowRight' || e.key === 'Tab') {
            e.preventDefault();
            activate((activeIndex + 1) % navItems.length);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            activate((activeIndex - 1 + navItems.length) % navItems.length);
        }
    });

    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    document.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) activate((activeIndex + 1) % navItems.length);
            else activate((activeIndex - 1 + navItems.length) % navItems.length);
        }
    });

    const clock = document.getElementById('clock');
    function updateClock() {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    updateClock();
    setInterval(updateClock, 1000);
}

function typeText(el, text, speed) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

function startMatrix() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 33);

    canvas.addEventListener('click', () => {
        clearInterval(interval);
        canvas.remove();
    });
}
