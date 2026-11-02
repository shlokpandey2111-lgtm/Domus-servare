import { useState } from "react"

const INIT = {
  platformFee: 12,
  radiusKm: 10,
  city: "Patti, Pratapgarh",
  services: [
    { id: 201, name: "Jhadu Pocha Dai", price: 199, icon: "🧹", time: "60 min" },
    { id: 202, name: "Full Home Cleaning 1BHK", price: 399, icon: "🏠", time: "120 min" },
    { id: 101, name: "Cook One Time", price: 249, icon: "🍳", time: "90 min" },
    { id: 301, name: "Electrician", price: 199, icon: "⚡", time: "45 min" },
  ]
}

export default function App() {
  const [role, setRole] = useState(null)
  const [selected, setSelected] = useState(null)

  if (!role) {
    return (
      <div style={{minHeight:'100vh', background:'#f5f7ff', padding:20, fontFamily:'system-ui'}}>
        <div style={{background:'white', padding:14, borderRadius:16, display:'flex', justifyContent:'space-between'}}>
          <b>Domus Servare Bharat V2.0</b>
          <span style={{fontSize:12, opacity:0.7}}>{INIT.city}</span>
        </div>
        <h1 style={{marginTop:24, fontSize:32, fontWeight:900}}>नमस्ते! 👋</h1>
        <p>Best services in {INIT.city} - {INIT.radiusKm}km radius</p>
        <div style={{marginTop:24, display:'grid', gap:12}}>
          <button onClick={()=>setRole('customer')} style={{padding:20, borderRadius:18, border:'none', background:'black', color:'white', fontWeight:700}}>👤 ग्राहक - सेवा बुक करो</button>
          <button onClick={()=>setRole('provider')} style={{padding:20, borderRadius:18, border:'1px solid #ddd', background:'white', fontWeight:700}}>👷‍♂️ प्रोवाइडर - काम लो</button>
        </div>
        <div style={{marginTop:20, background:'white', padding:12, borderRadius:12, fontSize:12, opacity:0.6}}>
          Platform Fee: ₹{INIT.platformFee} | Radius: {INIT.radiusKm}km
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh', background:'#f5f7ff', padding:16, fontFamily:'system-ui'}}>
      <button onClick={()=>setRole(null)} style={{border:'none', background:'white', padding:'8px 14px', borderRadius:20}}>← Back</button>
      <h2 style={{marginTop:12}}>Services in {INIT.city}</h2>
      <div style={{display:'grid', gap:12, marginTop:12}}>
        {INIT.services.map(s=>(
          <div key={s.id} onClick={()=>setSelected(s)} style={{background:'white', padding:16, borderRadius:16, display:'flex', justifyContent:'space-between', boxShadow:'0 1px 6px #0001'}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}><span style={{fontSize:28}}>{s.icon}</span><div><b>{s.name}</b><div style={{fontSize:12, opacity:0.6}}>{s.time}</div></div></div>
            <b>₹{s.price}</b>
          </div>
        ))}
      </div>
      {selected && <div style={{marginTop:16, background:'#4f46e5', color:'white', padding:16, borderRadius:16, textAlign:'center'}}><b>{selected.name} booked!</b><div style={{fontSize:12, opacity:0.9, marginTop:4}}>Platform fee ₹{INIT.platformFee} included</div></div>}
    </div>
  )
}
