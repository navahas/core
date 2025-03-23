import Link from 'next/link'
import { ArrowRight, CircuitBoard, Cpu, Database, Globe, Lock } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Home () {
  return (
    <div className='flex min-h-screen flex-col bg-black text-white'>
      <header className='sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60'>
        <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
          <div className='flex gap-2 items-center text-xl font-bold'>
            <div className='relative h-8 w-8'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-70' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='h-5 w-5 rounded-full bg-black' />
              </div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='h-2 w-2 rounded-full bg-white' />
              </div>
            </div>
            <span className='text-lg'>Nexus</span>
          </div>
        </div>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 border-b border-white/10'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none'>
                    HOME
                  </h1>
                  <p className='max-w-[600px] text-zinc-400 md:text-xl'>
                    Una solución blockchain que permite a dispositivos IoT y agentes autónomos intercambiar servicios en
                    una economía descentralizada.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button className='bg-white text-black hover:bg-zinc-200' size='lg'>
                    Comenzar Ahora
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='lg'
                    className='border-zinc-800 bg-transparent text-white hover:bg-zinc-900'
                  >
                    Ver Demostración
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative h-[450px] w-[450px]'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 blur-3xl' />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='relative h-[350px] w-[350px] rounded-full border border-white/10 p-8'>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='h-[250px] w-[250px] rounded-full border border-white/10 p-8'>
                          <div className='flex h-full w-full items-center justify-center rounded-full bg-zinc-900'>
                            <CircuitBoard className='h-24 w-24 text-white' />
                          </div>
                        </div>
                      </div>
                      <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black p-2'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
                          <Lock className='h-5 w-5' />
                        </div>
                      </div>
                      <div className='absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-black p-2'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
                          <Cpu className='h-5 w-5' />
                        </div>
                      </div>
                      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-black p-2'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
                          <Database className='h-5 w-5' />
                        </div>
                      </div>
                      <div className='absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black p-2'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
                          <Globe className='h-5 w-5' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full border-t border-white/10 py-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <p className='text-center text-sm leading-loose text-zinc-400 md:text-left'>
            © 2025 Nexus. Todos los derechos reservados.
          </p>
          <div className='flex items-center gap-4 text-sm text-zinc-400'>
            <Link href='#' className='underline underline-offset-4 hover:text-white'>
              Términos
            </Link>
            <Link href='#' className='underline underline-offset-4 hover:text-white'>
              Privacidad
            </Link>
            <Link href='#' className='underline underline-offset-4 hover:text-white'>
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
