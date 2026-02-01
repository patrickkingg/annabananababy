const config = window.VALENTINE_CONFIG;
let isTryAgainMode = false;
let canMove = true; 

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question1Text');
    const yesBtn = document.getElementById('yesBtn1');
    const noBtn = document.getElementById('noBtn1');
    // const titleEl = document.getElementById('valentineTitle');

    if (questionText) questionText.textContent = config.question.text;
    if (yesBtn) yesBtn.textContent = config.question.yesBtn;
    if (noBtn) noBtn.textContent = config.question.noBtn;
    // if (titleEl) titleEl.textContent = config.valentineName;

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            if (isTryAgainMode) {
                resetToOriginal(questionText, yesBtn, noBtn);
            } else {
                celebrate();
            }
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', () => {
            isTryAgainMode = true;
            questionText.textContent = config.question.tryAgainText;
            noBtn.style.display = 'none'; 
            yesBtn.textContent = "Okay, fine! ❤️"; 
        });

        noBtn.style.position = 'fixed';
        noBtn.style.transition = 'all 0.15s ease-out';

        document.addEventListener('mousemove', (e) => {
            if (isTryAgainMode || !canMove) return; 

            const btnRect = noBtn.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

            // INCREASED: Detection radius (130px makes creeping much harder)
            const proximityLimit = 130; 

            if (distance < proximityLimit) {
                const pad = 50; 
                const isAtLeft = btnRect.left < pad;
                const isAtRight = btnRect.right > window.innerWidth - pad;
                const isAtTop = btnRect.top < pad;
                const isAtBottom = btnRect.bottom > window.innerHeight - pad;

                const isCornered = (isAtLeft && isAtTop) || (isAtLeft && isAtBottom) || 
                                   (isAtRight && isAtTop) || (isAtRight && isAtBottom);

                if (isCornered) {
                    noBtn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    const targetX = (window.innerWidth * 0.3) + (Math.random() * window.innerWidth * 0.5);
                    const targetY = (window.innerHeight * 0.3) + (Math.random() * window.innerHeight * 0.5);
                    noBtn.style.left = `${targetX}px`;
                    noBtn.style.top = `${targetY}px`;
                } else {
                    // SLIPPERY DRIFT: Increased pushDist for more dramatic movement
                    noBtn.style.transition = 'all 0.06s ease-out';
                    const angle = Math.atan2(btnCenterY - e.clientY, btnCenterX - e.clientX);
                    const pushDist = 50; 

                    let newX = noBtn.offsetLeft + Math.cos(angle) * pushDist;
                    let newY = noBtn.offsetTop + Math.sin(angle) * pushDist;

                    // Bound it so it doesn't leave the screen
                    newX = Math.max(15, Math.min(window.innerWidth - btnRect.width - 15, newX));
                    newY = Math.max(15, Math.min(window.innerHeight - btnRect.height - 15, newY));

                    noBtn.style.left = `${newX}px`;
                    noBtn.style.top = `${newY}px`;
                }
            }
        });
    }

    createFloatingElements();
    setupMusicPlayer();
});

function resetToOriginal(qText, yBtn, nBtn) {
    isTryAgainMode = false;
    canMove = false; 
    qText.textContent = config.question.text;
    yBtn.textContent = config.question.yesBtn;
    nBtn.removeAttribute('style'); 
    nBtn.style.display = 'inline-block';
    nBtn.style.position = 'fixed'; 
    nBtn.style.transition = 'all 0.15s ease-out';
    setTimeout(() => { canMove = true; }, 500);
}

function celebrate() {
    const questionSection = document.getElementById('question1');
    if (questionSection) questionSection.classList.add('hidden');
    
    const celebration = document.getElementById('celebration');
    if (celebration) {
        celebration.classList.remove('hidden');
        
        // --- NEW IMAGE LOGIC START ---
        // Create an image element for the car
        // Check if it already exists to avoid duplicates if celebrate is called twice
        if (!document.getElementById('celebrationImage')) {
            const catImg = document.createElement('img');
            catImg.id = 'celebrationImage';
            catImg.src = 'niko.png'; // Make sure the filename matches your root image (e.g., car.png or car.jpg)
            catImg.alt = 'Our Cat';
            
            // Add some styling to make it look nice
            catImg.style.width = '80%';
            catImg.style.maxWidth = '400px';
            catImg.style.borderRadius = '20px';
            catImg.style.boxShadow = '0 0 0 rgba(0,0,0,0.2)';
            catImg.style.marginBottom = '20px';
            catImg.style.display = 'block';
            catImg.style.marginLeft = 'auto';
            catImg.style.marginRight = 'auto';

            // Insert it before the celebration title or message
            const title = document.getElementById('celebrationTitle');
            celebration.insertBefore(catImg, title);
        }
        // --- NEW IMAGE LOGIC END ---

        document.getElementById('celebrationTitle').textContent = config.celebration.title;
        document.getElementById('celebrationMessage').textContent = config.celebration.message;
        document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    }
    createHeartExplosion();
}

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    const allEmojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    allEmojis.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = emoji;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.className = 'heart';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');
    const musicToggle = document.getElementById('musicToggle');
    if (!config.music.enabled || !bgMusic) return;
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume;
    bgMusic.load();
    if (config.music.autoplay) {
        bgMusic.play().catch(() => {
            if (musicToggle) musicToggle.textContent = config.music.startText;
        });
    }
    musicToggle?.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}