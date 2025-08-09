const pairsNormal = [
    'EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CHF', 'AUD/USD',
    'USD/CAD', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
    'AUD/JPY', 'CAD/JPY', 'CHF/JPY', 'NZD/JPY', 'EUR/AUD',
    'EUR/CAD', 'EUR/CHF', 'GBP/AUD', 'GBP/CAD', 'GBP/CHF',
    'AUD/CAD', 'AUD/CHF', 'NZD/CAD', 'NZD/CHF', 'CAD/CHF',
    'EUR/NZD', 'GBP/NZD', 'AUD/NZD', 'USD/NOK', 'USD/SEK', 'USD/SGD'
];

const pairsOTC = [
    'EUR/USD (OTC)', 'GBP/USD (OTC)', 'USD/JPY (OTC)', 'USD/CHF (OTC)', 'AUD/USD (OTC)',
    'USD/CAD (OTC)', 'NZD/USD (OTC)', 'EUR/GBP (OTC)', 'EUR/JPY (OTC)', 'GBP/JPY (OTC)'
];

let lang = 'en';

const translations = {
    en: {
        title: 'Forex Analysis',
        pairLabel: 'Select currency pair:',
        photoLabel: 'Upload photo for analysis:',
        cameraText: 'Take Photo',
        analyze: 'Analyze',
        analyzing: 'Analyzing...',
        langToggle: 'RU'
    },
    ru: {
        title: 'Анализ Форекс',
        pairLabel: 'Выберите валютную пару:',
        photoLabel: 'Загрузите фото для анализа:',
        cameraText: 'Сделать фото',
        analyze: 'Анализировать',
        analyzing: 'Анализ...',
        langToggle: 'EN'
    }
};

function populatePairs(type = 'normal') {
    const select = document.getElementById('pair');
    select.innerHTML = '';
    let list = type === 'otc' ? pairsOTC : pairsNormal;
    list.forEach(p => {
        const opt = document.createElement('option');
        opt.textContent = p;
        select.appendChild(opt);
    });
});
}

function setLanguage(l) {
    lang = l;
    document.getElementById('title').textContent = translations[l].title;
    document.getElementById('pair-label').textContent = translations[l].pairLabel;
    document.getElementById('photo-label').textContent = translations[l].photoLabel;
    document.getElementById('camera-text').textContent = translations[l].cameraText;
    document.getElementById('analyze').textContent = translations[l].analyze;
    document.getElementById('loading-text').textContent = translations[l].analyzing;
    document.getElementById('lang-toggle').textContent = translations[l].langToggle;
}

document.getElementById('camera-btn').addEventListener('click', () => {
    document.getElementById('photo').click();
});

document.getElementById('analyze').addEventListener('click', function() {
    document.getElementById('result').textContent = '';
    document.getElementById('loading').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        const result = Math.random() < 0.5 ? 'BUY' : 'SELL';
        document.getElementById('result').textContent = result;
        document.getElementById('result').style.color = result === 'BUY' ? 'lime' : 'red';
    }, 5000);
});

document.getElementById('lang-toggle').addEventListener('click', function() {
    setLanguage(lang === 'en' ? 'ru' : 'en');
});

populatePairs();
setLanguage('en');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}


let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome);
            deferredPrompt = null;
            installBtn.style.display = 'none';
        });
    } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        alert('Чтобы установить: нажмите «Поделиться» → «На экран Домой»');
    }
});


const installBtn = document.getElementById('installBtn');
let deferredPrompt;

// Показываем кнопку всегда
installBtn.style.display = 'block';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

installBtn.addEventListener('click', () => {
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        alert('Чтобы установить: нажмите «Поделиться» → «На экран Домой»');
    } else if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome);
            deferredPrompt = null;
        });
    } else {
        alert('Установка PWA не поддерживается в этом браузере.');
    }
});


// Автоанализ при загрузке фото
document.getElementById('photo').addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
        document.getElementById('analyze').click();
    }
});


// Переключение валютных пар
document.getElementById('btnNormal').addEventListener('click', () => {
    populatePairs('normal');
});
document.getElementById('btnOTC').addEventListener('click', () => {
    populatePairs('otc');
});
