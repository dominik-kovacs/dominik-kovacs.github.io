const startDate = new Date(2018, 10, 1);
const years = Math.floor((new Date() - startDate) / (365.25 * 24 * 60 * 60 * 1000));
document.getElementById('years-exp').textContent = years + '+';
document.getElementById('years-bio').textContent = years;

const header = document.querySelector('.general-header');
const motto = document.querySelector('.general-motto');
const headerText = header.textContent;
const mottoText = motto.textContent;
header.textContent = '';
motto.textContent = '';
motto.style.visibility = 'hidden';

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
    navItems[activeIndex].classList.remove('active');
    sections[activeIndex].classList.remove('active');
    activeIndex = index;
    navItems[activeIndex].classList.add('active');
    sections[activeIndex].classList.add('active');
}

navItems.forEach((item, i) => {
    item.addEventListener('click', () => activate(i));
});

const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

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
