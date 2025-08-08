// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered', reg.scope))
      .catch(err => console.warn('SW registration failed', err));
  });
}

// UI logic
const chartInput = document.getElementById('chartImage');
const previewImg = document.getElementById('previewImg');
const analyzeBtn = document.getElementById('analyzeBtn');
const result = document.getElementById('result');
const buyBtn = document.getElementById('buyBtn');

chartInput.addEventListener('change', (ev) => {
  const f = ev.target.files && ev.target.files[0];
  if (!f) return;
  const url = URL.createObjectURL(f);
  previewImg.src = url;
});

analyzeBtn.addEventListener('click', async () => {
  result.textContent = 'AI Analysis: загружаем...';
  // Placeholder: simulate analysis delay
  await new Promise(r => setTimeout(r, 900));
  // Sample output
  result.textContent = 'AI Analysis: ↑ BUY (вероятность 72%)';
});

buyBtn.addEventListener('click', () => {
  alert('Кнопка "Купить" — ещё не подключена к брокеру. Используйте для тестирования.');
});

// Prompt to install (captures beforeinstallprompt)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Optionally show an install UI in the future
});

// simple helper to detect offline
window.addEventListener('offline', () => {
  console.log('Offline');
});
