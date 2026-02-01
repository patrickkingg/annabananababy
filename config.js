// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    valentineName: "Anna",
    pageTitle: "Will You Be My Valentine? 💝",

    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },

    question: {
        text: "Will You Be My Valentine, Anna? 🥺",
        yesBtn: "Yes!",
        noBtn: "No",
        tryAgainText: "Wow you clicked no... try again... 🤨" // The "gotcha" message
    },

    celebration: {
        title: "Great Choice mom 😎, now text dad the code below for some 💋, 💕, and 💰",
        message: "VAL2026YAS",
    },

    colors: {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    },

    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;