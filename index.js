const boot = document.getElementById('boot');
const bootLines = boot.querySelectorAll('.boot-line');
const frame = document.querySelector('.frame');
const bootProgress = document.getElementById('boot-progress');

let bootDelay = 0;
const totalLines = bootLines.length;
bootLines.forEach((line, i) => {
    bootDelay += 300 + Math.random() * 250;
    setTimeout(() => {
        line.classList.add('visible');
        bootProgress.style.width = Math.round(((i + 1) / totalLines) * 100) + '%';
    }, bootDelay);
});

setTimeout(() => {
    boot.classList.add('fade-out');
    frame.style.opacity = '1';
    frame.style.transition = 'opacity 0.4s';
    setTimeout(() => boot.remove(), 400);
    initApp();
}, bootDelay + 500);

function initApp() {
    const startDate = new Date(2018, 10, 1);
    const years = Math.floor((new Date() - startDate) / (365.25 * 24 * 60 * 60 * 1000));
    document.getElementById('years-exp').textContent = years + '+';
    document.getElementById('years-bio').textContent = years;

    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour >= 0 && hour < 4) greeting = "It's " + hour + "am. You should be sleeping.";
    else if (hour === 4) greeting = "4am? Either very early or very late.";
    else if (hour >= 5 && hour < 8) greeting = "Early bird. Respect.";
    else if (hour >= 8 && hour < 12) greeting = "Good morning";
    else if (hour >= 12 && hour < 14) greeting = "Lunch break browsing?";
    else if (hour >= 14 && hour < 18) greeting = "Good afternoon";
    else if (hour >= 18 && hour < 22) greeting = "Good evening";
    else if (hour >= 22) greeting = "Late night scrolling. I get it.";
    document.querySelector('.frame').setAttribute('data-title', greeting);

    document.addEventListener('copy', () => {
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'I noticed you copied that. Saving it somewhere?';
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    });

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
        document.documentElement.style.transition = 'background 0.4s, color 0.4s, border-color 0.4s';
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
    async function populateVisitor() {
        if (visitorPopulated) return;
        visitorPopulated = true;

        const intro = document.getElementById('visitor-intro');
        const leftCol = document.getElementById('visitor-facts-left');
        const rightCol = document.getElementById('visitor-facts-right');
        const outro = document.getElementById('visitor-outro');

        intro.textContent = "You thought you were just browsing. Let me show you what you left behind.";

        for (let i = 0; i < 6; i++) {
            const sk = document.createElement('div');
            sk.className = 'skeleton-line';
            leftCol.appendChild(sk);
            const sk2 = document.createElement('div');
            sk2.className = 'skeleton-line';
            rightCol.appendChild(sk2);
        }

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

        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const canvas2dFp = getCanvasFingerprint();
        const audioFp = getAudioFingerprint();
        const localIPs = await getLocalIPs();
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const cpuCores = navigator.hardwareConcurrency || '?';
        const ramStr = navigator.deviceMemory ? '~' + navigator.deviceMemory + ' GB' : null;

        const left = [
            { text: "SUBJECT CONTACT", style: 'section' },
            { text: "You walked in at " + arrived + ".", style: 'highlight' },
            { text: "I've been watching since.", style: 'dim' },
            { text: "IDENTIFICATION", style: 'section' },
            { text: "You're running " + browser + " on " + os + ".", style: 'highlight' },
            { text: screen.width + "×" + screen.height + " display, " + devicePixelRatio + "x density.", style: 'accent' },
            { text: touch ? "Touchscreen. " + navigator.maxTouchPoints + " contact points. Mobile." : "Mouse and keyboard. You're at a desk.", style: 'dim' },
            { text: "HARDWARE PROFILE", style: 'section' },
            { text: cpuCores + " CPU cores. " + (ramStr ? ramStr + " of RAM." : "RAM hidden — cautious."), style: 'highlight' },
            { text: gpu, style: 'accent' },
            { text: conn ? "Connection: " + conn.effectiveType.toUpperCase() + ", ~" + conn.downlink + " Mbps downstream." : "Network details hidden.", style: 'dim' },
        ];

        const right = [
            { text: "LOCATION ANALYSIS", style: 'section' },
            { text: "You speak " + langs + ".", style: 'highlight' },
            { text: "Clock says " + tz.split('/').pop().replace(/_/g, ' ') + ".", style: 'accent' },
            { text: "UNIQUE SIGNATURE", style: 'section' },
            { text: "Canvas hash: " + canvas2dFp, style: 'accent' },
            { text: "Audio hash: " + audioFp, style: 'accent' },
            { text: "I can see these fonts: " + fonts.slice(0, 4).join(", ") + ".", style: 'highlight' },
            { text: localIPs.length ? "Local network: " + localIPs.join(", ") + ". Interesting." : "Local IPs hidden. Smart.", style: 'highlight' },
            { text: "COUNTERMEASURES", style: 'section' },
            { text: darkMode ? "Dark mode. You prefer the shadows." : "Light mode. Nothing to hide?", style: 'dim' },
            { text: "MOTION SENSORS", style: 'section' },
            { text: "listening...", style: 'accent', id: 'gyro-line' },
        ];

        try {
            const geoRes = await fetch("https://ipwho.is/");
            const geo = await geoRes.json();
            if (geo.success && geo.city) {
                const geoLines = [
                    { text: geo.city + ", " + geo.country + ". I know where you are.", style: 'accent' },
                    { text: "isp: " + geo.connection.isp, style: 'dim' },
                    { text: "ip: " + geo.ip, style: 'dim' },
                ];
                const ipTimezone = geo.timezone.id;
                if (ipTimezone && ipTimezone !== tz) {
                    const ipCountry = geo.country || 'somewhere else';
                    const tzCity = tz.split('/').pop().replace(/_/g, ' ');
                    geoLines.push({ text: "⚠ VPN. Your IP says " + ipCountry + ". Your clock says " + tzCity + ". Who are you hiding from?", style: 'accent' });
                }
                left.splice(3, 0, ...geoLines);
                try {
                    const weatherRes = await fetch("https://wttr.in/" + encodeURIComponent(geo.city) + "?format=j1");
                    const data = await weatherRes.json();
                    const cur = data.current_condition[0];
                    const temp = cur.temp_C + "°C";
                    const desc = cur.weatherDesc[0].value.toLowerCase();
                    const wind = cur.windspeedKmph + " km/h wind";
                    left.splice(3 + geoLines.length, 0, { text: temp + ", " + desc + ", " + wind + " outside. I checked.", style: 'highlight' });
                } catch (e) {}
            }
        } catch (e) {}
        revealBoth();

        const batteryEl = document.getElementById('visitor-battery');
        let doneCount = 0;

        function revealBoth() {
            leftCol.innerHTML = '';
            rightCol.innerHTML = '';
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
                    addLine(line.text, line.style, container, line.id);
                }
                i++;
            }, 100);
        }

        function addLine(text, style, container, id) {
            const el = document.createElement('div');
            el.className = 'visitor-line vl-' + style;
            if (id) el.id = id;
            el.textContent = text;
            container.appendChild(el);
            requestAnimationFrame(() => el.classList.add('visible'));
        }

        function showOutro() {
            outro.textContent = "No cookies. No tracking. I didn't need any of that to learn all this.";
            requestAnimationFrame(() => outro.classList.add('visible'));
            initGyroscope();
        }

        function initGyroscope() {
            const gyroEl = document.getElementById('gyro-line');
            if (!gyroEl) return;

            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', (e) => {
                    if (e.alpha === null && e.beta === null && e.gamma === null) {
                        gyroEl.textContent = 'No sensors. Desktop. Sitting still.';
                        return;
                    }
                    const beta = Math.round(e.beta || 0);
                    const gamma = Math.round(e.gamma || 0);
                    let posture = '';
                    if (beta > 70) posture = "You're holding it up. Reading carefully.";
                    else if (beta > 40) posture = "Tilted. On a desk? Leaning forward.";
                    else if (beta < 15 && beta > -15) posture = "Flat. You're lying down.";
                    else if (beta < -30) posture = "Face down. Are you hiding the screen?";
                    else posture = "Tilted " + beta + "°. Interesting angle.";
                    if (Math.abs(gamma) > 45) posture = "Landscape. You rotated your phone.";
                    gyroEl.textContent = posture;
                });
                setTimeout(() => {
                    if (gyroEl.textContent === 'listening...') {
                        gyroEl.textContent = 'No sensors. Desktop. Sitting still.';
                    }
                }, 2000);
            } else {
                gyroEl.textContent = 'not supported';
            }
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

    function getCanvasFingerprint() {
        try {
            const c = document.createElement('canvas');
            c.width = 200; c.height = 50;
            const ctx = c.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('fingerprint', 2, 15);
            ctx.fillStyle = 'rgba(102,204,0,0.7)';
            ctx.fillText('fingerprint', 4, 17);
            const data = c.toDataURL();
            let hash = 0;
            for (let i = 0; i < data.length; i++) {
                hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
            }
            return (hash >>> 0).toString(16).padStart(8, '0');
        } catch (e) { return 'blocked'; }
    }

    function getAudioFingerprint() {
        try {
            const ctx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100);
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(10000, ctx.currentTime);
            const comp = ctx.createDynamicsCompressor();
            osc.connect(comp);
            comp.connect(ctx.destination);
            osc.start(0);
            ctx.startRendering();
            let hash = 0;
            const id = ctx.length.toString() + ctx.sampleRate.toString() + ctx.numberOfChannels.toString();
            for (let i = 0; i < id.length; i++) {
                hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
            }
            return (hash >>> 0).toString(16).padStart(8, '0');
        } catch (e) { return 'blocked'; }
    }


    async function getLocalIPs() {
        const ips = [];
        try {
            const pc = new RTCPeerConnection({ iceServers: [] });
            pc.createDataChannel('');
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            await new Promise(resolve => {
                pc.onicecandidate = (e) => {
                    if (!e.candidate) { resolve(); return; }
                    const match = e.candidate.candidate.match(/(\d+\.\d+\.\d+\.\d+)/);
                    if (match && !ips.includes(match[1])) ips.push(match[1]);
                };
                setTimeout(resolve, 2000);
            });
            pc.close();
        } catch (e) {}
        return ips;
    }


    const easterHint = document.querySelector('.easter-hint');
    easterHint.addEventListener('click', () => {
        easterHint.classList.toggle('show-tooltip');
    });

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
    function statsLoop() { updateStats(); requestAnimationFrame(statsLoop); }
    statsLoop();

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
    const overlay = document.createElement('div');
    overlay.className = 'terminal-takeover';
    document.body.appendChild(overlay);

    const terminal = document.createElement('div');
    terminal.className = 'takeover-terminal';
    overlay.appendChild(terminal);

    const lines = [
        { text: '> I knew you\'d find this.', delay: 1000 },
        { text: '> Not many do.', delay: 800 },
        { text: '> You looked where others didn\'t.', delay: 1000 },
        { text: '> ...', delay: 1500 },
        { text: ' ', delay: 1000 },
        { text: '> initiating self-destruct...', delay: 2000, warn: true },
        { text: '> 3', delay: 1000, warn: true },
        { text: '> 2', delay: 1000, warn: true },
        { text: '> 1', delay: 1000, warn: true },
    ];

    let i = 0;

    function typeLine() {
        if (i >= lines.length) {
            selfDestruct(overlay);
            return;
        }
        const line = lines[i];
        const el = document.createElement('div');
        el.className = 'takeover-line' + (line.dim ? ' dim' : '') + (line.warn ? ' warn' : '');
        terminal.appendChild(el);

        let c = 0;
        const typeChar = setInterval(() => {
            el.textContent = line.text.slice(0, c + 1);
            c++;
            if (c >= line.text.length) {
                clearInterval(typeChar);
                i++;
                setTimeout(typeLine, line.delay);
            }
        }, 35);
    }

    setTimeout(typeLine, 300);

    function selfDestruct(overlay) {
        overlay.classList.add('flash-white');
        setTimeout(() => {
            overlay.remove();
            document.body.classList.add('self-destruct');
            const els = document.querySelectorAll('.frame > *, .frame');
            els.forEach((el, i) => {
                el.style.transition = 'opacity 0.6s, transform 0.6s';
                el.style.transitionDelay = (i * 80) + 'ms';
                el.style.opacity = '0';
                el.style.transform = 'translateY(-20px) scale(0.95)';
            });
            setTimeout(() => {
                window.close();
                window.location.href = 'about:blank';
            }, 1200);
        }, 600);
    }
}
