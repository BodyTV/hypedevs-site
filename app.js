/* Body & Zunye site scripts */
function eur(n){return PRICES.currency+Math.round(n).toLocaleString('en')}
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
function calc(){var one=0,mo=0,lines=[];
 PRICES.items.forEach(function(it){if(sel[it.id]){one+=it.p[cx];mo+=it.month||0;lines.push(it.label)}});
 var lo=one*(1-PRICES.range),hi=one*(1+PRICES.range);
 document.getElementById('total').textContent=one?(PRICES.range?eur(lo)+' – '+eur(hi):eur(one)):'€0';
 document.getElementById('monthly').textContent=mo?'+ '+eur(mo)+' / month':'';
 var ul=document.getElementById('summary');ul.innerHTML='';
 lines.forEach(function(t){var li=document.createElement('li');li.textContent='✔ '+t;ul.appendChild(li)});
 if(!lines.length){var li=document.createElement('li');li.className='text-slate-500';li.textContent='Nothing selected yet';ul.appendChild(li)}
 lastSummary='Project estimate: '+(lines.join(', ')||'nothing selected')+' | '+PRICES.cx.filter(function(c){return c.id===cx})[0].label+' | '+(one?(PRICES.range?eur(lo)+'–'+eur(hi):eur(one)):'€0')+(mo?' + '+eur(mo)+'/month':'')}
document.getElementById('copyBtn').addEventListener('click',function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(lastSummary):Promise.reject()).then(function(){b.textContent='Copied ✔'},function(){b.textContent='Copy failed'});setTimeout(function(){b.textContent='Copy summary'},1800)});
calc();

})();
(function(){if(!document.getElementById('svcGrid'))return;
var g=document.getElementById('svcGrid');
PRICES.items.forEach(function(it,i){var a=document.createElement('article'),id='svc'+i;
 a.className='glass relative rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:border-brand-3/50 hover:shadow-[0_24px_50px_-24px_rgba(0,163,255,.7)]';
 var price=it.month?'From '+eur(it.month)+' / month':'From '+eur(it.p.s);
 a.innerHTML='<div class="flex items-start justify-between gap-3"><div class="grid h-12 w-12 place-items-center rounded-2xl bg-brand/20 text-2xl">'+it.icon+'</div><span class="rounded-full border border-brand-3/40 bg-brand/20 px-3 py-1 text-xs font-bold text-brand-3">'+price+'</span></div><h3 class="mt-4 text-xl font-bold">'+it.label+'</h3><p class="mt-1 text-slate-400">'+it.sub+'</p><button type="button" aria-expanded="false" aria-controls="'+id+'" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-3">Details <span class="chev transition">▾</span></button><div id="'+id+'" class="hidden pop mt-3 border-t border-white/10 pt-3 text-sm text-slate-300"><p class="mb-2">'+it.desc+'</p><ul class="space-y-1">'+it.feat.map(function(f){return '<li>✔ '+f+'</li>'}).join('')+'</ul></div>';
 var btn=a.querySelector('button'),box=a.querySelector('#'+id),ch=a.querySelector('.chev');
 btn.addEventListener('click',function(){var o=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',!o);box.classList.toggle('hidden',o);ch.style.transform=o?'':'rotate(180deg)'});
 g.appendChild(a)});
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

(function(){var b=document.querySelector('.burger'),n=document.querySelector('header nav');if(!b||!n)return;
function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')}
b.addEventListener('click',function(){set(!n.classList.contains('open'))});
n.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')set(false)})})();
