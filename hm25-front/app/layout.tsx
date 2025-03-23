import '@/app/globals.css'
import { Inter, Poppins } from 'next/font/google'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import type { Database } from '@/types/supabase'
import SupabaseProvider from '@/components/SupabaseProvider'
import { ThemeProvider } from '@/components/theme-provider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700']
})

// Update the metadata
export const metadata = {
  title: 'Trust Lease',
  description:
    'Decentralized scoring for secure leasing'
}

export default async function RootLayout ({ children }) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { user } } = await supabase.auth.getUser()
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`${poppins.className} bg-black`}>
          <SupabaseProvider session={{ user }}>
            <ThemeProvider attribute='class' defaultTheme='dark'>
              {children}
            </ThemeProvider>
          </SupabaseProvider>
      </body>
    </html>
  )
}
