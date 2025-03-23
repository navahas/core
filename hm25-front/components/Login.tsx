'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Google from '@/components/google'
import React, { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Mail } from 'lucide-react'
import Link from "next/link";

export default function Login () {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [email, setEmail] = useState('')
  const supabase = useSupabaseClient()

  const handleOAuthSignIn = async (provider: 'google' | 'custom') => {
    setIsLoading(true)

    if (provider === 'custom') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) {
        setMessage({ text: error.message, type: 'error' })
      } else {
        setMessage({ text: 'Email enviado', type: 'success' })
      }
    } else {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) {
        setMessage({ text: error.message, type: 'error' })
      }
    }
    setIsLoading(false)
  }

  return (
      <div className='w-full max-w-[650px] h-full m-auto backdrop-blur-sm rounded-lg shadow-lg'>
        <div className='w-full border-glow-container rounded-lg p-4 bg-white lg:bg-white/80 backdrop-blur-sm min-h-[240px]'>
          <div className='border-glow absolute inset-0 rounded-lg pointer-events-none min-h-[240px]' />
          {!message.text && (
              <>
                <div className='flex'>
                  <Mail className='absolute m-2 text-gray-400' />
                  <Input
                    type='email'
                    id='email'
                    placeholder='email'
                    className='pl-10 w-full'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Link href='/create-contract-landlord'>
                  <Button
                    type='submit'
                    // onClick={() => handleOAuthSignIn('custom')}
                    className='rounded-lg text-md mt-2 w-full transition-all ease-in-out b-glow to-secondary drop-shadow-lg  font-bold'
                    disabled={!email || isLoading}
                  >
                    Sign in
                  </Button>
                </Link>
                <div className='flex items-center my-3'>
                  <div className='flex-grow border-t border-gray-200' />
                  <span className='mx-4 text-gray-400'>o</span>
                  <div className='flex-grow border-t border-gray-200' />
                </div>

                <Link href='/score/35256305632'>
                  <Button
                    className='w-full'
                    variant='outline'
                    // onClick={() => handleOAuthSignIn('google')}
                    disabled={isLoading}
                  >
                    <Google className='w-6 h-6 mr-2' />
                    Continue with Google
                  </Button>
                </Link>
                <p className='text-xs text-gray-600 text-center mt-2'>Continue with an existing account</p>
              </>
          )}
          {message.text && (
              <div className={`w-full h-full lg:max-w-[460px] rounded-md p-4 ${message.type === 'success' ? 'bg-teal-100' : 'bg-red-50'}`}>
                {message.text}
              </div>
          )}
        </div>
      </div>
  )
}
