(()=>{
const lessons=[
{label:'01 · BUTTON PRESS',title:'Sink, then <em>spring.</em>',chart:'SCALE',time:'TIME · 800 ms',metric:'SCALE 95% · SPRINGS BACK',why:'A button compresses under a press, then springs back to its original size. That tiny overshoot makes the control feel physical.',curve:'M12 48 L52 110 L92 110 Q130 110 150 55 T220 48 L328 48',point:[260,48]},
{label:'02 · PULL TO REFRESH',title:'Resist the <em>pull.</em>',chart:'LIST',time:'FINGER',metric:'FINGER 100% → LIST 35%',why:'The finger moves the full distance, but the list follows only 35%. Resistance gives the gesture a weighted, elastic feel.',curve:'M12 132 Q30 126 58 118 T125 103 T220 88 T328 76',point:[65,116]},
{label:'03 · ROLLING NUMBER',title:'Roll, don’t <em>jump.</em>',chart:'DIGIT POSITION',time:'TIME · 800 ms',metric:'DIGITS ROLL · 100 ms APART',why:'Each digit rolls into place instead of the entire number changing at once. Staggering the digits by 100ms creates a smooth count-up.',curve:'M12 126 C38 126 55 90 82 44 S160 48 220 48 L328 48',point:[18,124]},
{label:'04 · DRAG TO REORDER',title:'Lift, then make <em>room.</em>',chart:'LIFT',time:'TIME · 1200 ms',metric:'LIFT 105% · OTHERS SLIDE 200 ms',why:'The item being dragged lifts to 105%. The other rows slide over 200ms to make room, so the list feels responsive instead of jumpy.',curve:'M12 118 C38 118 42 28 75 40 S125 48 170 48 C195 48 195 132 232 130 S270 112 328 118',point:[300,115]},
{label:'05 · CARD EXPAND',title:'Fast, then <em>slow.</em>',chart:'SIZE',time:'TIME · 533 ms',metric:'EASE-OUT · 350 ms',why:'The card expands quickly at first, then eases into its final size. The easing gives the interaction a natural landing.',curve:'M12 132 C40 78 65 30 118 18 S220 14 328 14',point:[328,14]},
{label:'06 · SUCCESS',title:'Draw the <em>win.</em>',chart:'TICK DRAWN',time:'TIME · 600 ms',metric:'CIRCLE, THEN TICK · 470 ms',why:'The success ring draws first, then the check mark appears. The sequence makes completion feel clear and satisfying.',curve:'M12 132 L145 132 C185 132 192 130 212 94 S238 14 270 14 L328 14',point:[250,14]}
];
let current=0,dragIndex=-1,refreshTimer=null;
const $=id=>document.getElementById(id);
function demo(n){
 if(n===0)return `<button class="continue" id="pressButton">Continue</button>`;
 if(n===1)return `<div class="pull-wrap" id="pullWrap"><div class="pull-indicator" id="pullIndicator">↓ Pull to refresh</div><div class="pull-list" id="pullList">${[1,2,3].map(i=>`<div class="list-row"><span class="avatar"></span><span class="fake-lines"><i></i><i></i></span></div>`).join('')}</div></div>`;
 if(n===2)return `<div class="total-box"><div class="total-label">TOTAL</div><div class="amount" id="amount"><span class="currency">$</span><span class="digit">4</span><span class="digit">8</span><span class="digit">6</span></div></div>`;
 if(n===3)return `<div class="tasks" id="tasks">${['Groceries','Gym at 7','Read 20 pages'].map((x,i)=>`<div class="task" draggable="true" data-index="${i}"><span class="check"></span>${x}<span class="handle">☰</span></div>`).join('')}</div>`;
 if(n===4)return `<div class="travel-card" id="travelCard" role="button" tabindex="0" aria-expanded="false"><div class="travel-art"></div><div class="travel-name">Lisbon nights</div><div class="travel-detail">3 nights · Alfama, waterfront walks and late dinners. Tap to collapse.</div></div>`;
 return `<button class="success-btn" id="successButton" aria-label="Play success animation"><span class="success-circle" id="successCircle"><svg viewBox="0 0 50 50"><path d="M9 26 L20 37 L42 12"/></svg></span></button>`;
}
function render(){
 const l=lessons[current];$('progress').innerHTML=lessons.map((_,i)=>`<i class="${i<current?'done':i===current?'active':''}"></i>`).join('');
 $('kicker').textContent=l.label;$('title').innerHTML=l.title;$('chartTitle').textContent=l.chart;$('timeLabel').textContent=l.time;$('metric').textContent=l.metric;$('explanation').textContent=l.why;
 $('curve').setAttribute('d',l.curve);$('point').setAttribute('cx',l.point[0]);$('point').setAttribute('cy',l.point[1]);
 $('demoContent').innerHTML=demo(current);$('count').textContent=`0${current+1} / 06`;$('prev').disabled=current===0;$('next').textContent=current===5?'Replay study ↻':'Next detail →';
 bindDemo();
}
function bindDemo(){
 if(current===0){const b=$('pressButton');b.addEventListener('pointerdown',()=>b.classList.add('sink'));['pointerup','pointerleave','pointercancel'].forEach(e=>b.addEventListener(e,()=>{b.classList.remove('sink');b.classList.remove('spring');void b.offsetWidth;b.classList.add('spring')}));b.addEventListener('click',()=>{b.classList.remove('spring');void b.offsetWidth;b.classList.add('spring')})}
 if(current===1){
  const wrap=$('pullWrap'),list=$('pullList'),hint=$('pullIndicator');let startY=0,delta=0,active=false;
  wrap.addEventListener('touchstart',e=>{startY=e.touches[0].clientY;active=true},{passive:true});
  wrap.addEventListener('touchmove',e=>{if(!active)return;delta=Math.max(0,e.touches[0].clientY-startY);list.style.transform=`translateY(${Math.min(35,delta*.35)}px)`;hint.textContent=delta>55?'↻ Release to refresh':'↓ Pull to refresh';wrap.classList.toggle('pulling',delta>4)},{passive:true});
  wrap.addEventListener('touchend',()=>{active=false;if(delta>55)refresh();else list.style.transform='';delta=0;wrap.classList.remove('pulling')});
  let mouse=false,mouseY=0;wrap.addEventListener('pointerdown',e=>{mouse=true;mouseY=e.clientY});wrap.addEventListener('pointermove',e=>{if(!mouse)return;let d=Math.max(0,e.clientY-mouseY);list.style.transform=`translateY(${Math.min(35,d*.35)}px)`;hint.textContent=d>55?'↻ Release to refresh':'↓ Pull to refresh';wrap.classList.toggle('pulling',d>4)});wrap.addEventListener('pointerup',e=>{if(!mouse)return;mouse=false;let d=e.clientY-mouseY;if(d>55)refresh();else list.style.transform='';wrap.classList.remove('pulling')});
  function refresh(){wrap.classList.add('refreshing');hint.textContent='↻ Refreshing…';list.style.transform='translateY(12px)';setTimeout(()=>{wrap.classList.remove('refreshing');hint.textContent='✓ Updated';list.style.transform='';},650)}
 }
 if(current===2){let amount=486;const box=$('amount');box.addEventListener('click',()=>{amount=amount===486?529:486;const digits=[...box.querySelectorAll('.digit')];String(amount).split('').forEach((v,i)=>{digits[i].textContent=v;digits[i].classList.remove('roll');void digits[i].offsetWidth;setTimeout(()=>digits[i].classList.add('roll'),i*100)})});box.style.cursor='pointer'}
 if(current===3){
  const tasks=$('tasks');let dragging=null;
  tasks.querySelectorAll('.task').forEach(el=>{
   el.addEventListener('dragstart',e=>{dragging=el;el.classList.add('lifted');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',el.dataset.index)});
   el.addEventListener('dragend',()=>{el.classList.remove('lifted');tasks.querySelectorAll('.task').forEach(x=>x.classList.remove('drag-over'))});
   el.addEventListener('dragover',e=>{e.preventDefault();if(dragging&&dragging!==el){el.classList.add('drag-over')}});
   el.addEventListener('dragleave',()=>el.classList.remove('drag-over'));
   el.addEventListener('drop',e=>{e.preventDefault();if(!dragging||dragging===el)return;const rect=el.getBoundingClientRect(),after=e.clientY>rect.top+rect.height/2;tasks.insertBefore(dragging,after?el.nextSibling:el);el.classList.remove('drag-over')});
  });
  tasks.querySelectorAll('.task').forEach(el=>el.addEventListener('click',()=>{el.classList.add('lifted');setTimeout(()=>el.classList.remove('lifted'),350)}));
 }
 if(current===4){const card=$('travelCard');const toggle=()=>{card.classList.toggle('expanded');card.setAttribute('aria-expanded',card.classList.contains('expanded'))};card.addEventListener('click',toggle);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}})}
 if(current===5){const b=$('successButton');const play=()=>{const c=$('successCircle');c.classList.remove('draw','tick');void c.offsetWidth;c.classList.add('draw');setTimeout(()=>c.classList.add('tick'),10)};b.addEventListener('click',play);setTimeout(play,250)}
}
$('prev').addEventListener('click',()=>{if(current>0){current--;render()}});
$('next').addEventListener('click',()=>{current=current===5?0:current+1;render()});
render();
})();