/* Anuj Mathur portfolio. Vanilla JS. Edit the DATA block to update content. */
const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- DATA (from resume; edit freely) ---------- */
const SKILLS = {
  'Data & Machine Learning': [['Python'],['SQL'],['R'],['Pandas'],['NumPy'],['Matplotlib'],['Seaborn'],['Scikit-learn'],['EDA'],['Classification']],
  'AI & Automation': [['Generative AI'],['NLP'],['n8n','learn'],['AI Agents','learn'],['Workflow Automation','learn'],['APIs & Webhooks','learn'],['Zapier','learn']],
  'Tools': [['Streamlit'],['Jupyter'],['Power BI'],['Excel'],['OpenCV'],['GitHub'],['Canva']]
};
const PROJECTS = [
  {gh:'https://github.com/AnujMathur44/Laptop-Health-Checker',live:'',t:'Laptop Health Checker',c:'ml',s:'Built (add live link if deployed)',d:'ML tool that analyses laptop performance and predicts potential health issues.',f:['200+ samples processed','85% prediction accuracy','Streamlit diagnostics UI','Recommendations output'],k:['Python','Scikit-learn','Streamlit']},
  {gh:'https://github.com/AnujMathur44/Hotel_Booking_Analysis_AU',live:'',t:'Hotel Booking Analysis',c:'analytics',s:'Built',d:'Booking trend analysis and cancellation prediction.',f:['119,000+ records','~80% cancellation prediction','Data cleaning','Feature engineering','Visual insights'],k:['Python','Pandas','NumPy','Matplotlib','Seaborn','Scikit-learn']},
  {gh:'https://github.com/AnujMathur44/Sound-Script-',live:'',t:'Multilingual Voice Translator',c:'automation',s:'Built',d:'Converts speech or text into a target language and speaks the result.',f:['Speech recognition','Language translation','Text-to-speech audio'],k:['Python','SpeechRecognition','gTTS']},
  {gh:'',live:'',t:'Medicine Reminder System',c:'automation',s:'Built',d:'Python automation giving scheduled voice reminders for medicine intake.',f:['Scheduled voice reminders','Modular architecture','Error handling'],k:['Python','Scheduling','Automation']},
  {gh:'',live:'',t:'Lead Qualification Workflow',c:'automation',s:'Add real details once built',d:'Planned n8n workflow idea. Replace this text with your real project.',f:['Webhook trigger (planned)','AI step (planned)','CRM/API output (planned)'],k:['n8n','APIs']}
];
const EXPERIENCE = [
  ['Feb 2026 – May 2026','Admission Partner (IIT & IIM programmes), TimesPro','Counselled candidates and matched them to programmes; managed admissions and enrolments end to end.'],
  ['May 2025 – Jul 2025','Data Science training, AU Ignite Future Skills Academy','Python, SQL and ML; data cleaning and visualisation on real datasets; small classification and regression models; Power BI insights.']
];
const EDUCATION = [
  ['Ongoing','MCA, AI & Data Science','Poornima University, Jaipur'],
  ['2023 - 2026','BCA, AI & Data Science','Poornima University, Jaipur'],
  ['2023','Higher Secondary, Humanities (CBSE)','Kendriya Vidyalaya No 3, Jaipur']
];
const CERTS = [['Google','Google Ads Measurement Certification','2026'],['TimesPro','Gen AI Unlocked','2026'],['NPTEL','Research Methodology','2025'],['NPTEL','Employment Communication','2025'],['NPTEL','Emotional Intelligence','2024'],['HackerRank','Python','2024'],['Great Learning','Python for Data Science','2024'],['Great Learning','Introduction to R','2024'],['HP Life','Data Science and Analytics','2024']];

/* ---------- Hero workflow ---------- */
const NODES = [['⚡','Trigger',70,170],['⇄','Webhook',200,90],['✦','AI Agent',330,170],['▦','Data Processing',460,90],['➤','Output',580,170]];
const NS = 'http://www.w3.org/2000/svg';
(function flow(){
  const g = $('#nodes'), parts = $('#parts');
  NODES.slice(0,4).forEach(([i,l,x,y],n)=>{
    g.insertAdjacentHTML('beforeend',`<g class="node" transform="translate(${x-30} ${y-28})"><rect width="60" height="56" rx="14" style="--d:${n*1.25}s"/><text class="i" x="30" y="36">${i}</text><text class="l" x="30" y="76">${l}</text></g>`);
  });
  const [i,l,x,y] = NODES[4];
  g.insertAdjacentHTML('beforeend',`<g class="node" transform="translate(${x-30} ${y-28})"><rect width="60" height="56" rx="14" style="--d:5s"/><text class="i" x="30" y="36">${i}</text><text class="l" x="30" y="76">${l}</text></g>`);
  if (reduce) return;
  ['p1','p2','p3','p4'].forEach((p,n)=>{
    const c = document.createElementNS(NS,'circle');
    c.setAttribute('r',5); c.setAttribute('fill','#9679E8'); c.setAttribute('opacity',0);
    c.innerHTML = `<animateMotion dur="5s" begin="${n*1.25}s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.25;1" calcMode="linear"><mpath href="#${p}"/></animateMotion><animate attributeName="opacity" dur="5s" begin="${n*1.25}s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;.24;.26;1"/>`;
    parts.appendChild(c);
  });
})();

