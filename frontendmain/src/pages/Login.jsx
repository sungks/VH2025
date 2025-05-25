import LiveLinkLogoSmall from '../assets/LiveLinkLogoSmall.png';
import { useState } from 'react';
import './Login.css';
import { playSound } from '../utils/sound';

function Login({ onVerified }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('');

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
    const phoneRegex = /^\+1\d{10}$/;

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
    <div className="login-container">
      <div className="login-card">
        <img src={LiveLinkLogoSmall} alt="LiveLink Logo" className="login-logo" />
        <h2 className="login-title">Login with Phone</h2>
        {step === 1 && (
          <>
            <input
              className="login-input"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1XXXXXXXXXX"
            />
            <button className="login-button" onClick={() => { playSound('/sounds/click.mp3'); verifyPhone(); }}>Send Code</button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              className="login-input"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter code"
            />
            <button className="login-button" onClick={() => { playSound('/sounds/click.mp3'); verifyCode(); }}>Verify Code</button>
          </>
        )}
        <p className="login-status">{status}</p>
      </div>
    </div>
  );
}

export default Login;
