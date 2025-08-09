let currentLang = 'ru';

document.getElementById('camera-btn').addEventListener('click', () => {
    alert(currentLang === 'ru' ? 'Открываем камеру (функция будет интегрирована позже)' : 'Opening camera (function will be integrated later)');
});

document.getElementById('analyze-btn').addEventListener('click', () => {
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const signalText = document.getElementById('signal-text');

    loading.classList.remove('hidden');
    result.classList.add('hidden');

    setTimeout(() => {
        loading.classList.add('hidden');
        result.classList.remove('hidden');

        const signal = Math.random() > 0.5 ? (currentLang === 'ru' ? 'BUY 🟢' : 'BUY 🟢') : (currentLang === 'ru' ? 'SELL 🔴' : 'SELL 🔴');
        signalText.textContent = signal;
        signalText.style.color = signal.includes('BUY') ? '#00f5d4' : '#ff6b6b';
    }, 5000);
});

document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    if (currentLang === 'ru') {
        document.querySelector('label').textContent = 'Валютная пара:';
        document.getElementById('camera-btn').textContent = '📷 Открыть камеру';
        document.getElementById('analyze-btn').textContent = '🚀 Анализировать';
        document.getElementById('lang-toggle').textContent = 'EN';
    } else {
        document.querySelector('label').textContent = 'Currency Pair:';
        document.getElementById('camera-btn').textContent = '📷 Open Camera';
        document.getElementById('analyze-btn').textContent = '🚀 Analyze';
        document.getElementById('lang-toggle').textContent = 'RU';
    }
});