/* ---------- Skills ---------- */
let k = 0;
$('#skillGrid').innerHTML = Object.entries(SKILLS).map(([h,list])=>
  `<div class="skill glass tilt"><h3>${h}<em>${list.length}</em></h3><div class="chips stg">${list.map(([n,t])=>{const i=k++;
  return `<span class="chip ${t||''}" style="--i:${i%8};--d:${-(i%7)*.9}s;--u:${5+i%4}s"><i>${n.slice(0,2)}</i><span><b>${n}</b><small>${t?'Learning':'In use'}</small></span></span>`}).join('')}</div></div>`).join('');

/* ---------- Projects as a tree ---------- */
const CATS = {all:'All',ml:'Machine Learning',analytics:'Analytics',automation:'Automation'};
let cat = 'all', open = 0;
const tree = $('#tree');
const plinks = p => `<div class="plinks">${p.gh?`<a class="gh" href="${p.gh}" target="_blank" rel="noopener">GitHub repo</a>`:'<span class="gh off">GitHub link not added yet</span>'}${p.live?`<a class="gh" href="${p.live}" target="_blank" rel="noopener">Live demo</a>`:''}</div>`;
const leaves = (h, items, c) => `<div class="grp"><span>${h}</span>${items.map((x,n)=>`<div class="tn leaf ${c}" style="--d:${n*.07}s">${x}</div>`).join('')}</div>`;
function renderProjects(){
  const list = PROJECTS.filter(p=>cat==='all'||p.c===cat);
  if (!list.includes(PROJECTS[open])) open = PROJECTS.indexOf(list[0]);
  $('#filters').innerHTML = Object.entries(CATS).map(([v,l])=>`<button aria-pressed="${v===cat}" data-c="${v}">${l}</button>`).join('');
  $('#c0').innerHTML = `<div class="tn rootn"><b>Projects</b><small>${list.length} branches</small></div>`;
  $('#c1').innerHTML = list.map(p=>{const i=PROJECTS.indexOf(p);return `<button class="tn pn tilt" data-i="${i}" aria-pressed="${i===open}"><b>${p.t}</b><small>${CATS[p.c]} | ${p.s}</small></button>`}).join('');
  const p = PROJECTS[open];
  $('#c2').innerHTML = `<p class="lh">${p.d}</p>` + leaves('Features',p.f,'') + leaves('Technologies',p.k,'tech') + plinks(p);
  requestAnimationFrame(drawLinks); setTimeout(drawLinks,700);
}
function drawLinks(){
  const svg = $('#links'); svg.innerHTML = '';
  if (innerWidth < 860) return;
  const T = tree.getBoundingClientRect();
  svg.setAttribute('viewBox',`0 0 ${T.width} ${T.height}`);
  const pt = (el,right) => {const r = el.getBoundingClientRect(); return [(right?r.right:r.left)-T.left, r.top+r.height/2-T.top]};
  const link = (a,b,on) => {const [x1,y1]=pt(a,1),[x2,y2]=pt(b,0),m=(x2-x1)/2;
    svg.insertAdjacentHTML('beforeend',`<path class="${on?'on':''}" d="M${x1} ${y1}C${x1+m} ${y1} ${x2-m} ${y2} ${x2} ${y2}"/>`)};
  const root = $('.rootn');
  document.querySelectorAll('.pn').forEach(p=>link(root,p,p.getAttribute('aria-pressed')==='true'));
  const cur = $('.pn[aria-pressed=true]');
  document.querySelectorAll('.leaf').forEach(l=>link(cur,l,true));
}
document.addEventListener('click',e=>{
  const f = e.target.closest('[data-c]'), n = e.target.closest('.pn');
  if (f){cat=f.dataset.c;renderProjects()} if (n){open=+n.dataset.i;renderProjects()}
});
addEventListener('resize',drawLinks);
renderProjects();

/* ---------- Timeline, certs ---------- */
const tlHTML = a => a.map(([d,t,x])=>`<li><time>${d}</time><h3>${t}</h3><p>${x}</p></li>`).join('');
$('#expList').innerHTML = tlHTML(EXPERIENCE);
$('#eduList').innerHTML = tlHTML(EDUCATION);
let cf = 'All';
const seal = n => n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
function renderCerts(){
  $('#certFilters').innerHTML = ['All',...new Set(CERTS.map(c=>c[0]))].map(v=>`<button aria-pressed="${v===cf}" data-ci="${v}">${v}</button>`).join('');
  $('#certs').innerHTML = CERTS.filter(c=>cf==='All'||c[0]===cf).map(([i,t,y])=>`<article class="cert glass tilt"><div class="seal">${seal(i)}</div><div><b>${t}</b><small>${i}</small></div><time>${y}</time></article>`).join('')
   + (cf==='All'?'<article class="cert glass ph"><div class="seal">+</div><div><b>Smart India Hackathon / CodeAlpha</b><small>Placeholder: add verified details only</small></div></article>':'');
  stag($('#certs'));
}
document.addEventListener('click',e=>{const c=e.target.closest('[data-ci]');if(c){cf=c.dataset.ci;renderCerts()}});
renderCerts();

