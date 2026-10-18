/* Body & Zunye site scripts */
/* ===== EDIT YOUR PRICES HERE (shared by Services cards and the Estimator) ===== */
var PRICES={
 items:[
  {id:'bot',icon:'🤖',label:'Discord bot',sub:'Commands, moderation, tickets',desc:'Moderation, tickets, music, economy and custom commands, built around your server.',feat:['Slash commands and buttons','Moderation and logging','Ticket and role systems','Optional 24/7 hosting'],one:60},
  {id:'plugin',icon:'⛏️',label:'Minecraft plugin',sub:'Java, Paper/Spigot',desc:'Custom gameplay, items, economy or minigames for your Minecraft server.',feat:['Paper / Spigot support','Configurable with YAML files','Permissions and commands','Clean, documented code'],one:80},
  {id:'skript',icon:'📜',label:'Skript',sub:'Server scripts and commands',desc:'Fast and affordable scripts when you do not need a full plugin.',feat:['Custom commands','Events and rewards','GUI menus','Easy for you to edit later'],one:30},
  {id:'mod',icon:'🧩',label:'Mod',sub:'Custom Minecraft mod',desc:'Custom blocks, items and mechanics for a modded game or server.',feat:['Fabric / Forge','Custom items and blocks','Server and client support','Tested before delivery'],one:150},
  {id:'site',icon:'🌐',label:'Website',sub:'Landing page or portfolio',desc:'Fast, responsive sites and landing pages, from a portfolio to a web app.',feat:['Mobile friendly','Modern design','Hosted setup help','Basic SEO'],one:100},
  {id:'host',icon:'☁️',label:'Bot hosting',sub:'We keep it online 24/7',desc:'We host and monitor your bot so it stays online.',feat:['24/7 uptime','Restarts and monitoring','Updates included','Cancel any time'],one:0,month:5}],
 cx:[{id:'s',label:'Simple',mult:1},{id:'m',label:'Standard',mult:1.6},{id:'a',label:'Advanced',mult:2.5}],
 range:0.25};
