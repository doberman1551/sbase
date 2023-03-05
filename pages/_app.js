import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Link from 'next/link';
import supabase from '../utils/supabaseClient';
import Nav from '../components/Nav';


function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [authenticatedState, setAuthenticatedState]=useState('not-authenticated')
  const router=useRouter()
  useEffect(() => {
    const { data:authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/dashboard')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
     //authListener.unsubscribe()
    }
  }, [])
  async function checkUser() {
    const user = await supabase.auth.getUser()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }
  return 
  <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
  <Nav authenticatedState={authenticatedState}></Nav>
  <Component {...pageProps} />

  </SessionContextProvider>
}


export default MyApp
