import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. SUPABASE JODA
const supabase = createClient(
  'https://gmvxitizzzqzmljwlter.supabase.co',
  'EYJ_WALI_ANON_KEY_YAHAN_DALO' // yahan apni anon key dalo
);

function App() {
  const [page, setPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false); // 2. LOADING ADDED

  const services = [
    { id: 1, name: 'AC Repair', price: 499 },
    { id: 2, name: 'Plumber', price: 299 },
    { id: 3, name: 'Electrician', price: 249 },
  ];

  const platformFee = 12;
  const total = selectedService ? selectedService.price + platformFee : 0;

  // 3. BOOKING SAVE + 4. PAST TIME CHECK
  const handleBooking = async () => {
    if (!address || !time) return;
    
    if (new Date(time) < new Date()) {
      alert('Past ka time book nahi kar sakte');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('bookings').insert([
      { 
        service: selectedService.name, 
        address: address, 
        time: time,
        total_price: total 
      }
    ]);
    setLoading(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      setPage('success');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Domus Servare Bharat</h1>

      {page === 'home' && (
        <>
          <h2>Service Chuno:</h2>
          {services.map(s => (
            <div key={s.id} onClick={() => { setSelectedService(s); setPage('booking'); }} 
            style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '10px', cursor: 'pointer' }}>
              <b>{s.name}</b> - Rs. {s.price}
            </div>
          ))}
        </>
      )}

      {page === 'booking' && selectedService && (
        <div>
          <button onClick={() => setPage('home')} style={{ marginBottom: '15px' }}>Wapas</button>
          <h2>Booking: {selectedService.name}</h2>
          
          <label>Apna Address Likho:</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Ghar no, gali, Patti..." 
          style={{ width: '100%', padding: '10px', margin: '10px 0', minHeight: '80px' }} />

          <label>Time Chuno:</label>
          <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} 
          min={new Date().toISOString().slice(0,16)}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} />

          <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px', marginTop: '15px' }}>
            <p>Service Price: Rs. {selectedService.price}</p>
            <p>Platform Fee: Rs. {platformFee}</p>
            <hr/>
            <h3>Total: Rs. {total}</h3>
          </div>

          <button onClick={handleBooking} disabled={!address || !time || loading}
          style={{ width: '100%', padding: '15px', background: !address || !time || loading ? 'gray' : 'black', color: 'white', borderRadius: '10px', marginTop: '15px' }}>
            {loading ? 'Booking Ho Rahi Hai...' : `Rs. ${total} Pay Karke Book Karo`}
          </button>
        </div>
      )}

      {page === 'success' && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1 style={{ fontSize: '60px' }}>✅</h1>
          <h2>Booking Ho Gayi!</h2>
          <p>{selectedService?.name}</p>
          <p>{address}</p>
          <p>{time}</p>
          <button onClick={() => { setPage('home'); setAddress(''); setTime(''); setSelectedService(null); }} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Nayi Booking Karo
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
