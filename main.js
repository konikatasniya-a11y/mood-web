 const hero= document.querySelector('.hero-section');

 const images= [
  '/images/calmban.png',
  '/images/Focus-Mood.png',
  '/images/Happy-Mood.png',
  '/images/Night-Mood.jpg'
 ];
  let current=0;

  hero.style.backgroundImage= `url(${images[current]})`;
  setInterval(()=> {
    current= (current+1) % images.length;
    hero.style.backgroundImage= `url(${images[current]})`;
  }, 4000);
 
 
 /* ---------------- MOOD SWITCHER ---------------- */
  const buttons = document.querySelectorAll('.region-btn');
  const items = document.querySelectorAll('.mood-item');
  const body = document.body;

  const moods = ['calm', 'focus', 'happy', 'night'];

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {

      // Active button
      buttons.forEach(b => b.classList.remove('active', 'btn-danger'));
      btn.classList.add('active', 'btn-danger');

      const region = btn.dataset.region;

      // Show / hide content
      items.forEach(item => {
        item.classList.toggle(
          'd-none',
          !(region === 'all' || item.dataset.region === region)
        );
      });

      // Body mood class
      // Background mood
moods.forEach(m => body.classList.remove(m));

if (region === 'night') {
  body.classList.add('night');
} else if (region === 'calm') {
  body.classList.add('calm');
} else if (region === 'focus') {
  body.classList.add('focus');
} else if (region === 'happy') {
  body.classList.add('happy');
}

      // Calm breathing control
      handleBreathing(region);
    });
  });

  /* ---------------- FOCUS TIMER ---------------- */
  let time = 1500;
  let defaultTime = 1500;
  let interval = null;

  function setTime(min) {
    clearInterval(interval);
    interval = null;
    defaultTime = min * 60;
    time = defaultTime;
    updateTimer();
  }

  function startTimer() {
    if (interval) return;
    document.getElementById('env-session').innerText = "⏱ Session Active";

    interval = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimer();
      } else {
        stopTimer();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    interval = null;
    time = defaultTime;
    updateTimer();
    document.getElementById('env-session').innerText = "⏱ Session Idle";
  }

  function updateTimer() {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    const timerEl = document.getElementById("timer");
    if (timerEl) timerEl.innerText = `${minutes}:${seconds}`;
  }

  /* ---------------- CALM BREATHING ---------------- */
  let breathInterval = null;
  const breathText = document.getElementById("breathText");
  const phases = ["Inhale", "Hold", "Exhale", "Hold"];
  let index = 0;

  function handleBreathing(mode) {
    if (!breathText) return;

    // Start breathing only in calm
    if (mode === "calm" && !breathInterval) {
      breathInterval = setInterval(() => {
        breathText.innerText = phases[index];
        index = (index + 1) % phases.length;
      }, 1500);
    }

    // Stop breathing when leaving calm
    if (mode !== "calm" && breathInterval) {
      clearInterval(breathInterval);
      breathInterval = null;
      breathText.innerText = "";
    }
  }

  
  document.querySelectorAll('.energy-btn').forEach(btn => {
    btn.addEventListener('click', () => {

      // Find parent card
      const card = btn.closest('.energy-indicator');

      // Target elements INSIDE this card only
      const fill = card.querySelector('.energy-fill');
      const text = card.querySelector('.energy-text');

      // Button active state
      card.querySelectorAll('.energy-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const level = btn.dataset.level;

      if (level === 'low') {
        fill.style.width = '30%';
        fill.style.boxShadow = '0 0 8px rgba(255,200,120,0.5)';
        text.innerText = 'Taking it slow is perfectly okay.';
      }

      if (level === 'medium') {
        fill.style.width = '60%';
        fill.style.boxShadow = '0 0 14px rgba(255,200,120,0.7)';
        text.innerText = 'A balanced and positive state.';
      }

      if (level === 'high') {
        fill.style.width = '100%';
        fill.style.boxShadow = '0 0 20px rgba(255,200,120,1)';
        text.innerText = 'You’re feeling bright and energized.';
      }
      if(level=='reset'){
        fill.style.width='0%';
        fill.style.boxShadow='0 0 20px rgba(255,200,120,1)';
        text.innerText= 'Select how you feel right now...';
      }
    });
    

  });