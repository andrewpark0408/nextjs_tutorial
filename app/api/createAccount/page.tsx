'use client'
import React, { useState } from 'react'

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert('Registration successful');
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center">

          <input className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70" type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
          <input className="mt-3 input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input className="mt-3 input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button className="btn btn-primary mt-3" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;