import { useState, useEffect } from 'react';
import { getConfig } from './configStore';
import Admin from './Admin';

export default function App() {
  const isAdmin = window.location.pathname === '/admin';
  const [config, setConfig] = useState(getConfig());
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fn = () => setConfig(getConfig());
    window.addEventListener('configUpdated', fn);
    return () => window.removeEventListener('configUpdated', fn);
  }, []);

  if (isAdmin) return <Admin />;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#0f172a', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>DOMUS SERVARE</h1>
        <button onClick={() => window.location.href = '/admin'} style={{ background: 'white', color: 'black', border: 'none', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold' }}>CEO LOGIN</button>
      </header>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Ghar Ka Kaam? Hum Sambhalenge.</h2>
        {Object.entries(config.services).map(([name, price]) => (
          <div key={name} onClick={() => setSelected(name)} style={{ background: 'white', padding: '18px', borderRadius: '16px', marginBottom: '12px', border: selected === name ? '2px solid black' : '1px solid #e2e8f0', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700 }}>{name}</span>
              <span style={{ fontWeight: 900 }}>₹{price}</span>
            </div>
            <small>+ ₹{config.platformFee} Platform Fee</small>
          </div>
        ))}
        {selected && (
          <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px', marginTop: '20px' }}>
            <h3>{selected} Book Karein?</h3>
            <p>Total: ₹{config.services[selected] + config.platformFee}</p>
            <button onClick={() => alert('Booking Confirmed')} style={{ width: '100%', padding: '14px', background: 'white', color: 'black', borderRadius: '12px', fontWeight: 900 }}>CONFIRM BOOKING</button>
          </div>
        )}
      </div>
    </div>
  );
        }
