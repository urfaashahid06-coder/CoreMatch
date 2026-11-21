const LOGO='assets/logo.png',HERO='assets/hero.jpg';
    const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
        const B=[
        {id:1,n:'Ayesha Khan',c:'Islamabad',cat:'UI/UX Designers',br:['Figma','React'],nd:['Python','Node.js'],v:'A study-group app that pairs students by weak and strong subjects.'},
        {id:2,n:'Hamza Ali',c:'Lahore',cat:'Developers',br:['Python','SQL'],nd:['Figma','React'],v:'Inventory tracker for small shops that works offline.'},
        {id:3,n:'Sana Malik',c:'Rawalpindi',cat:'AI/ML',br:['Python','AI/ML'],nd:['React','Figma'],v:'Urdu handwriting reader for school notes.'},
        {id:4,n:'Bilal Ahmed',c:'Karachi',cat:'Developers',br:['Node.js','Next.js'],nd:['AI/ML','Figma'],v:'Freelancer invoicing with automatic reminders.'},
        {id:5,n:'Mariam Raza',c:'Islamabad',cat:'Developers',br:['C++','Unity'],nd:['Figma','Python'],v:'3D puzzle game built around Pakistani folk tales.'},
        {id:6,n:'Usman Tariq',c:'Lahore',cat:'AI/ML',br:['AI/ML','Python'],nd:['Next.js','Figma'],v:'Resume reviewer that turns rough ideas into tech stacks.'},
        {id:7,n:'Fatima Noor',c:'Karachi',cat:'UI/UX Designers',br:['Figma'],nd:['Flutter','Node.js'],v:'Mobile app for local farmers to compare crop prices.'},
        {id:8,n:'Zain Shah',c:'Rawalpindi',cat:'Developers',br:['Flutter','SQL'],nd:['AI/ML','Figma'],v:'Carpool planner for university campuses.'}];
    const me={name:'',city:'Islamabad',br:['React','Figma'],nd:['Python','AI/ML'],v:''};
    const CITIES=['Lahore','Islamabad','Karachi','Rawalpindi'],TAGS=['React','Next.js','Python','C++','Figma','AI/ML','Node.js','Unity','SQL','Flutter'];
    const FIL=['All Builders','Developers','UI/UX Designers','AI/ML','Same City'];
    let fil='All Builders',q='',cur=null,anim=false,dcity='All cities',dskill='',dsort='match';const chats=[],th={};
    const col=id=>id%2?'var(--mint)':'var(--amber)';
    const ini=n=>(n||'Y').trim()[0].toUpperCase();
    const score=b=>Math.min(99,40+16*(b.br.filter(t=>me.nd.includes(t)).length+b.nd.filter(t=>me.br.includes(t)).length)+(b.c===me.city?12:0));
    function list(){return B.filter(b=>fil==='All Builders'||(fil==='Same City'?b.c===me.city:b.cat===fil)).filter(b=>(b.n+b.v+b.br+b.nd+b.c).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>score(b)-score(a))}
    const tg=(a,c)=>a.map(t=>`<span class="pill ${c}">${t}</span>`).join('');
    const card=(b,i=0)=>`<article class="card${anim?' in':''}" style="--i:${i}"><div class="top"><div class="av" style="background:${col(b.id)};width:56px;height:56px">${ini(b.n)}</div><div class="meta"><span class="city">${b.c}</span><span class="match">${score(b)}% Match</span></div></div><div><b>${b.n}</b><div class="mut" style="font-size:14px">${b.cat}</div></div><div class="q">“${b.v}”</div><div class="tags">${tg(b.br,'t-b')}${tg(b.nd,'t-n')}</div><button class="btn" data-chat="${b.id}">Connect &amp; Build</button></article>`;
    const bar=()=>`<div class="filters"><input data-q placeholder="Search builders, skills or cities" value="${q.replace(/"/g,'&quot;')}" aria-label="Search">${FIL.map(f=>`<button class="pill ${f===fil?'on':''}" data-f="${f}">${f}</button>`).join('')}</div>`;
        function render(keepFocus){
        $$('[data-bar]').forEach(e=>{if(!e.firstChild||!keepFocus)e.innerHTML=bar();else $$('[data-f]',e).forEach(p=>p.classList.toggle('on',p.dataset.f===fil))});
        const L=list();
        $('#top').innerHTML=L.slice(0,3).map(card).join('')||'<p class="mut">No builders match. Clear the search or pick another filter.</p>';
        const D=B.filter(b=>(dcity==='All cities'||b.c===dcity)&&(!dskill||b.br.includes(dskill))).sort((a,b)=>dsort==='name'?a.n.localeCompare(b.n):dsort==='city'?a.c.localeCompare(b.c):score(b)-score(a));
        $('#all').innerHTML=D.map(card).join('')||'<p class="mut">No builders match. Try another city or skill.</p>';
        $('#dcount').textContent=D.length+(D.length===1?' builder found':' builders found');
        $('#dcity').innerHTML=['All cities',...CITIES].map(c=>`<button class="pill ${c===dcity?'on':''}" data-dc="${c}">${c}</button>`).join('');
        $('#dskill').innerHTML=['Any skill',...TAGS].map(t=>`<button class="pill ${(t==='Any skill'?!dskill:t===dskill)?'on':''}" data-ds="${t}">${t}</button>`).join('');
        const near=B.filter(b=>b.c===me.city);
        $('#near').innerHTML=near.map(b=>`<div class="near"><span class="av" style="background:${col(b.id)}">${ini(b.n)}</span><span style="flex:1"><b>${b.n}</b><br><span class="mut" style="font-size:13px">${b.cat}</span></span><button class="pill" data-chat="${b.id}">Message</button></div>`).join('')||'<p class="mut">No builders in your city yet. Open Discover to see everyone.</p>';
        const pts=[me.name,me.v,me.br.length,me.nd.length].filter(Boolean).length;
        $('#meter').style.width=pts*25+'%';
        $('#mtxt').textContent=pts===4?'Your profile is complete.':'Add '+[!me.name&&'your name',!me.v&&'a project vision',!me.br.length&&'skills you bring',!me.nd.length&&'skills you need'].filter(Boolean).join(', ')+' to get better matches.';
        $('#ideas').innerHTML=B.slice(0,4).map(b=>`<article class="card"><b>${b.v}</b><div class="mut" style="font-size:14px">by ${b.n} in ${b.c}</div><div class="tags"><span class="mut" style="font-size:14px">Looking for</span>${tg(b.nd,'t-n')}</div><button class="btn ghost" data-chat="${b.id}">Message ${b.n.split(' ')[0]}</button></article>`).join('');
        $('#navav').textContent=ini(me.name);
        }
    function chips(el,key,cls){el.innerHTML=TAGS.map(t=>`<button class="pill sel ${me[key].includes(t)?cls:''}" data-t="${t}" data-k="${key}" data-c="${cls}">${t}</button>`).join('')}
    function setup(){const s=$('#p-city');s.innerHTML=CITIES.map(c=>`<option ${c===me.city?'selected':''}>${c}</option>`).join('');$('#p-name').value=me.name;$('#p-v').value=me.v;chips($('#p-b'),'br','b');chips($('#p-n'),'nd','n')}
    function msgs(){
    $('#clist').innerHTML=chats.length?chats.map(id=>{const b=B.find(x=>x.id===id);return `<button class="li ${id===cur?'on':''}" data-open="${id}"><span class="av" style="background:${col(id)}">${ini(b.n)}</span><span><b>${b.n}</b><br><span class="mut" style="font-size:13px">${b.c}</span></span></button>`}).join(''):'<p class="empty">No chats yet. Press Connect &amp; Build on a profile to start one.</p>';
    const m=$('#msgs'),h=$('#thead');m.innerHTML='';
    if(!cur){h.innerHTML='';m.innerHTML='<p class="empty">Pick a conversation to start talking.</p>';return}
    const b=B.find(x=>x.id===cur);h.innerHTML=`<span class="av" style="background:${col(cur)}">${ini(b.n)}</span><b>${b.n}</b><span class="match" style="margin-left:auto">${score(b)}% Match</span>`;
    (th[cur]||[]).forEach(x=>{const d=document.createElement('div');d.className='m'+(x.me?' me':'');d.textContent=x.t;m.appendChild(d)});m.scrollTop=m.scrollHeight}
    function open(id){if(!chats.includes(id)){chats.push(id);th[id]=[{me:false,t:'Hi! I saw we match on '+score(B.find(x=>x.id===id))+'%. What are you building?'}]}cur=id;location.hash='messages';msgs()}
    function send(){const i=$('#mi'),t=i.value.trim();if(!t||!cur)return;const id=cur;th[id].push({me:true,t});i.value='';msgs();setTimeout(()=>{th[id].push({me:false,t:'Sounds good. Want to hop on a call this week?'});if(cur===id)msgs()},900)}
    document.addEventListener('click',e=>{
    const f=e.target.closest('[data-f]'),c=e.target.closest('[data-chat]'),t=e.target.closest('[data-t]'),o=e.target.closest('[data-open]'),dc=e.target.closest('[data-dc]'),ds=e.target.closest('[data-ds]');
    if(dc){dcity=dc.dataset.dc;anim=true;render();anim=false}
    if(ds){dskill=ds.dataset.ds==='Any skill'?'':ds.dataset.ds;anim=true;render();anim=false}
    if(f){fil=f.dataset.f;render(true)}
    if(c)open(+c.dataset.chat);
    if(o){cur=+o.dataset.open;msgs()}
    if(t){const a=me[t.dataset.k],x=t.dataset.t,i=a.indexOf(x);i<0?a.push(x):a.splice(i,1);t.classList.toggle(t.dataset.c,i<0)}
    });
    document.addEventListener('input',e=>{if(e.target.matches('[data-q]')){q=e.target.value;render(true)}});
    $('#su-go').onclick=()=>{me.name=$('#su-name').value.trim();location.hash='setup'};
    $('#p-save').onclick=()=>{me.name=$('#p-name').value.trim();me.city=$('#p-city').value;me.v=$('#p-v').value.trim();render();location.hash='home'};
    $('#dsort').onchange=e=>{dsort=e.target.value;anim=true;render();anim=false};$('#ms').onclick=send;$('#mi').addEventListener('keydown',e=>{if(e.key==='Enter')send()});
    function route(){
    let h=location.hash.slice(1)||'loading';if(!$(`[data-v="${h}"]`))h='landing';
    $$('[data-v]').forEach(v=>v.hidden=v.dataset.v!==h);
    const bare=['loading','login','signup'].includes(h);$('nav').hidden=bare;$('footer').hidden=bare;
    $$('nav .links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+h));
    if(h==='setup')setup();if(h==='messages')msgs();const sv=$(`[data-v="${h}"]`);sv.classList.remove('enter');void sv.offsetWidth;sv.classList.add('enter');anim=true;render();anim=false;scrollTo(0,0);
    if(h==='loading')setTimeout(()=>{if(!location.hash||location.hash==='#loading')location.hash='landing'},1800)}
    $$('img[data-logo]').forEach(i=>i.src=LOGO);$('img[data-hero]').src=HERO;
    addEventListener('hashchange',route);route();
    /* faint matrix rain */
    (function(){const c=$('#rain'),x=c.getContext('2d');if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;let d=[];
    function fit(){c.width=innerWidth;c.height=innerHeight;d=Array(Math.ceil(c.width/18)).fill(0).map(()=>Math.random()*50)}fit();addEventListener('resize',fit);
    setInterval(()=>{x.fillStyle='rgba(10,14,23,.12)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#10B981';x.font='14px monospace';
    d.forEach((y,i)=>{x.fillText('01{}<>/;'[Math.floor(Math.random()*8)],i*18,y*16);d[i]=y*16>c.height&&Math.random()>.97?0:y+1})},90)})();
