let currentLang = 'ru';
let stream;

const cameraBtn = document.getElementById('camera-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const videoElement = document.createElement('video');
const photoCanvas = document.createElement('canvas');
const resultDiv = document.getElementById('result');
const signalText = document.getElementById('signal-text');
const loading = document.getElementById('loading');

videoElement.autoplay = true;
videoElement.style.width = '100%';
videoElement.style.borderRadius = '8px';

document.body.appendChild(videoElement);
videoElement.style.display = 'none';

cameraBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        videoElement.style.display = 'block';

        const captureBtn = document.createElement('button');
        captureBtn.textContent = currentLang === 'ru' ? '📸 Сделать фото' : '📸 Take Photo';
        captureBtn.style.width = '100%';
        captureBtn.style.padding = '12px';
        captureBtn.style.marginTop = '10px';
        captureBtn.style.background = 'linear-gradient(90deg, #00f5d4, #00bbf9)';
        captureBtn.style.color = '#000';
        captureBtn.style.fontWeight = 'bold';
        captureBtn.style.border = 'none';
        captureBtn.style.borderRadius = '8px';
        document.body.appendChild(captureBtn);

        captureBtn.addEventListener('click', () => {
            photoCanvas.width = videoElement.videoWidth;
            photoCanvas.height = videoElement.videoHeight;
            photoCanvas.getContext('2d').drawImage(videoElement, 0, 0);
            const imgData = photoCanvas.toDataURL('image/png');

            const img = document.createElement('img');
            img.src = imgData;
            img.style.width = '100%';
            img.style.borderRadius = '8px';

            document.body.appendChild(img);

            stream.getTracks().forEach(track => track.stop());
            videoElement.style.display = 'none';
            captureBtn.remove();
        });
    } catch (err) {
        alert(currentLang === 'ru' ? 'Ошибка доступа к камере' : 'Camera access error');
    }
});

analyzeBtn.addEventListener('click', () => {
    loading.classList.remove('hidden');
    resultDiv.classList.add('hidden');

    setTimeout(() => {
        loading.classList.add('hidden');
        resultDiv.classList.remove('hidden');

        const signal = Math.random() > 0.5 ? 'BUY 🟢' : 'SELL 🔴';
        signalText.textContent = signal;
        signalText.style.color = signal.includes('BUY') ? '#00f5d4' : '#ff6b6b';
    }, 5000);
});

document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    if (currentLang === 'ru') {
        document.querySelector('label').textContent = 'Валютная пара:';
        cameraBtn.textContent = '📷 Открыть камеру';
        analyzeBtn.textContent = '🚀 Анализировать';
        document.getElementById('lang-toggle').textContent = 'EN';
    } else {
        document.querySelector('label').textContent = 'Currency Pair:';
        cameraBtn.textContent = '📷 Open Camera';
        analyzeBtn.textContent = '🚀 Analyze';
        document.getElementById('lang-toggle').textContent = 'RU';
    }
});
