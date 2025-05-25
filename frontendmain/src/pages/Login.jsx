import { useState } from 'react';

function Login({ onVerified }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('');

  // ✅ Define verifyCode here
  const verifyCode = async () => {
    const res = await fetch('/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: phone, code }),
    });

    const data = await res.json();
    if (data.success) {
      setStatus('✅ Verified!');
      onVerified();
    } else {
      setStatus('❌ Incorrect code.');
    }
  };

  const verifyPhone = async () => {
    const phoneRegex = /^\+1\d{10}$/; // E.164 format for US
  
    if (!phoneRegex.test(phone)) {
      setStatus('❌ Please enter a valid US phone number in format: +1XXXXXXXXXX');
      return;
    }
  
    try {
      const res = await fetch(`/verify-phone?number=${encodeURIComponent(phone)}&country_code=US`);
      const data = await res.json();
  
      if (data.valid) {
        await fetch('/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ number: phone }),
        });
  
        setStatus('✅ Code sent!');
        setStep(2);
      } else {
        setStatus('❌ Invalid phone number.');
      }
    } catch (err) {
      console.error('verifyPhone error:', err);
      setStatus('❌ Failed to verify phone.');
    }
  };
  

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login with Phone Number</h2>
      {step === 1 && (
        <>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+15555555555" />
          <button onClick={verifyPhone}>Send Code</button>
        </>
      )}
      {step === 2 && (
        <>
          <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter code" />
          <button onClick={verifyCode}>Verify Code</button>
        </>
      )}
      <p>{status}</p>
    </div>
  );
}

export default Login;
