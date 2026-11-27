const LOGO='assets/logo.png',HERO='assets/hero.jpg';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const B=[
{id:1,n:'Ayesha Khan',c:'Islamabad',cat:'Developer',k:'collab',br:['React','Node.js'],nd:['Marketing','Branding'],v:'I build web apps and want a marketing partner to launch a study-group app for students. Equal credit, no money involved.'},
{id:2,n:'Hamza Ali',c:'Lahore',cat:'Marketer',k:'collab',br:['Marketing','Sales'],nd:['React','Python'],v:'I run campaigns for small shops and want a developer to build an inventory app with me. Both names on the project.'},
{id:3,n:'Sana Malik',c:'Rawalpindi',cat:'Idea Owner',k:'collab',br:['Research','Branding'],nd:['AI/ML','Python'],v:'I have an idea for an Urdu handwriting reader and need an AI/ML collaborator to build it as equal partners.'},
{id:4,n:'Bilal Ahmed',c:'Karachi',cat:'Business Owner',k:'paid',pr:'Rs 25,000',br:['Sales'],nd:['React','Node.js'],v:'I run a tailoring business and want an ordering website built for me. I have no time to learn coding and will pay for it.'},
{id:5,n:'Mariam Raza',c:'Islamabad',cat:'QA Tester',k:'paid',pr:'Rs 5,000',br:['Testing','Python'],nd:['Marketing'],v:'I test student and startup projects: a bug report, security basics and written feedback with fixes listed.'},
{id:6,n:'Usman Tariq',c:'Lahore',cat:'Marketer',k:'paid',pr:'Rs 8,000',br:['Marketing','Branding'],nd:['Python'],v:'I write launch posts and set up your first social media plan for a project that is ready to go live.'},
{id:7,n:'Fatima Noor',c:'Karachi',cat:'Designer',k:'collab',br:['Figma','Branding'],nd:['Flutter','Node.js'],v:'Designer looking for a developer to build a crop-price app for farmers. Equal credit for both of us.'},
{id:8,n:'Zain Shah',c:'Rawalpindi',cat:'Developer',k:'paid',pr:'Rs 6,000',br:['Flutter'],nd:['Testing'],v:'I need someone to test and correct my final-year project before the demo. Paying for a bug report and fixes.'},
{id:9,n:'Hira Imran',c:'Lahore',cat:'Developer',k:'paid',pr:'Rs 10,000',br:['Python','React'],nd:['Marketing','Sales'],v:'I built a recipe app and need someone to run its launch marketing. Paying per campaign.'}];
const me={name:'',city:'Islamabad',br:['React','Node.js','Python'],nd:['Marketing','AI/ML'],v:''};
const CITIES=['Lahore','Islamabad','Karachi','Rawalpindi'],TAGS=['React','Node.js','Python','Flutter','AI/ML','Figma','Marketing','Branding','Sales','Testing','Research'];
const FIL=['All Builders','Free Collabs','Paid Help','Same City'];
let fil='All Builders',q='',cur=null,anim=false,dcity='All cities',dskill='',dsort='match';const chats=[],th={},ag={};
const col=id=>id%2?'var(--mint)':'var(--amber)';
const ini=n=>(n||'Y').trim()[0].toUpperCase();
const score=b=>Math.min(99,40+16*(b.br.filter(t=>me.nd.includes(t)).length+b.nd.filter(t=>me.br.includes(t)).length)+(b.c===me.city?12:0));
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const match=b=>(b.n+' '+b.cat+' '+b.v+' '+b.br+' '+b.nd+' '+b.c+' '+(b.k==='paid'?'paid':'free collab')).toLowerCase().includes(q.trim().toLowerCase());
function list(){return B.filter(b=>fil==='All Builders'||(fil==='Same City'?b.c===me.city:fil==='Free Collabs'?b.k==='collab':b.k==='paid')).filter(match).sort((a,b)=>score(b)-score(a))}
const tg=(a,c)=>a.map(t=>`<span class="pill ${c}">${t}</span>`).join('');
const card=(b,i=0)=>`<article class="card${anim?' in':''}" style="--i:${i}"><div class="top"><div class="av" style="background:${col(b.id)};width:56px;height:56px">${ini(b.n)}</div><div class="meta"><span class="city">${b.c}</span><span class="match">${score(b)}% Match</span></div></div><div><b>${b.n}</b><div class="mut" style="font-size:14px">${b.cat}</div></div><span class="kind ${b.k==='paid'?'paid':'free'}">${b.k==='paid'?'Paid: '+b.pr:'Free collab, credit shared'}</span><div class="q">“${b.v}”</div><div class="tags">${tg(b.br,'t-b')}${tg(b.nd,'t-n')}</div><button class="btn" data-chat="${b.id}">${b.k==='paid'?'Discuss this job':'Connect &amp; Build'}</button></article>`;
const bar=()=>`<div class="filters"><input data-q placeholder="Search builders, skills or cities" value="${esc(q)}" aria-label="Search">${FIL.map(f=>`<button class="pill ${f===fil?'on':''}" data-f="${f}">${f}</button>`).join('')}</div>`;
function render(keepFocus){
 $$('[data-q]').forEach(i=>{if(document.activeElement!==i&&i.value!==q)i.value=q});
 $$('[data-bar]').forEach(e=>{if(!e.firstChild||!keepFocus)e.innerHTML=bar();else $$('[data-f]',e).forEach(p=>p.classList.toggle('on',p.dataset.f===fil))});
 const L=list(),sq=q.trim();
 $('#res').hidden=!sq;$('#homemain').hidden=!!sq;
 if(sq){$('#rt').textContent=L.length?'Results for “'+sq+'” ('+L.length+')':'';$('#resg').innerHTML=L.length?L.map(card).join(''):`<div class="panel" style="grid-column:1/-1;text-align:center"><b>No builders found for “${esc(sq)}”</b><p class="mut">Try a skill like React or Marketing, a city like Lahore, or clear the search.</p><button class="btn ghost" data-clear="1">Clear search</button></div>`}
 $('#top').innerHTML=L.slice(0,3).map(card).join('')||'<p class="mut">No builders match. Clear the search or pick another filter.</p>';
 const D=B.filter(b=>(dcity==='All cities'||b.c===dcity)&&(!dskill||b.br.includes(dskill))&&match(b)).sort((a,b)=>dsort==='name'?a.n.localeCompare(b.n):dsort==='city'?a.c.localeCompare(b.c):score(b)-score(a));
 $('#all').innerHTML=D.map(card).join('')||'<p class="mut">No builders found. Try another search, city or skill.</p>';
 $('#dcount').textContent=D.length+(D.length===1?' builder found':' builders found');
 $('#dcity').innerHTML=['All cities',...CITIES].map(c=>`<button class="pill ${c===dcity?'on':''}" data-dc="${c}">${c}</button>`).join('');
 $('#dskill').innerHTML=['Any skill',...TAGS].map(t=>`<button class="pill ${(t==='Any skill'?!dskill:t===dskill)?'on':''}" data-ds="${t}">${t}</button>`).join('');
 const near=B.filter(b=>b.c===me.city);
 $('#near').innerHTML=near.map(b=>`<div class="near"><span class="av" style="background:${col(b.id)}">${ini(b.n)}</span><span style="flex:1"><b>${b.n}</b><br><span class="mut" style="font-size:13px">${b.cat}</span></span><button class="pill" data-chat="${b.id}">Message</button></div>`).join('')||'<p class="mut">No builders in your city yet. Open Discover to see everyone.</p>';
 const pts=[me.name,me.v,me.br.length,me.nd.length].filter(Boolean).length;
 $('#meter').style.width=pts*25+'%';
 $('#mtxt').textContent=pts===4?'Your profile is complete.':'Add '+[!me.name&&'your name',!me.v&&'a project vision',!me.br.length&&'skills you bring',!me.nd.length&&'skills you need'].filter(Boolean).join(', ')+' to get better matches.';
 $('#ideas').innerHTML=B.slice(0,4).map(b=>`<article class="card"><b>${b.v}</b><div class="mut" style="font-size:14px">by ${b.n} in ${b.c}</div><div class="tags"><span class="mut" style="font-size:14px">Looking for</span>${tg(b.nd,'t-n')}</div><button class="btn ghost" data-chat="${b.id}">Message ${b.n.split(' ')[0]}</button></article>`).join('');
 avs();
}
function chips(el,key,cls){el.innerHTML=TAGS.map(t=>`<button class="pill sel ${me[key].includes(t)?cls:''}" data-t="${t}" data-k="${key}" data-c="${cls}">${t}</button>`).join('')}
function avs(){for(const el of [$('#navav'),$('#p-prev')]){el.textContent=me.pic?'':ini(me.name);el.style.backgroundImage=me.pic?`url("${me.pic}")`:''}}
function setup(){const s=$('#p-city');s.innerHTML=CITIES.map(c=>`<option ${c===me.city?'selected':''}>${c}</option>`).join('');$('#p-name').value=me.name;$('#p-v').value=me.v;chips($('#p-b'),'br','b');chips($('#p-n'),'nd','n')}
function agree(b){const paid=b.k==='paid',a=ag[cur]||0,S=paid?['Offer sent','Payment held safely','Work delivered','Payment released']:['Draft agreement','You agreed','Both agreed, credit recorded'],T=paid?['Fund payment','Confirm delivery','Release payment']:['Agree to credit terms'],done=a>=S.length-1,wait=!paid&&a===1;
$('#agree').innerHTML=`<div class="ag"><b>${paid?'Paid job, '+b.pr:'Free collaboration, shared credit'}</b><p class="mut">${paid?'Payment is held and only released after you confirm the work. Prototype only: no real money moves.':'Both names appear on the project page and README. Neither partner may publish or launch it without crediting the other. Prototype only: nothing is stored yet.'}</p><div>${S.map((x,i)=>`<span class="st ${i<=a?'done':''}">${x}</span>`).join('')}</div>${done?'<span class="lnk">Complete and recorded</span>':wait?'<span class="mut">Waiting for your partner to agree...</span>':`<button class="btn" data-ag="1">${T[a]}</button>`}</div>`}
function msgs(){
 $('#clist').innerHTML=chats.length?chats.map(id=>{const b=B.find(x=>x.id===id);return `<button class="li ${id===cur?'on':''}" data-open="${id}"><span class="av" style="background:${col(id)}">${ini(b.n)}</span><span><b>${b.n}</b><br><span class="mut" style="font-size:13px">${b.c}</span></span></button>`}).join(''):'<p class="empty">No chats yet. Press Connect &amp; Build on a profile to start one.</p>';
 const m=$('#msgs'),h=$('#thead');m.innerHTML='';
 if(!cur){h.innerHTML='';$('#agree').innerHTML='';m.innerHTML='<p class="empty">Pick a conversation to start talking.</p>';return}
 const b=B.find(x=>x.id===cur);h.innerHTML=`<span class="av" style="background:${col(cur)}">${ini(b.n)}</span><b>${b.n}</b><span class="match" style="margin-left:auto">${score(b)}% Match</span>`;
 agree(b);(th[cur]||[]).forEach(x=>{const d=document.createElement('div');d.className='m'+(x.me?' me':'');d.textContent=x.t;m.appendChild(d)});m.scrollTop=m.scrollHeight}
