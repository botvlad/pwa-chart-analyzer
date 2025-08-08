document.getElementById('analyze').addEventListener('click', function() {
    const result = Math.random() < 0.5 ? 'BUY' : 'SELL';
    document.getElementById('result').textContent = result;
    document.getElementById('result').style.color = result === 'BUY' ? 'green' : 'red';
});

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.error('Service Worker registration failed', err));
}
