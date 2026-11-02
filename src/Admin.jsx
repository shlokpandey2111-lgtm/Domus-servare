import { useState } from 'react';
import { getConfig, saveConfig } from './configStore';

export default function Admin() {
  const [config, setConfig] = useState(getConfig());
  const [pass, setPass] = useState('');
  const [auth, setAuth] = useState(false);

  const login = () => {
    if (pass === config.adminPassword) {
      setAuth(true);
    } else {
      alert('Galat Password! 1234 hai');
    }
  };

  const updatePrice = (serviceName, newPrice) => {
    const updated = { ...config.services };
    updated[serviceName] = Number(newPrice);
    setConfig({ ...config, services: updated });
  };

  const save = () => {
    saveConfig(config);
    alert('Done! Price Live Ho Gaya');
  };

  if (!auth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '350px' }}>
          <h2>CEO LOGIN</h2>
          <input type="password" placeholder="Password = 1234" value={pass} onChange={(e) => setPass(e.target.value)} style={{ width: '100%', padding: '12px', marginTop: '15px', borderRadius: '10px' }} />
          <button onClick={login} style={{ width: '100%', padding: '12px', marginTop: '10px', background: 'black', color: 'white', borderRadius: '10px' }}>LOGIN</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h1>CEO DASHBOARD</h1>
      <div style={{ background: '#f1f5f9', padding: '20px', borderRadius: '16px', marginTop: '20px' }}>
        <h3>Platform Fee (Tera Profit)</h3>
        <input type="number" value={config.platformFee} onChange={(e) => setConfig({ ...config, platformFee: Number(e.target.value) })} style={{ width: '100%', padding: '14px', borderRadius: '10px' }} />
      </div>
      <div style={{ marginTop: '30px' }}>
        <h3>Service Price</h3>
        {Object.keys(config.services).map((s) => (
          <div key={s} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #eee' }}>
            <span>{s}</span>
            <input type="number" value={config.services[s]} onChange={(e) => updatePrice(s, e.target.value)} style={{ width: '120px', padding: '10px', borderRadius: '8px', border: '2px solid black' }} />
          </div>
        ))}
      </div>
      <button onClick={save} style={{ width: '100%', padding: '16px', marginTop: '30px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900' }}>SAVE & PUBLISH LIVE</button>
    </div>
  );
      }