function open(id){if(!chats.includes(id)){chats.push(id);th[id]=[{me:false,t:B.find(x=>x.id===id).k==='paid'?'Hi! Happy to talk about the paid job. Please share the details first.':'Hi! We match on '+score(B.find(x=>x.id===id))+'%. Want to build this together, with shared credit?'}]}cur=id;location.hash='messages';msgs()}
function send(){const i=$('#mi'),t=i.value.trim();if(!t||!cur)return;const id=cur;th[id].push({me:true,t});i.value='';msgs();setTimeout(()=>{th[id].push({me:false,t:'Sounds good. Want to hop on a call this week?'});if(cur===id)msgs()},900)}
document.addEventListener('click',e=>{
 const f=e.target.closest('[data-f]'),c=e.target.closest('[data-chat]'),t=e.target.closest('[data-t]'),o=e.target.closest('[data-open]'),dc=e.target.closest('[data-dc]'),ds=e.target.closest('[data-ds]');
 if(dc){dcity=dc.dataset.dc;anim=true;render();anim=false}
 if(e.target.closest('[data-clear]')){q='';render()}
 const k=e.target.closest('a[href^="#"]');if(k&&location.hash.length>1&&k.getAttribute('href')===location.hash){e.preventDefault();scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}
 const g=e.target.closest('[data-ag]');if(g&&cur){const id=cur;ag[id]=(ag[id]||0)+1;msgs();if(B.find(x=>x.id===id).k!=='paid'&&ag[id]===1)setTimeout(()=>{ag[id]=2;if(cur===id)msgs()},1000)}
 if(ds){dskill=ds.dataset.ds==='Any skill'?'':ds.dataset.ds;anim=true;render();anim=false}
 if(f){fil=f.dataset.f;render(true)}
 if(c)open(+c.dataset.chat);
 if(o){cur=+o.dataset.open;msgs()}
 if(t){const a=me[t.dataset.k],x=t.dataset.t,i=a.indexOf(x);i<0?a.push(x):a.splice(i,1);t.classList.toggle(t.dataset.c,i<0)}
});
document.addEventListener('input',e=>{if(e.target.matches('[data-q]')){q=e.target.value;render(true)}});
$('#su-go').onclick=()=>{me.name=$('#su-name').value.trim();location.hash='setup'};
$('#p-save').onclick=()=>{me.name=$('#p-name').value.trim();me.city=$('#p-city').value;me.v=$('#p-v').value.trim();render();location.hash='home'};
$('#p-pic').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{me.pic=r.result;avs()};r.readAsDataURL(f)};
$('#navsearch').onclick=()=>{if(location.hash!=='#home'&&location.hash!=='#discover')location.hash='home';setTimeout(()=>{const i=$$('[data-q]').find(x=>x.offsetParent);if(i){i.focus();i.scrollIntoView({block:'center'})}},80)};
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('[data-q]')){e.preventDefault();q=e.target.value;render(true);const t=$('#res:not([hidden])')||$('#all');t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'})}});
$('#dsort').onchange=e=>{dsort=e.target.value;anim=true;render();anim=false};$('#ms').onclick=send;$('#mi').addEventListener('keydown',e=>{if(e.key==='Enter')send()});
function route(){
 let h=location.hash.slice(1)||'loading';if(!$(`[data-v="${h}"]`))h='landing';
 $$('[data-v]').forEach(v=>v.hidden=v.dataset.v!==h);
 const bare=['loading','login','signup'].includes(h);$('nav').hidden=bare;$('footer').hidden=bare;
 $$('nav .links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+h));$('#navav').classList.toggle('on',h==='setup');
 if(h==='setup')setup();if(h==='messages')msgs();const sv=$(`[data-v="${h}"]`);sv.classList.remove('enter');void sv.offsetWidth;sv.classList.add('enter');anim=true;render();anim=false;scrollTo(0,0);
 if(h==='loading')setTimeout(()=>{if(!location.hash||location.hash==='#loading')location.hash='landing'},1800)}
$$('img[data-logo]').forEach(i=>i.src=LOGO);$('img[data-hero]').src=HERO;
addEventListener('hashchange',route);route();
/* faint matrix rain */
(function(){const c=$('#rain'),x=c.getContext('2d');if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;let d=[];
function fit(){c.width=innerWidth;c.height=innerHeight;d=Array(Math.ceil(c.width/18)).fill(0).map(()=>Math.random()*50)}fit();addEventListener('resize',fit);
setInterval(()=>{x.fillStyle='rgba(10,14,23,.12)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#10B981';x.font='14px monospace';
d.forEach((y,i)=>{x.fillText('01{}<>/;'[Math.floor(Math.random()*8)],i*18,y*16);d[i]=y*16>c.height&&Math.random()>.97?0:y+1})},90)})();