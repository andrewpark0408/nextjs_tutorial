'use client';
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  const {status, data: session} = useSession();

  return (
    <div className="flex justify-between bg-slate-200 p-5 space-x-3">
      <div className="flex space-x-3">
        <Link href="/" className="mr-5">Home</Link>
        <Link href="/users" className="mr-5">Users</Link>
        <Link href="/upload" className="mr-5">Upload</Link>
      </div>
      <div className="flex space-x-3">
        { status === 'loading' && <div>Loading...</div>}
        { status === 'authenticated' && 
          <div>
            {session.user!.name}
            <Link href="/api/changePassword" className="ml-3">Account Settings</Link>
            <Link href="/api/auth/signout" className="ml-3">Sign Out</Link>
          </div> }
        { status === 'unauthenticated' && <Link href="/api/auth/signin" className="mr-5">Login</Link> }
        { status === 'unauthenticated' && <Link href="/api/createAccount" className="mr-5">Register</Link> }
      </div>
    </div>
  );
}

export default NavBar