/* ---------- Nav, reveal, back-to-top ---------- */
const burger = $('#burger'), menu = $('#menu');
burger.onclick = () => burger.setAttribute('aria-expanded', menu.classList.toggle('open'));
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}});
const io = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('in'),io.unobserve(e.target))),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const up = $('#up');
addEventListener('scroll',()=>up.classList.toggle('show',scrollY>600),{passive:true});
up.onclick = () => scrollTo({top:0,behavior:reduce?'auto':'smooth'});
$('#yr').textContent = new Date().getFullYear();

/* ---------- Contact form ---------- */
/* A static site cannot send email. Create a free endpoint (Formspree, Web3Forms, Getform) and paste its URL here. */
const FORM_ENDPOINT = '';
const form = $('#form'), status = $('#status');
const rules = {name:v=>v.trim().length>1||'Enter your name.',email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||'Enter a valid email.',message:v=>v.trim().length>=10||'Write at least 10 characters.'};
form.addEventListener('submit',async e=>{
  e.preventDefault(); let ok = true;
  for (const [k,fn] of Object.entries(rules)){const el=form.elements[k],r=fn(el.value);el.nextElementSibling.textContent=r===true?'':r;if(r!==true)ok=false}
  if(!ok) return;
  if(!FORM_ENDPOINT){status.textContent='Form is not connected yet. Add a form service URL in script.js (see README).';return}
  try{const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
    status.textContent=r.ok?'Message sent. Thank you!':'Could not send. Please try again.';if(r.ok)form.reset()}
  catch{status.textContent='Network error. Please try again.'}
});

/* ---------- Polish: progress, active nav, typing, counters, marquee, tilt, cursor glow ---------- */
const prog = $('#prog');
addEventListener('scroll',()=>{prog.style.transform=`scaleX(${scrollY/(document.body.scrollHeight-innerHeight)})`},{passive:true});
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const so = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(x=>so.observe(x));
$('#mq').innerHTML = [...Object.values(SKILLS).flat(),...Object.values(SKILLS).flat()].map(([n])=>`<span>${n}</span>`).join('');
const roles = ['Python & ML models','n8n workflows','data pipelines','AI agents'], ty = $('#typed');
if (reduce) ty.textContent = roles[0]; else { let r=0,c=0,d=1;
  (function tick(){ty.textContent=roles[r].slice(0,c);c+=d;let w=d>0?70:35;
    if(c>roles[r].length){d=-1;w=1400}else if(c<0){d=1;r=(r+1)%roles.length;w=300}setTimeout(tick,w)})(); }
const co = new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
  const n=+e.target.dataset.n,sfx=e.target.dataset.s||'',t0=performance.now();
  (function f(t){const p=reduce?1:Math.min((t-t0)/1400,1);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString('en-IN')+(p===1?sfx:'');p<1&&requestAnimationFrame(f)})(t0)}));
document.querySelectorAll('[data-n]').forEach(x=>co.observe(x));
if (!reduce && matchMedia('(hover:hover)').matches){
  const g=$('#glow'); addEventListener('pointermove',e=>{g.style.transform=`translate(${e.clientX-250}px,${e.clientY-250}px)`;g.style.opacity=1});
  document.addEventListener('pointermove',e=>{const el=e.target.closest('.tilt,.skill,.cert');if(!el)return;const r=el.getBoundingClientRect();
    el.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*8+'deg');el.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*8+'deg')});
  document.addEventListener('pointerout',e=>{const el=e.target.closest('.tilt,.skill,.cert');el&&(el.style.setProperty('--rx','0deg'),el.style.setProperty('--ry','0deg'))});
}

/* ---------- Interaction extras: stagger, ripple, magnetic buttons, timeline line ---------- */
function stag(el){[...el.children].forEach((c,i)=>c.style.setProperty('--i',i))}
stag($('#expList'));stag($('#eduList'));
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b||reduce)return;const r=b.getBoundingClientRect(),s=document.createElement('span');
  s.className='rip';s.style.cssText=`left:${e.clientX-r.left}px;top:${e.clientY-r.top}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)});
if(!reduce&&matchMedia('(hover:hover)').matches){
  document.addEventListener('pointermove',e=>{const b=e.target.closest('.btn,.ico');if(!b)return;const r=b.getBoundingClientRect();
    b.style.translate=`${(e.clientX-r.left-r.width/2)*.18}px ${(e.clientY-r.top-r.height/2)*.25}px`});
  document.addEventListener('pointerout',e=>{const b=e.target.closest('.btn,.ico');b&&(b.style.translate='')});
}
addEventListener('scroll',()=>document.querySelectorAll('.timeline').forEach(tl=>{const r=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(1,(innerHeight*.7-r.top)/r.height)))}),{passive:true});