// Very small audio controller for demo purposes.
// Put this file as app.js and include it in index.html

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const progress = document.getElementById('progress');
const currTime = document.getElementById('currTime');
const totTime = document.getElementById('totTime');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function formatTime(s) {
  if (isNaN(s)) return '00:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

audio.addEventListener('loadedmetadata', () => {
  totTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const pct = (audio.currentTime / audio.duration) * 100 || 0;
  progress.value = pct;
  currTime.textContent = formatTime(audio.currentTime);
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    audio.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
});

progress.addEventListener('input', (e) => {
  const pct = e.target.value;
  if (!isNaN(audio.duration)) {
    audio.currentTime = (pct / 100) * audio.duration;
  }
});

// prev/next are placeholders for now
prevBtn.addEventListener('click', () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});
nextBtn.addEventListener('click', () => {
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
});
