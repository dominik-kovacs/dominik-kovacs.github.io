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
    let tabSwitches = 0;
    let defuseActive = false;

    function activate(index) {
        tabSwitches++;
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
        if (next.id === 'defuse') initDefuse();
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

        const intro = document.getElementById('visitor-intro');
        const leftCol = document.getElementById('visitor-facts-left');
        const rightCol = document.getElementById('visitor-facts-right');
        const outro = document.getElementById('visitor-outro');

        intro.textContent = "Enough about me. Let's talk about you.";

        const ua = navigator.userAgent;
        let browser = 'an unknown browser';
        if (ua.includes('Firefox')) browser = 'Firefox ' + (ua.match(/Firefox\/(\d+)/) || [])[1];
        else if (ua.includes('Edg/')) browser = 'Edge ' + (ua.match(/Edg\/(\d+)/) || [])[1];
        else if (ua.includes('Chrome')) browser = 'Chrome ' + (ua.match(/Chrome\/(\d+)/) || [])[1];
        else if (ua.includes('Safari')) browser = 'Safari ' + (ua.match(/Version\/(\d+)/) || [])[1];

        let os = 'an unknown system';
        if (ua.includes('Windows NT 10')) os = 'Windows';
        else if (ua.includes('Windows')) os = 'Windows';
        else if (ua.includes('Mac OS X')) os = 'macOS';
        else if (ua.includes('Android')) os = 'Android';
        else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
        else if (ua.includes('Linux')) os = 'Linux';

        const gpu = getWebGLRenderer();
        const conn = navigator.connection;
        const touch = navigator.maxTouchPoints > 0;
        const arrived = new Date().toLocaleTimeString();
        const fonts = detectFonts();

        let langs;
        try {
            langs = [...new Set((navigator.languages || [navigator.language]).map(l => {
                try { return new Intl.DisplayNames(['en'], { type: 'language' }).of(l.split('-')[0]); }
                catch (e) { return l; }
            }))].join(" and ");
        } catch (e) { langs = navigator.language; }

        const left = [
            { text: "CONNECTION", style: 'section' },
            { text: "The moment you opened this page, your", style: 'dim' },
            { text: "browser started talking.", style: 'dim' },
            { text: "arrived: " + arrived, style: 'highlight' },
            { text: "status: online", style: 'dim' },
            { type: 'separator' },
            { text: "DEVICE", style: 'section' },
            { text: "Every site you visit knows exactly what", style: 'dim' },
            { text: "you are using to look at it.", style: 'dim' },
            { text: "browser: " + browser, style: 'highlight' },
            { text: "os: " + os, style: 'highlight' },
            { text: "screen: " + screen.width + "×" + screen.height + " @ " + devicePixelRatio + "x", style: 'accent' },
            { text: "input: " + (touch ? "touchscreen (" + navigator.maxTouchPoints + " pts)" : "mouse"), style: 'dim' },
            { type: 'separator' },
            { text: "HARDWARE", style: 'section' },
            { text: "Your machine whispers its specs to every", style: 'dim' },
            { text: "page it renders. This is what I heard.", style: 'dim' },
            { text: "cpu: " + (navigator.hardwareConcurrency || "?") + " cores", style: 'highlight' },
            { text: "ram: " + (navigator.deviceMemory ? "~" + navigator.deviceMemory + " GB" : "hidden"), style: 'highlight' },
            { text: "gpu: " + gpu, style: 'accent' },
            { text: "color: " + screen.colorDepth + "-bit", style: 'dim' },
            { text: "network: " + (conn ? conn.effectiveType.toUpperCase() + " ~" + conn.downlink + " Mbps" : "hidden"), style: 'accent' },
        ];

        const right = [
            { text: "LANGUAGE", style: 'section' },
            { text: "You configured your browser to prefer", style: 'dim' },
            { text: "these languages. Sites use this to decide", style: 'dim' },
            { text: "what content to show you.", style: 'dim' },
            { text: langs, style: 'highlight' },
            { type: 'separator' },
            { text: "FINGERPRINT", style: 'section' },
            { text: "Your installed fonts create a unique", style: 'dim' },
            { text: "signature. Combined with the rest, this", style: 'dim' },
            { text: "can identify you without cookies.", style: 'dim' },
            { text: fonts.join(", "), style: 'highlight' },
            { type: 'separator' },
            { text: "PRIVACY", style: 'section' },
            { text: "These are the boundaries you set.", style: 'dim' },
            { text: "Most sites quietly ignore them.", style: 'dim' },
            { text: "do not track: " + (navigator.doNotTrack === '1' ? "on" : "off"), style: 'highlight' },
            { text: "cookies: " + (navigator.cookieEnabled ? "enabled" : "disabled"), style: 'highlight' },
            { text: "pdf viewer: " + (navigator.pdfViewerEnabled ? "yes" : "no"), style: 'dim' },
        ];

        fetch("https://api.ipify.org?format=json").then(r => r.json()).then(ipData => {
            return fetch("https://ipapi.co/" + ipData.ip + "/json/").then(r => r.json());
        }).then(geo => {
            left.splice(3, 0,
                { text: "location: " + geo.city + ", " + geo.country_name, style: 'accent' },
                { text: "isp: " + geo.org, style: 'dim' },
                { text: "ip: " + geo.ip, style: 'dim' }
            );
            revealBoth();
        }).catch(() => revealBoth());

        const batteryEl = document.getElementById('visitor-battery');
        let doneCount = 0;

        function revealBoth() {
            revealLines(left, leftCol);
            revealLines(right, rightCol);
        }

        function onColumnDone() {
            doneCount++;
            if (doneCount < 2) return;
            if (navigator.getBattery) {
                navigator.getBattery().then(bat => {
                    const pct = Math.round(bat.level * 100);
                    let msg = "battery " + pct + "%";
                    if (bat.charging) msg += " charging";
                    else if (pct <= 10) msg = "battery " + pct + "% — plug in now";
                    else if (pct <= 30) msg = "battery " + pct + "% — find a charger";
                    batteryEl.textContent = msg;
                    requestAnimationFrame(() => batteryEl.classList.add('visible'));
                    setTimeout(showOutro, 300);
                });
            } else {
                showOutro();
            }
        }

        function revealLines(lines, container) {
            let i = 0;
            const interval = setInterval(() => {
                if (i >= lines.length) {
                    clearInterval(interval);
                    onColumnDone();
                    return;
                }
                const line = lines[i];
                if (line.type === 'separator') {
                    const sep = document.createElement('div');
                    sep.className = 'visitor-separator';
                    container.appendChild(sep);
                    requestAnimationFrame(() => sep.classList.add('visible'));
                } else {
                    addLine(line.text, line.style, container);
                }
                i++;
            }, 100);
        }

        function addLine(text, style, container) {
            const el = document.createElement('div');
            el.className = 'visitor-line vl-' + style;
            el.textContent = text;
            container.appendChild(el);
            requestAnimationFrame(() => el.classList.add('visible'));
        }

        function showOutro() {
            outro.textContent = "No cookies stored. No accounts. Just your browser, quietly revealing everything to anyone who asks.";
            requestAnimationFrame(() => outro.classList.add('visible'));
        }
    }

    function getWebGLRenderer() {
        try {
            const c = document.createElement('canvas');
            const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
            if (!gl) return 'Unknown';
            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return 'Unknown'; }
    }

    function detectFonts() {
        const testFonts = [
            'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia',
            'Verdana', 'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Palatino',
            'Lucida Console', 'Tahoma', 'Segoe UI', 'Roboto', 'SF Pro',
            'Menlo', 'Consolas', 'Fira Code', 'JetBrains Mono', 'Monaco'
        ];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const testStr = 'mmmmmmmmmmlli';
        const baseFont = 'monospace';
        ctx.font = '72px ' + baseFont;
        const baseWidth = ctx.measureText(testStr).width;
        const detected = [];
        for (const font of testFonts) {
            ctx.font = '72px "' + font + '", ' + baseFont;
            if (ctx.measureText(testStr).width !== baseWidth) {
                detected.push(font);
            }
        }
        return detected.length > 0 ? detected : ['Could not detect'];
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

        if (defuseActive) return;

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

    const startTime = Date.now();
    let clicks = 0;
    let moves = 0;
    const statsEl = document.getElementById('activity-stats');

    document.addEventListener('click', () => clicks++);
    document.addEventListener('mousemove', () => moves++);

    function updateStats() {
        const secs = Math.floor((Date.now() - startTime) / 1000);
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        const time = m > 0 ? `${m}m ${s}s` : `${s}s`;
        statsEl.textContent = `You've been here ${time}, switched ${tabSwitches} tabs, clicked ${clicks} times, moved ${moves.toLocaleString()} pixels`;
    }
    setInterval(updateStats, 1000);
    updateStats();

    const snippets = [
        'git push origin main',
        'docker build -t app .',
        'mvn clean install -DskipTests',
        'kubectl apply -f deploy.yaml',
        'ssh root@10.0.0.1',
        'curl -X POST /api/defuse',
        'sudo systemctl stop bomb.service',
        'rm -rf /tmp/payload',
        'openssl enc -aes-256-cbc -d',
        'grep -r "detonate" /var/log',
        'iptables -A INPUT -j DROP',
        'chmod 000 /opt/trigger.sh',
        'kill -9 $(pgrep detonator)',
        'echo "ABORT" > /dev/null',
        'tar -xzf backup.tar.gz',
        'nc -lvp 4444 < /dev/null',
        'aws s3 rm s3://bucket/bomb',
        'java -jar defuser.jar --now',
        'npm run disarm --force',
        'SELECT * FROM bombs WHERE active=1;',
    ];

    let defuseTimer = null;
    let defuseTime = 0;
    let defuseScore = 0;
    let currentSnippet = '';
    let usedSnippets = [];

    const defuseTimerEl = document.getElementById('defuse-timer');
    const defuseScoreEl = document.getElementById('defuse-score');
    const defusePrompt = document.getElementById('defuse-prompt');
    const defuseInput = document.getElementById('defuse-input');
    const defuseStatus = document.getElementById('defuse-status');
    const defuseStartBtn = document.getElementById('defuse-start');

    function initDefuse() {
        defuseInput.focus();
    }

    function startDefuse() {
        defuseActive = true;
        defuseScore = 0;
        defuseTime = 30.0;
        usedSnippets = [];
        defuseScoreEl.textContent = 'SCORE: 0';
        defuseTimerEl.classList.remove('danger');
        defuseInput.disabled = false;
        defuseInput.value = '';
        defuseInput.focus();
        defuseStatus.innerHTML = '<span class="defuse-result">Defusing...</span>';
        nextSnippet();
        defuseTimer = setInterval(tickDefuse, 100);
    }

    function tickDefuse() {
        defuseTime -= 0.1;
        if (defuseTime <= 0) {
            defuseTime = 0;
            endDefuse(false);
        }
        defuseTimerEl.textContent = defuseTime.toFixed(1);
        if (defuseTime <= 5) defuseTimerEl.classList.add('danger');
    }

    function nextSnippet() {
        if (usedSnippets.length >= snippets.length) usedSnippets = [];
        let s;
        do { s = snippets[Math.floor(Math.random() * snippets.length)]; } while (usedSnippets.includes(s));
        usedSnippets.push(s);
        currentSnippet = s;
        renderPrompt();
    }

    function renderPrompt() {
        const typed = defuseInput.value;
        let html = '';
        for (let i = 0; i < currentSnippet.length; i++) {
            let cls = '';
            if (i < typed.length) {
                cls = typed[i] === currentSnippet[i] ? 'correct' : 'wrong';
            }
            if (i === typed.length) cls += ' cursor';
            html += `<span class="char ${cls}">${currentSnippet[i] === ' ' ? '&nbsp;' : escapeHtml(currentSnippet[i])}</span>`;
        }
        defusePrompt.innerHTML = html;
    }

    function escapeHtml(c) {
        if (c === '<') return '&lt;';
        if (c === '>') return '&gt;';
        if (c === '&') return '&amp;';
        if (c === '"') return '&quot;';
        return c;
    }

    function endDefuse(won) {
        defuseActive = false;
        clearInterval(defuseTimer);
        defuseInput.disabled = true;
        defuseTimerEl.classList.remove('danger');
        if (won) {
            defuseStatus.innerHTML = `<span class="defuse-result success">DEFUSED! Final score: ${defuseScore}</span><button class="defuse-start" id="defuse-restart">Again</button>`;
        } else {
            const flash = document.createElement('div');
            flash.className = 'defuse-flash';
            document.body.appendChild(flash);
            flash.addEventListener('animationend', () => flash.remove());
            const frame = document.querySelector('.frame');
            frame.classList.add('defuse-explode');
            frame.addEventListener('animationend', () => frame.classList.remove('defuse-explode'), { once: true });
            defuseStatus.innerHTML = `<span class="defuse-result failure">💥 BOOM! Score: ${defuseScore}</span><button class="defuse-start" id="defuse-restart">Retry</button>`;
            defusePrompt.innerHTML = '<span style="color:#ff4444;font-size:24px;">💥 DETONATED 💥</span>';
        }
        document.getElementById('defuse-restart').addEventListener('click', startDefuse);
    }

    defuseInput.addEventListener('input', () => {
        if (!defuseActive) return;
        renderPrompt();
        if (defuseInput.value === currentSnippet) {
            defuseScore++;
            defuseTime = Math.min(defuseTime + 3, 30);
            defuseScoreEl.textContent = `SCORE: ${defuseScore}`;
            defuseInput.value = '';
            nextSnippet();
        }
    });

    defuseStartBtn.addEventListener('click', startDefuse);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !defuseActive && sections[activeIndex].id === 'defuse') startDefuse();
    });
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
