import React,{useMemo,useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function InteractivePhoenix({sceneUrl=''}){
  const [p,setP]=useState({x:0,y:0});
  const move=e=>{const r=e.currentTarget.getBoundingClientRect();setP({x:((e.clientX-r.left)/r.width-.5)*14,y:((e.clientY-r.top)/r.height-.5)*14})};
  const reset=()=>setP({x:0,y:0});
  const particles=Array.from({length:18},(_,i)=>i);
  const spline=String(sceneUrl||'').startsWith('https://prod.spline.design/');
  return <div className="phoenix-3d-stage" onPointerMove={move} onPointerLeave={reset} aria-label="Interactive JYC phoenix visual">
    <div className="phoenix-depth phoenix-depth-back" style={{transform:`translate3d(${p.x*-0.35}px,${p.y*-0.35}px,0) rotateX(${p.y*.3}deg) rotateY(${p.x*.3}deg)`}}/>
    <div className="phoenix-orbit orbit-a"/><div className="phoenix-orbit orbit-b"/><div className="phoenix-orbit orbit-c"/>
    {particles.map(i=><i key={i} className="phoenix-particle" style={{'--i':i}}/>)}
    {spline&&<iframe className="phoenix-spline" title="Interactive JYC Phoenix" src={sceneUrl} loading="lazy"/>}<div className="phoenix-3d-core" style={{transform:`translate3d(${p.x}px,${p.y}px,0) rotateX(${p.y*.45}deg) rotateY(${p.x*.45}deg)`}}>
      <span className="phoenix-halo"/>
      <div className="phoenix-artwork" aria-hidden="true"><img src="/jyc-phoenix.png" alt=""/></div>
      <div className="phoenix-seal-wrap" aria-hidden="true"><div className="phoenix-seal"><img src="/jyc-logo-circle.png" alt=""/></div><span className="phoenix-seal-label">JIIT YOUTH CLUB</span></div>
      <div className="phoenix-ring-label">JYC · 128 · NOIDA</div>
    </div>
    <div className="phoenix-node node-one">CLUBS</div><div className="phoenix-node node-two">EVENTS</div><div className="phoenix-node node-three">PEOPLE</div>
  </div>
}

export function EcosystemSection({data}){
  const nav=useNavigate();
  const clubs=data.clubs.filter(c=>c.published&&c.status!=='archived').length;
  const events=data.events.filter(e=>e.published&&!e.archived).length;
  const people=data.team.filter(m=>m.published===true).length;
  const moments=data.gallery.length;
  const nodes=[['clubs','CLUBS',clubs,'/clubs'],['events','EVENTS',events,'/events'],['people','PEOPLE',people,'/team'],['moments','MOMENTS',moments,'/gallery'],['fest','FESTS',data.fest?.active?1:0,'/events'],['discover','DISCOVER','→','/discover']];
  return <section className="section ecosystem-section reveal"><div className="section-head ecosystem-head"><span className="eyebrow">JYC ECOSYSTEM</span><h2>One campus. Many possibilities.</h2><p>Communities, experiences, people and moments connected through one student-led space.</p></div><div className="ecosystem-orbit"><div className="ecosystem-core"><div className="ecosystem-brand-lockup"><img src="/jyc-phoenix.png" alt="JIIT Youth Club phoenix"/><div className="ecosystem-brand-meta"><span>JIIT YOUTH CLUB</span><b>128 · NOIDA</b></div></div><span>READY TO SOAR</span></div>{nodes.map(([id,label,count,path],i)=><button key={id} className={`ecosystem-node ecosystem-node-${i}`} onClick={()=>nav(path)}><small>{String(count)}</small><strong>{label}</strong><em>Explore →</em></button>)}</div></section>
}

export function DiscoverPage({data}){
  const nav=useNavigate();
  const clubs=data.clubs.filter(c=>c.published&&c.status!=='archived');
  const interests=useMemo(()=>['All',...new Set(clubs.flatMap(c=>Array.isArray(c.interests)?c.interests:[]).filter(Boolean))],[clubs]);
  const [interest,setInterest]=useState('All');
  const filtered=interest==='All'?clubs:clubs.filter(c=>(c.interests||[]).includes(interest));
  return <section className="section page discover-page"><div className="compact-page-head reveal"><div><span className="eyebrow">JYC DISCOVER</span><h1>Find what feels like you.</h1><p>Choose an interest and explore published JYC communities that match it. Recommendations are based only on club metadata.</p></div><div className="page-stat-row"><span><b>{clubs.length}</b> spaces</span><span><b>{interests.length-1}</b> interests</span></div></div><div className="discover-interest-bar reveal"><span className="eyebrow">I'M INTO</span><div>{interests.map(x=><button key={x} className={interest===x?'active':''} onClick={()=>setInterest(x)}>{x}</button>)}</div></div>{filtered.length?<div className="discover-results"><div className="results-line"><span>{filtered.length} {filtered.length===1?'space':'spaces'} match {interest==='All'?'your campus':'“'+interest+'”'}</span></div><div className="club-grid clubs-grid-premium">{filtered.map((c,i)=><article className="discover-card tilt-card reveal" key={c.id} onClick={()=>nav('/clubs/'+c.id)}><div className="discover-card-image" style={c.banner?{backgroundImage:`url(${c.banner})`}:{}}><span>{c.type||'COMMUNITY'}</span></div><div><small>{c.category||'JYC community'}</small><h3>{c.name}</h3><p>{c.description||'Explore this published JYC community.'}</p><div className="chips">{(c.interests||[]).slice(0,4).map(x=><span key={x}>{x}</span>)}</div></div></article>)}</div></div>:<div className="discover-empty"><span className="eyebrow">JYC CONTENT</span><h2>No published spaces match this interest yet.</h2><p>Try another interest or return to all published clubs.</p><button className="btn secondary" onClick={()=>setInterest('All')}>Show all spaces →</button></div>}</section>
}

export function MomentsSection({data}){
  const nav=useNavigate();
  const items=data.gallery.slice(0,5);
  return <section className="section moments-section reveal"><div className="reference-section-head"><div><span className="eyebrow">JYC MOMENTS</span><h2>Real moments. Real campus.</h2><p>The visual archive grows from photos actually published by JYC.</p></div><button className="reference-view-all" onClick={()=>nav('/gallery')}>Open archive <span>→</span></button></div>{items.length?<div className="moments-editorial">{items.map((g,i)=><button key={g.id||i} className={`moment-tile moment-${i}`} onClick={()=>nav('/gallery')}><img src={g.url} loading="lazy" alt={g.caption||'JYC moment'}/><span><small>{g.association||'JYC'}</small><strong>{g.caption||'JYC moment'}</strong></span></button>)}</div>:<div className="moments-empty"><span className="eyebrow">VISUAL ARCHIVE</span><h2>Moments will appear here as JYC publishes them.</h2><p>No synthetic imagery is used as a substitute for official campus moments.</p><button className="btn secondary" onClick={()=>nav('/gallery')}>Open gallery →</button></div>}</section>
}