function eur(n){return '€'+Math.round(n).toLocaleString('en')}
/* ===== Discord live widget: set guildId (Server ID, widget enabled) OR keep the invite code ===== */
var DISCORD={guildId:'',invite:'hypedevs',url:'http://dsc.gg/hypedevs'};
var els=document.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')})}else{
var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}})},{threshold:.08});
els.forEach(function(e){io2.observe(e)})}
document.querySelectorAll('.card').forEach(function(c){c.addEventListener('pointermove',function(e){var b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)+'px');c.style.setProperty('--my',(e.clientY-b.top)+'px')})});
(function(){if(!document.getElementById('heroBox'))return;
/* ---------- 1) HERO BOX ---------- */
var SNIPPETS={
skript:`# Skript – /heal command
command /heal [<player>]:
    permission: server.heal
    trigger:
        set {_p} to arg-1 ? player
        heal {_p}
        send "&aYou were healed!" to {_p}`,
python:`# discord.py – slash command
@bot.tree.command(name="ping")
async def ping(interaction: discord.Interaction):
    ms = round(bot.latency * 1000)
    await interaction.response.send_message(
        f"Online, {ms} ms")`,
java:`// Paper plugin – welcome message
@EventHandler
public void onJoin(PlayerJoinEvent e) {
    Player p = e.getPlayer();
    p.sendMessage(Component.text(
        "Welcome, " + p.getName() + "!",
        NamedTextColor.AQUA));
}`};
var CHAT={"/ping":["Online, 42 ms."],"/roles":["Pick your roles below ⬇","✅ Developer  🎮 Gamer  📢 News"],"/ticket":["Ticket #0142 created. A staff member will be with you soon."]};
var tabs=[].slice.call(document.querySelectorAll('.tab')),code=document.getElementById('codeOut'),
codePane=document.getElementById('codePane'),chatPane=document.getElementById('chatPane'),log=document.getElementById('chatLog'),timer;
function styleTabs(sel){tabs.forEach(function(t){var on=t.dataset.tab===sel;t.setAttribute('aria-selected',on);t.className='tab rounded-md px-3 py-1 font-medium '+(on?'bg-brand/30 text-white':'text-slate-400 hover:text-white')})}
function typeCode(txt){clearInterval(timer);code.textContent='';var i=0,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 if(reduce){code.textContent=txt;return}
 timer=setInterval(function(){code.textContent=txt.slice(0,i+=3);if(i>=txt.length)clearInterval(timer)},14)}
function bubble(who,text,bot){var d=document.createElement('div');d.className='pop flex gap-3';
 var av=document.createElement('div');av.className='grid h-8 w-8 flex-none place-items-center rounded-full text-[11px] font-bold '+(bot?'bg-gradient-to-br from-brand to-brand-3 text-white':'bg-white/10 text-slate-300');av.textContent=bot?'B':'You';
 var b=document.createElement('div');var n=document.createElement('b');n.className='block text-[13px]';n.textContent=who;
 if(bot){var t=document.createElement('span');t.className='ml-1.5 rounded bg-brand px-1 text-[10px] font-bold text-white';t.textContent='BOT';n.appendChild(t)}
 var p=document.createElement('span');p.className='text-slate-400';p.textContent=text;b.append(n,p);d.append(av,b);log.appendChild(d);log.scrollTop=log.scrollHeight}
function runCmd(c){bubble('You',c,false);setTimeout(function(){CHAT[c].forEach(function(l,i){setTimeout(function(){bubble('YourBot',l,true)},i*350)})},450)}
function select(sel){styleTabs(sel);var chat=sel==='chat';codePane.style.display=chat?'none':'block';chatPane.style.display=chat?'flex':'none';
 if(chat){if(!log.children.length){bubble('You','Can someone set up reaction roles?',false);setTimeout(function(){bubble('YourBot','Done. Use /roles to pick yours.',true)},500)}}else typeCode(SNIPPETS[sel])}
tabs.forEach(function(t){t.addEventListener('click',function(){select(t.dataset.tab)})});
document.querySelectorAll('.cmd').forEach(function(b){b.addEventListener('click',function(){runCmd(b.dataset.cmd)})});
select('skript');


})();
(function(){if(!document.getElementById('projectGrid'))return;
/* ---------- 2) PORTFOLIO ---------- */
var PROJECTS=[
{name:'Project one',desc:'Moderation and ticket bot for a large community server.',tags:['Discord bot','Node.js'],verified:true,link:'https://github.com/',m:[['Servers',12],['Users',48000],['Uptime %',99.9]],wide:true},
{name:'Project two',desc:'Economy and shop plugin for a survival network.',tags:['Minecraft plugin','Java'],verified:true,link:'https://github.com/',m:[['Servers',3],['Players',1800],['Uptime %',99.5]]},
{name:'Project three',desc:'Landing page and dashboard for a gaming clan.',tags:['Website','JavaScript'],verified:false,link:'https://github.com/',m:[['Visits',9200],['Pages',6],['Score',98]]}];
var grid=document.getElementById('projectGrid');
PROJECTS.forEach(function(p,i){
 var a=document.createElement('article');a.className='glass group overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1.5 hover:border-brand-3/50 hover:shadow-[0_24px_50px_-24px_rgba(0,163,255,.7)] '+(p.wide?'md:col-span-2':'');
 var shot='<div class="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand/40 via-brand-2/20 to-brand-3/30"><!-- swap for: <img src="images/shot.jpg" alt="..." class="h-full w-full object-cover"> --><div class="absolute inset-4 rounded-xl border border-white/15 bg-black/20 backdrop-blur-sm"></div><span class="absolute left-7 top-7 text-xs font-mono text-white/70">screenshot '+(i+1)+'</span></div>';
 var tags=p.tags.map(function(t){return '<span class="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-300">'+t+'</span>'}).join('');
 var ver=p.verified?'<span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">✔ Verified project</span>':'';
 var met=p.m.map(function(x){return '<div><b class="count block text-xl font-extrabold" data-to="'+x[1]+'">0</b><span class="text-xs text-slate-400">'+x[0]+'</span></div>'}).join('');
 a.innerHTML=shot+'<div class="p-6"><div class="flex items-center justify-between gap-3"><h3 class="text-xl font-bold">'+p.name+'</h3>'+ver+'</div><p class="mt-2 text-slate-400">'+p.desc+'</p><div class="mt-3 flex flex-wrap gap-2">'+tags+'</div><div class="mt-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">'+met+'</div><a href="'+p.link+'" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-1 font-semibold text-brand-3 hover:underline">Live preview →</a></div>';
 grid.appendChild(a)});
function countUp(el){var to=parseFloat(el.dataset.to),dec=to%1?1:0,t0=performance.now();
 (function f(t){var k=Math.min((t-t0)/1200,1),v=to*(1-Math.pow(1-k,3));el.textContent=(dec?v.toFixed(1):Math.round(v).toLocaleString('en'));if(k<1)requestAnimationFrame(f)})(t0)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){countUp(e.target);io.unobserve(e.target)}})},{threshold:.5});
