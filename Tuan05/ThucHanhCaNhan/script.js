const root=document.documentElement,toggle=document.getElementById('themeToggle');
const saved=localStorage.getItem('htph-theme');root.dataset.theme=saved||'dark';
toggle.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('htph-theme',root.dataset.theme)});
function typer(el,words,speed=72,hold=1250){let wi=0,ci=0,del=false;function tick(){if(document.hidden){setTimeout(tick,700);return}const w=words[wi];el.textContent=w.slice(0,ci);if(!del&&ci<w.length){ci++;setTimeout(tick,speed)}else if(!del){del=true;setTimeout(tick,hold)}else if(ci>0){ci--;setTimeout(tick,36)}else{del=false;wi=(wi+1)%words.length;setTimeout(tick,260)}}tick()}
typer(document.getElementById('typingText'),['lập trình viên','người mê UI/UX','người xây công cụ']);
typer(document.getElementById('typingText2'),['trải nghiệm web đẹp','giao diện có cảm xúc','sản phẩm hữu ích'],62,1450);
function message(){const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
document.getElementById('sendButton').onclick=message;document.getElementById('sendButton2').onclick=message;
window.addEventListener('load',()=>document.getElementById('loader').classList.add('hide'),{once:true});
// Cursor-reactive liquid highlights, transform-only tilt on desktop.
if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.project,.about,.stats,.contact,.tech').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;card.style.setProperty('--mx',`${px*100}%`);card.style.setProperty('--my',`${py*100}%`);if(card.classList.contains('project')||card.classList.contains('about'))card.style.transform=`perspective(900px) translate3d(0,-10px,0) rotateX(${(0.5-py)*3.5}deg) rotateY(${(px-.5)*4.5}deg) scale(1.018)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
const mobile=matchMedia('(max-width:700px)').matches;
// Desktop wheel over the project rail becomes horizontal; touch keeps native swipe.
const rail=document.querySelector('.projects');
if(rail&&!mobile){rail.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();rail.scrollBy({left:e.deltaY*.9,behavior:'smooth'})}},{passive:false})}

// v8 — touch interactions without emulating desktop hover.
const coarsePointer=matchMedia('(hover:none), (pointer:coarse)').matches;
if(coarsePointer){
  const projectRail=document.querySelector('.projects');
  const projectCards=[...document.querySelectorAll('.project')];
  if(projectRail&&projectCards.length){
    let focusRAF=0;
    const updateProjectFocus=()=>{focusRAF=0;const rr=projectRail.getBoundingClientRect(),cx=rr.left+rr.width/2;let best=null,bestD=Infinity;for(const card of projectCards){const r=card.getBoundingClientRect(),d=Math.abs((r.left+r.width/2)-cx);if(d<bestD){bestD=d;best=card}}for(const card of projectCards)card.classList.toggle('is-focus',card===best)};
    projectRail.addEventListener('scroll',()=>{if(!focusRAF)focusRAF=requestAnimationFrame(updateProjectFocus)},{passive:true});
    updateProjectFocus();
  }
  const contact=document.querySelector('.contact');
  if(contact&&'IntersectionObserver'in window){new IntersectionObserver(([e])=>contact.classList.toggle('is-visible',e.isIntersecting),{threshold:.45}).observe(contact)}
  let lastY=scrollY,navRAF=0;const bar=document.querySelector('.topbar');
  addEventListener('scroll',()=>{if(navRAF)return;navRAF=requestAnimationFrame(()=>{const y=scrollY;bar?.classList.toggle('scrolled',y>70&&y>lastY);lastY=y;navRAF=0})},{passive:true});
}


// v12 — native reveal: zero external animation library and no per-frame animation loop.
(()=>{const els=[...document.querySelectorAll('.reveal')];if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('is-revealed'));return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});els.forEach(e=>io.observe(e))})();

// v12 — deterministic 5-item scroll spy. Uses a viewport anchor and a hard end-of-page contact rule.
(()=>{
 const links=[...document.querySelectorAll('.nav a[href^="#"]')];
 const sections=['home','projects','skills','about','contact'].map(id=>document.getElementById(id)).filter(Boolean);
 const map=new Map(links.map(a=>[a.hash.slice(1),a])); let raf=0,current='';
 function set(id){if(id===current||!map.has(id))return;current=id;links.forEach(a=>{const on=a===map.get(id);a.classList.toggle('active',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')})}
 function update(){raf=0;const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);if(scrollY>=max-24){set('contact');return}const navBottom=(document.querySelector('.topbar')?.getBoundingClientRect().bottom||64);const probe=navBottom+(innerHeight-navBottom)*.36;let chosen=sections[0]?.id||'home';for(const el of sections){const r=el.getBoundingClientRect();if(r.top<=probe)chosen=el.id;else break}set(chosen)}
 const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});links.forEach(a=>a.addEventListener('click',()=>set(a.hash.slice(1))));update();
})();
