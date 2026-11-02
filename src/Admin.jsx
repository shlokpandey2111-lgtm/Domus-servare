import { useState } from 'react';
import { getConfig, saveConfig, generateOTP, verifyOTP } from '../configStore';

export default function Admin() {
  const [config, setConfig] = useState(getConfig());
  const [step, setStep] = useState('MOBILE');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newNum, setNewNum] = useState('');

  const sendOtp = () => {
    if (mobile !== config.adminMobile) return alert('ACCESS DENIED - You are not CEO');
    const code = generateOTP(mobile);
    alert(`CEO OTP: ${code}`);
    setStep('OTP');
  };
  const verify = () => {
    if (verifyOTP(mobile, otp)) setStep('DASHBOARD');
    else alert('Wrong OTP');
  };

  if (step !== 'DASHBOARD') {
    return (
      <div style={{ minHeight:'100vh', background:'#000', display:'flex', justifyContent:'center', alignItems:'center' }}>
        <div style={{ background:'#0a0a0a', border:'1px solid #1a1a1a', padding:32, borderRadius:20, width:360, color:'white' }}>
          <h2 style={{ fontWeight:900 }}>CEO PRIVATE ACCESS</h2>
          <p style={{ fontSize:11, opacity:0.4 }}>This page is not indexed. Only owner can login.</p>
          {step==='MOBILE' && <>
            <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="CEO Mobile Only" style={{ width:'100%', padding:14, background:'black', border:'1px solid #333', color:'white', borderRadius:10, marginTop:15 }} />
            <button onClick={sendOtp} style={{ width:'100%', padding:14, marginTop:10, background:'white', color:'black', fontWeight:800, borderRadius:10 }}>SEND OTP</button>
          </>}
          {step==='OTP' && <>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP" style={{ width:'100%', padding:14, background:'black', border:'1px solid #333', color:'white', borderRadius:10, marginTop:15 }} />
            <button onClick={verify} style={{ width:'100%', padding:14, marginTop:10, background:'white', color:'black', fontWeight:800, borderRadius:10 }}>VERIFY</button>
          </>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:20, background:'#f5f5f5', minHeight:'100vh' }}>
      <h1>CEO DASHBOARD - SHLOK</h1>
      <p>Total Customers: {config.customers.length} | Total Providers: {config.providers.length}</p>
      <div style={{ background:'white', padding:15, borderRadius:12, marginTop:15 }}>
        <h3>Change Admin Number</h3>
        <input value={newNum} onChange={e=>setNewNum(e.target.value)} placeholder="New 10 digit" style={{ padding:10 }} />
        <button onClick={()=>{ if(newNum.length===10){ const c={...config, adminMobile:newNum}; saveConfig(c); setConfig(c); alert('Updated'); } }} style={{ padding:10, background:'black', color:'white', marginLeft:5 }}>UPDATE</button>
      </div>
      <div style={{ background:'white', padding:15, borderRadius:12, marginTop:15 }}>
        <h3>Prices</h3>
        {Object.entries(config.services).map(([k,v])=>(
          <div key={k}>{k}: <input type="number" value={v} onChange={e=>setConfig({...config, services:{...config.services, [k]:Number(e.target.value)}})} /></div>
        ))}
        <button onClick={()=>{ saveConfig(config); alert('LIVE!'); }} style={{ width:'100%', padding:12, background:'green', color:'white', marginTop:10 }}>SAVE LIVE</button>
      </div>
    </div>
  );
}
