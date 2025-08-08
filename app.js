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
        analyze: 'Analyze',
        analyzing: 'Analyzing...',
        langToggle: 'RU'
    },
    ru: {
        title: 'Анализ Форекс',
        pairLabel: 'Выберите валютную пару:',
        photoLabel: 'Загрузите фото для анализа:',
        analyze: 'Анализировать',
        analyzing: 'Анализ...',
        langToggle: 'EN'
    }
};

function populatePairs() {
    const select = document.getElementById('pair');
    select.innerHTML = '';
    [...pairsNormal, ...pairsOTC].forEach(p => {
        const opt = document.createElement('option');
        opt.textContent = p;
        select.appendChild(opt);
    });
}

function setLanguage(l) {
    lang = l;
    document.getElementById('title').textContent = translations[l].title;
    document.getElementById('pair-label').textContent = translations[l].pairLabel;
    document.getElementById('photo-label').textContent = translations[l].photoLabel;
    document.getElementById('analyze').textContent = translations[l].analyze;
    document.getElementById('loading-text').textContent = translations[l].analyzing;
    document.getElementById('lang-toggle').textContent = translations[l].langToggle;
}

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
