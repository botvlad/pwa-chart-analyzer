const pairsNormal = [
  'EUR/USD','USD/JPY','GBP/USD','USD/CHF','AUD/USD','USD/CAD','NZD/USD',
  'EUR/GBP','EUR/JPY','GBP/JPY','AUD/JPY','CAD/JPY','CHF/JPY','NZD/JPY',
  'EUR/AUD','EUR/CAD','EUR/CHF','GBP/AUD','GBP/CAD','GBP/CHF','AUD/CAD',
  'AUD/CHF','NZD/CAD','NZD/CHF','CAD/CHF','EUR/NZD','GBP/NZD','AUD/NZD',
  'USD/NOK','USD/SEK','USD/SGD'
];

const pairsOTC = [
  'EUR/USD (OTC)','GBP/USD (OTC)','USD/JPY (OTC)','USD/CHF (OTC)','AUD/USD (OTC)',
  'USD/CAD (OTC)','NZD/USD (OTC)','EUR/GBP (OTC)','EUR/JPY (OTC)','GBP/JPY (OTC)'
];

let lang = 'en';
const translations = {
  en:{
    title:'Pro Forex Scanner',
    tagline:'Fast OTC & Standard pairs analysis',
    pairLabel:'Select currency pair:',
    photoLabel:'Upload / take a photo',
    cameraText:'Take Photo',
    analyze:'Analyze',
    analyzing:'Analyzing...',
    note:'Results are simulated. Connect real AI to enable real analysis.',
    langToggle:'RU'
  },
  ru:{
    title:'Pro Forex Scanner',
    tagline:'Быстрый анализ OTC и обычных пар',
    pairLabel:'Выберите валютную пару:',
    photoLabel:'Загрузите / сделайте фото',
    cameraText:'Сделать фото',
    analyze:'Анализировать',
    analyzing:'Анализ...',
    note:'Результат — симуляция. Подключите AI API для реального анализа.',
    langToggle:'EN'
  }
};

function $(id){return document.getElementById(id)}

function populatePairs(){
  const sel = $('pair');
  sel.innerHTML='';
  [...pairsNormal,...pairsOTC].forEach(p=>{
    const o = document.createElement('option'); o.textContent = p; sel.appendChild(o);
  });
}

function setLanguage(l){
  lang = l;
  $('title').textContent = translations[l].title;
  $('tagline').textContent = translations[l].tagline;
  $('pair-label').textContent = translations[l].pairLabel;
  $('photo-label').textContent = translations[l].photoLabel;
  $('camera-text').textContent = translations[l].cameraText;
  $('analyze').textContent = translations[l].analyze;
  $('loading-text').textContent = translations[l].analyzing;
  $('note').textContent = translations[l].note;
  $('lang-toggle').textContent = translations[l].langToggle;
}

populatePairs();
setLanguage('en');

// elements
const photoInput = $('photo');
const cameraBtn = $('camera-btn');
const analyzeBtn = $('analyze');
const preview = $('preview');
const loading = $('loading');
const progressBar = $('progress-bar');
const result = $('result');
const resultBadge = $('result-badge');
const resultText = $('result-text');

let currentImage = null;

cameraBtn.addEventListener('click', ()=> photoInput.click());

photoInput.addEventListener('change', (e)=>{
  const f = e.target.files && e.target.files[0];
  if(!f) return;
  const url = URL.createObjectURL(f);
  preview.innerHTML = '';
  const img = document.createElement('img');
  img.src = url;
  preview.appendChild(img);
  preview.classList.remove('empty');
  currentImage = f;
  analyzeBtn.disabled = false;
});

// animate progress over 5 seconds
function runProgress(duration=5000){
  progressBar.style.width = '0%';
  const start = performance.now();
  return new Promise(resolve=>{
    function tick(now){
      const t = Math.min(1,(now-start)/duration);
      progressBar.style.width = Math.round(t*100)+'%';
      if(t<1) requestAnimationFrame(tick); else resolve();
    }
    requestAnimationFrame(tick);
  });
}

analyzeBtn.addEventListener('click', async ()=>{
  if(!currentImage){ alert('Please take a photo first'); return; }
  // reset UI
  result.classList.remove('show'); result.classList.add('hidden');
  loading.classList.remove('hidden');
  analyzeBtn.disabled = true;
  // simulate analysis for 5s with progress and spinner
  await runProgress(5000);
  loading.classList.add('hidden');
  // random BUY/SELL
  const pick = Math.random() < 0.5 ? 'BUY' : 'SELL';
  resultBadge.textContent = pick;
  resultBadge.style.background = pick==='BUY' ? 'linear-gradient(90deg,var(--accent1),var(--accent2))' : 'linear-gradient(90deg,#ff7b6b,#ff416c)';
  resultText.textContent = pick==='BUY' ? 'BUY' : 'SELL';
  resultText.style.color = pick==='BUY' ? 'var(--accent1)' : 'var(--danger)';
  result.classList.remove('hidden');
  // show animation class
  setTimeout(()=> result.classList.add('show'), 40);
  analyzeBtn.disabled = false;
});

$('lang-toggle').addEventListener('click', ()=> setLanguage(lang==='en'?'ru':'en'));

// register SW
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js').catch(()=>{});
}
