"use client";
import React, { useEffect, useState } from 'react'
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import app from '@/firebase.config';
import { Button } from '@/components/ui/button';

function page() {

  const auth=getAuth(app);
  const router=useRouter();
  const [user,setUser]=useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName);
      } else {
        router.push('/signup');
      }
    });
    return()=>unsubscribe();
  },[]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.log("Error signing out:", error.message);
    }
  };


  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Display user details */}
      {user && (
        <div className="mb-6">
          <p className="text-lg">Welcome, {user.displayName}</p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User profile"
              className="w-32 h-32 rounded-full mx-auto mt-4 object-cover"
            />
          )}
        </div>
      )}

      {/* Sign out button */}
      <Button onClick={signOutUser} className="mt-4">
        Sign Out
      </Button>
    </div>
  )
}

export default page
