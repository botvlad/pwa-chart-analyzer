document.getElementById('camera-btn').addEventListener('click', () => {
    alert('Открываем камеру (функция будет интегрирована позже)');
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

        const signal = Math.random() > 0.5 ? 'BUY 🟢' : 'SELL 🔴';
        signalText.textContent = signal;
        signalText.style.color = signal.includes('BUY') ? '#00f5d4' : '#ff6b6b';
    }, 5000);
});

document.getElementById('lang-ru').addEventListener('click', () => {
    document.querySelector('label').textContent = 'Валютная пара:';
    document.getElementById('camera-btn').textContent = '📷 Открыть камеру';
    document.getElementById('analyze-btn').textContent = '🚀 Анализировать';
});

document.getElementById('lang-en').addEventListener('click', () => {
    document.querySelector('label').textContent = 'Currency Pair:';
    document.getElementById('camera-btn').textContent = '📷 Open Camera';
    document.getElementById('analyze-btn').textContent = '🚀 Analyze';
});
