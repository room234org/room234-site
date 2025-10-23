function toggleMenu(){ document.querySelector('.nav').classList.toggle('open'); }

// --- Tab logic
document.addEventListener('click', (e)=>{
  if(!e.target.classList.contains('tab')) return;
  const tab = e.target.dataset.tab;
  document.querySelectorAll('.tab').forEach(t=>{
    t.classList.toggle('active', t.dataset.tab===tab);
    t.setAttribute('aria-selected', t.dataset.tab===tab ? 'true' : 'false');
  });
  document.querySelectorAll('.embed-panel').forEach(p=>p.classList.remove('show'));
  const panel = document.getElementById(`embed-${tab}`);
  if(panel) panel.classList.add('show');
});

// --- Sticky mini-player
(function initMiniPlayer(){
  const player = document.createElement('div');
  player.className = 'miniplayer';
  player.innerHTML = `
    <div class="miniplayer__art">
      <img src="assets/img/kb-ep-cover.jpg" alt="KB cover">
    </div>
    <div class="miniplayer__meta">
      <div class="miniplayer__title">Mentally (Preview)</div>
      <div class="miniplayer__sub">Kb — KB Tha Loverboy</div>
    </div>
    <div class="miniplayer__controls">
      <button class="miniplayer__btn" id="btn-mini-rewind" title="Back 10s">⟲</button>
      <button class="miniplayer__btn miniplayer__btn--gold" id="btn-mini-toggle" title="Play/Pause">▶</button>
      <button class="miniplayer__btn" id="btn-mini-ff" title="Forward 10s">⟳</button>
    </div>
    <div class="miniplayer__links">
      <a href="https://distrokid.com/hyperfollow/kb95/kb-tha-loverboy-ep/" target="_blank">Full EP →</a>
    </div>
  `;
  document.body.appendChild(player);

  const audio = new Audio('assets/audio/mentally-preview.mp3');
  const btnPlay = player.querySelector('#btn-mini-toggle');
  const btnBack = player.querySelector('#btn-mini-rewind');
  const btnFwd  = player.querySelector('#btn-mini-ff');

  btnPlay.addEventListener('click', async ()=>{
    try{
      if(audio.paused){ await audio.play(); btnPlay.textContent='⏸'; }
      else { audio.pause(); btnPlay.textContent='▶'; }
    }catch(e){ console.warn('Playback blocked until interaction'); }
  });
  btnBack.addEventListener('click', ()=> audio.currentTime = Math.max(0, audio.currentTime - 10));
  btnFwd.addEventListener('click',  ()=> audio.currentTime = Math.min(audio.duration||0, audio.currentTime + 10));
})();
