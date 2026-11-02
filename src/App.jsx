import { useState, useEffect } from 'react';
import { getConfig, saveConfig, LANGUAGES, generateOTP, verifyOTP } from './configStore';
import Admin from './components/Admin';

export default function App() {
  const [config, setConfig] = useState(getConfig());
  const [showLang, setShowLang] = useState(!getConfig().selectedLang);
  const [role, setRole] = useState(null);
  const [step, setStep] = useState('ROLE');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const isSecretAdmin = window.location.pathname.includes('/ceo-shlok-2008');
  if (isSecretAdmin) return <Admin />;

  useEffect(()=>{ const h=()=>setConfig(getConfig()); window.addEventListener('configUpdated',h); return()=>window.removeEventListener('configUpdated',h); },[]);

  const selectLang = (code) => { const c={...config, selectedLang:code}; saveConfig(c); setConfig(c); setShowLang(false); };
  const sendOtp = () => { const o=generateOTP(mobile); alert(`OTP for ${mobile}: ${o}`); setStep('OTP'); };
  const verify = () => {
    if(!verifyOTP(mobile, otp)) return alert('Wrong OTP');
    let c={...config};
    if(role==='CUSTOMER' && !c.customers.find(x=>x.mobile===mobile)) c.customers.push({mobile, bookings:[]});
    if(role==='PROVIDER' && !c.providers.find(x=>x.mobile===mobile)) c.providers.push({mobile, service:'Maid', verified:false});
    c.currentUser={role, mobile}; saveConfig(c); setConfig(c); setStep('DASHBOARD');
  };
  const logout = () => { const c={...config, currentUser:null}; saveConfig(c); setConfig(c); setRole(null); setStep('ROLE'); };

  if (showLang) {
    return (
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999 }}>
        <div style={{ background:'white', padding:28, borderRadius:20, width:'90%', maxWidth:380 }}>
          <h2>Select Language</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, maxHeight:360, overflowY:'auto', marginTop:12 }}>
            {LANGUAGES.map(l=><button key={l.code} onClick={()=>selectLang(l.code)} style={{ padding:12, borderRadius:10, border:'1px solid #ddd' }}>{l.native}</button>)}
          </div>
        </div>
      </div>
    );
  }

  if (step==='ROLE') {
    return (
      <div style={{ minHeight:'100vh', background:'#000', color:'white', display:'flex', justifyContent:'center', alignItems:'center', padding:20 }}>
        <div style={{ width:360 }}>
          <h1 style={{ fontSize:38, fontWeight:900, lineHeight:0.9 }}>DOMUS<br/>SERVARE</h1>
          <p style={{ opacity:0.5, marginTop:8 }}>Trusted Home Services</p>
          <button onClick={()=>{setRole('CUSTOMER'); setStep('MOBILE');}} style={{ width:'100%', padding:20, marginTop:30, background:'white', color:'black', borderRadius:16, fontWeight:800, border:'none', textAlign:'left' }}>👤 I Need Service<br/><span style={{ fontWeight:400, fontSize:12, opacity:0.7 }}>Book Maid, Cook, Cleaning etc.</span></button>
          <button onClick={()=>{setRole('PROVIDER'); setStep('MOBILE');}} style={{ width:'100%', padding:20, marginTop:12, background:'#111', color:'white', borderRadius:16, fontWeight:800, border:'1px solid #222', textAlign:'left' }}>💼 I Want to Work<br/><span style={{ fontWeight:400, fontSize:12, opacity:0.6 }}>Join as Service Provider</span></button>
          <p style={{ fontSize:10, opacity:0.3, textAlign:'center', marginTop:20 }}>Secure • 22 Languages • OTP Login</p>
        </div>
      </div>
    );
  }

  if (step==='MOBILE') {
    return (
      <div style={{ minHeight:'100vh', background:'#000', display:'flex', justifyContent:'center', alignItems:'center' }}>
        <div style={{ background:'#111', padding:24, borderRadius:20, width:340, color:'white' }}>
          <h3>{role==='CUSTOMER' ? 'Customer Login' : 'Provider Login'}</h3>
          <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Mobile Number" style={{ width:'100%', padding:14, background:'black', border:'1px solid #333', color:'white', borderRadius:10, marginTop:12 }} />
          <button onClick={sendOtp} style={{ width:'100%', padding:14, marginTop:10, background:'white', color:'black', fontWeight:800, borderRadius:10 }}>SEND OTP</button>
          <p onClick={()=>setStep('ROLE')} style={{ fontSize:12, opacity:0.5, textAlign:'center', marginTop:10, cursor:'pointer' }}>Back</p>
        </div>
      </div>
    );
  }

  if (step==='OTP') {
    return (
      <div style={{ minHeight:'100vh', background:'#000', display:'flex', justifyContent:'center', alignItems:'center' }}>
        <div style={{ background:'#111', padding:24, borderRadius:20, width:340, color:'white' }}>
          <h3>Enter OTP - {mobile}</h3>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6 Digit OTP" style={{ width:'100%', padding:14, background:'black', border:'1px solid #333', color:'white', borderRadius:10, marginTop:12 }} />
          <button onClick={verify} style={{ width:'100%', padding:14, marginTop:10, background:'white', color:'black', fontWeight:800, borderRadius:10 }}>VERIFY & CONTINUE</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:20, background:'#fafafa', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}><h3>{config.currentUser?.role} - {config.currentUser?.mobile}</h3><button onClick={logout}>Logout</button></div>
      {config.currentUser?.role==='CUSTOMER' && <><h2>Book a Service</h2>{Object.entries(config.services).map(([k,v])=><div key={k} style={{ background:'white', padding:15, borderRadius:12, marginBottom:10, border:'1px solid #eee' }}><b>{k}</b><br/>₹{v} <button style={{ float:'right', background:'black', color:'white', borderRadius:8, padding:'6px 12px' }}>Book Now</button></div>)}</>}
      {config.currentUser?.role==='PROVIDER' && <><h2>Provider Dashboard</h2><div style={{ background:'white', padding:15, borderRadius:12 }}><p>Welcome Provider {config.currentUser?.mobile}</p><p>Verification: Pending</p><p>Yaha aapko jobs milenge.</p></div></>}
    </div>
  );
                                                       }
