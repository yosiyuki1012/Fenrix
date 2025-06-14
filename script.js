// DOM Elements
const toggleThemeBtn = document.getElementById('toggleTheme');
const toggleDeviceBtn = document.getElementById('toggleDevice');
const toggleMusicBtn = document.getElementById('toggleMusic');
const discordLink = document.querySelector('.discord-link');
const loadingBarContainer = document.getElementById('loadingBarContainer');
const loadingBar = document.getElementById('loadingBar');
const body = document.body;

// 初期設定読み込み
function loadSettings() {
  const theme = localStorage.getItem('fenrix-theme') || 'dark';
  const device = localStorage.getItem('fenrix-device') || 'pc';
  const musicOn = localStorage.getItem('fenrix-music') || 'off';

  setTheme(theme);
  setDevice(device);
  setMusic(musicOn);
}

// テーマ切替
function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
  } else {
    body.classList.remove('light');
  }
  localStorage.setItem('fenrix-theme', theme);
  toggleThemeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
}

// デバイス切替
function setDevice(device) {
  if (device === 'mobile') {
    body.classList.add('mobile');
    body.classList.remove('pc');
  } else {
    body.classList.add('pc');
    body.classList.remove('mobile');
  }
  localStorage.setItem('fenrix-device', device);
  toggleDeviceBtn.textContent = device === 'mobile' ? 'PC Mode' : 'Mobile Mode';
}

// 音楽切替
let audio;
function setMusic(state) {
  if (!audio) {
    audio = new Audio();
    // BGMリストからランダム再生
    const bgmList = [
      'bgm/soviet.mp3',
      'bgm/tung_tung_safol.mp3',
      'bgm/bombardino_crocodio.mp3',
      'bgm/ballerina_capuchina.mp3',
      'bgm/cappuccino_assassie.mp3'
    ];
    audio.src = bgmList[Math.floor(Math.random() * bgmList.length)];
    audio.loop = true;
  }

  if (state === 'on') {
    audio.play().catch(() => {});
    toggleMusicBtn.textContent = 'Music Off';
    localStorage.setItem('fenrix-music', 'on');
  } else {
    audio.pause();
    toggleMusicBtn.textContent = 'Music On';
    localStorage.setItem('fenrix-music', 'off');
  }
}

// Discordリンククリック時の利用規約確認
discordLink.addEventListener('click', e => {
  e.preventDefault();
  if (confirm('公式Discordに移動します。\n利用規約を厳守してください。')) {
    window.open(discordLink.href, '_blank');
  }
});

// ローディングバー表示・更新
function showLoadingBar() {
  loadingBarContainer.style.display = 'block';
  loadingBar.style.width = '0%';
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 90) {
      clearInterval(interval);
    } else {
      width += 10;
      loadingBar.style.width = width + '%';
    }
  }, 200);
  return interval;
}

function hideLoadingBar(interval) {
  clearInterval(interval);
  loadingBar.style.width = '100%';
  setTimeout(() => {
    loadingBarContainer.style.display = 'none';
    loadingBar.style.width = '0%';
  }, 300);
}

// ページ読み込み時にローディングバー表示し、2秒後に非表示
window.addEventListener('load', () => {
  const loadingInterval = showLoadingBar();
  setTimeout(() => hideLoadingBar(loadingInterval), 2000);
});

// ボタンイベント設定
toggleThemeBtn.addEventListener('click', () => {
  const current = body.classList.contains('light') ? 'light' : 'dark';
  setTheme(current === 'light' ? 'dark' : 'light');
});

toggleDeviceBtn.addEventListener('click', () => {
  const current = body.classList.contains('mobile') ? 'mobile' : 'pc';
  setDevice(current === 'mobile' ? 'pc' : 'mobile');
});

toggleMusicBtn.addEventListener('click', () => {
  const musicState = localStorage.getItem('fenrix-music') || 'off';
  setMusic(musicState === 'on' ? 'off' : 'on');
});

// 初期化
loadSettings();
