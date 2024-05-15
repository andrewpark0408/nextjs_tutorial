'use client';
import React, { useState } from 'react'

const ChangePassword = () => {
  const [email, setEmail] = useState(''); 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/changePassword/change-pass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, currentPassword, newPassword }),
    });

    if (res.ok) {
      alert('Password changed successfully');
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4">Change Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs py-8">
        <div className="flex flex-col items-center justify-center">
          <label>
            Email:
            <input className="input input-bordered input-primary w-full max-w-xs mb-4 text-black placeholder:text-black/70" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Current Password:
            <input className="input input-bordered input-primary w-full max-w-xs mb-4 text-black placeholder:text-black/70" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </label>
          <label>
            New Password:
            <input className="input input-bordered input-primary w-full max-w-xs mb-4 text-black placeholder:text-black/70" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </label>
          <button className="btn btn-primary w-32" type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;