document.querySelectorAll('.count').forEach(function(c){io.observe(c)});


})();
(function(){if(!document.getElementById('optList'))return;
/* ---------- 3) ESTIMATOR (EDIT THESE PRICES) ---------- */

var sel={},cx='s',optList=document.getElementById('optList'),cxList=document.getElementById('cxList');
PRICES.items.forEach(function(it){var l=document.createElement('label');
 l.className='glass flex cursor-pointer items-start gap-3 rounded-2xl p-4 transition hover:border-brand-3/50 has-[:checked]:border-brand-3 has-[:checked]:bg-brand/20';
 l.innerHTML='<input type="checkbox" class="mt-1 h-4 w-4 accent-[#00a3ff]" value="'+it.id+'"><span><b class="block">'+it.label+'</b><span class="text-sm text-slate-400">'+it.sub+'</span></span>';
 l.querySelector('input').addEventListener('change',function(e){sel[it.id]=e.target.checked;calc()});optList.appendChild(l)});
PRICES.cx.forEach(function(c,i){var l=document.createElement('label');
 l.className='glass cursor-pointer rounded-2xl p-4 text-center font-semibold transition hover:border-brand-3/50 has-[:checked]:border-brand-3 has-[:checked]:bg-brand/20';
 l.innerHTML='<input type="radio" name="cx" class="sr-only" value="'+c.id+'"'+(i===0?' checked':'')+'>'+c.label;
 l.querySelector('input').addEventListener('change',function(){cx=c.id;calc()});cxList.appendChild(l)});
var lastSummary='';
function calc(){var mult=PRICES.cx.filter(function(c){return c.id===cx})[0].mult,one=0,mo=0,lines=[];
 PRICES.items.forEach(function(it){if(sel[it.id]){one+=it.one*mult;mo+=it.month||0;lines.push(it.label)}});
 var lo=one*(1-PRICES.range),hi=one*(1+PRICES.range);
 document.getElementById('total').textContent=one?eur(lo)+' – '+eur(hi):'€0';
 document.getElementById('monthly').textContent=mo?'+ '+eur(mo)+' / month hosting':'';
 var ul=document.getElementById('summary');ul.innerHTML='';
 lines.forEach(function(t){var li=document.createElement('li');li.textContent='✔ '+t;ul.appendChild(li)});
 if(!lines.length){var li=document.createElement('li');li.className='text-slate-500';li.textContent='Nothing selected yet';ul.appendChild(li)}
 lastSummary='Project estimate: '+(lines.join(', ')||'nothing selected')+' | '+PRICES.cx.filter(function(c){return c.id===cx})[0].label+' | '+(one?eur(lo)+'–'+eur(hi):'€0')+(mo?' + '+eur(mo)+'/month':'')}
document.getElementById('copyBtn').addEventListener('click',function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(lastSummary):Promise.reject()).then(function(){b.textContent='Copied ✔'},function(){b.textContent='Copy failed'});setTimeout(function(){b.textContent='Copy summary'},1800)});
calc();

})();
(function(){if(!document.getElementById('svcGrid'))return;
var g=document.getElementById('svcGrid');
PRICES.items.forEach(function(it,i){var a=document.createElement('article'),id='svc'+i;
 a.className='glass relative rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:border-brand-3/50 hover:shadow-[0_24px_50px_-24px_rgba(0,163,255,.7)]';
 var price=it.month?'From '+eur(it.month)+' / month':'From '+eur(it.one);
 a.innerHTML='<div class="flex items-start justify-between gap-3"><div class="grid h-12 w-12 place-items-center rounded-2xl bg-brand/20 text-2xl">'+it.icon+'</div><span class="rounded-full border border-brand-3/40 bg-brand/20 px-3 py-1 text-xs font-bold text-brand-3">'+price+'</span></div><h3 class="mt-4 text-xl font-bold">'+it.label+'</h3><p class="mt-1 text-slate-400">'+it.sub+'</p><button type="button" aria-expanded="false" aria-controls="'+id+'" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-3">Details <span class="chev transition">▾</span></button><div id="'+id+'" class="hidden pop mt-3 border-t border-white/10 pt-3 text-sm text-slate-300"><p class="mb-2">'+it.desc+'</p><ul class="space-y-1">'+it.feat.map(function(f){return '<li>✔ '+f+'</li>'}).join('')+'</ul></div>';
 var btn=a.querySelector('button'),box=a.querySelector('#'+id),ch=a.querySelector('.chev');
 btn.addEventListener('click',function(){var o=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',!o);box.classList.toggle('hidden',o);ch.style.transform=o?'':'rotate(180deg)'});
 g.appendChild(a)});
})();
(function(){if(!document.getElementById('testi'))return;
var T=[
{q:'Placeholder quote: replace this with a real message from a client about working with you.',n:'Client one',r:'Server owner',tag:'Discord bot',c:'from-brand to-brand-3'},
{q:'Placeholder quote: replace this with a real message from a client about working with you.',n:'Client two',r:'Minecraft network admin',tag:'Minecraft plugin',c:'from-brand-2 to-brand-3'},
{q:'Placeholder quote: replace this with a real message from a client about working with you.',n:'Client three',r:'Community manager',tag:'Website',c:'from-brand to-brand-2'}];
var i=0,box=document.getElementById('testiSlide'),dots=document.getElementById('testiDots'),timer;
function show(n){i=(n+T.length)%T.length;var t=T[i];box.innerHTML='';var d=document.createElement('div');d.className='pop';
 var q=document.createElement('p');q.className='text-xl font-medium leading-relaxed sm:text-2xl';q.textContent='“'+t.q+'”';
 var row=document.createElement('div');row.className='mt-6 flex flex-wrap items-center gap-3';
 var av=document.createElement('div');av.className='grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br '+t.c+' font-bold text-white';av.textContent=t.n.split(' ').map(function(w){return w[0]}).join('').slice(0,2).toUpperCase();
 var who=document.createElement('div');who.innerHTML='<b class="block"></b><span class="text-sm text-slate-400"></span>';who.firstChild.textContent=t.n;who.lastChild.textContent=t.r;
 var tag=document.createElement('span');tag.className='ml-auto rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300';tag.textContent='✔ Verified · '+t.tag;
 row.append(av,who,tag);d.append(q,row);box.appendChild(d);
 [].forEach.call(dots.children,function(b,k){b.className='h-2 rounded-full transition-all '+(k===i?'w-6 bg-brand-3':'w-2 bg-white/20')})}
T.forEach(function(_,k){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Testimonial '+(k+1));b.addEventListener('click',function(){show(k);restart()});dots.appendChild(b)});
document.getElementById('tPrev').addEventListener('click',function(){show(i-1);restart()});
document.getElementById('tNext').addEventListener('click',function(){show(i+1);restart()});
function restart(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(function(){show(i+1)},6500)}
var wrapEl=document.getElementById('testi');wrapEl.addEventListener('mouseenter',function(){clearInterval(timer)});wrapEl.addEventListener('mouseleave',restart);
show(0);restart();
})();
(function(){if(!document.getElementById('discordWidget'))return;
var W=document.getElementById('discordWidget');
function set(sel,v){var e=W.querySelector(sel);if(e)e.textContent=v}
function load(){
 var url=DISCORD.guildId?'https://discord.com/api/guilds/'+DISCORD.guildId+'/widget.json':'https://discord.com/api/v9/invites/'+DISCORD.invite+'?with_counts=true';
 fetch(url).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
  var on=d.presence_count!=null?d.presence_count:d.approximate_presence_count,mem=d.approximate_member_count,name=d.name||(d.guild&&d.guild.name);
  if(name)set('.dname',name);
  if(on!=null){set('.don',on.toLocaleString('en'));W.querySelector('.onl').classList.remove('hidden')}
  if(mem!=null){set('.dmem',mem.toLocaleString('en'));W.querySelector('.mem').classList.remove('hidden')}
 }).catch(function(){})}
W.querySelectorAll('a.join').forEach(function(a){a.href=DISCORD.url});
load();setInterval(load,60000);
})();
