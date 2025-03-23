import { NextResponse } from 'next/server'

const publicRoutes = [
  '/',
  '/legal',
  '/auth/callback',
  '/image',
  '/contract'
]

export async function middleware (req: { nextUrl: { pathname: string }; url: string | URL | undefined; headers: { get: (arg0: string) => string } }) {
  let res = NextResponse.next()

  if (req.nextUrl.pathname.startsWith('/images')) {
    return res
  }

  if (req.nextUrl.pathname.startsWith('/auth/callback')) {
    return res // Permitir el flujo de autenticación sin interrupciones
  }
/*
  // Inicializa Supabase en el middleware
  const supabase = createMiddlewareClient({ req, res })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    if (req.nextUrl.pathname !== '/') {
      res = NextResponse.redirect(new URL('/', req.url), { status: 303 })
      res.headers.delete('x-middleware-set-cookie')
      return res
    }
    return res
  }

  // Verifica si la ruta es pública
  const isPublicRoute = publicRoutes.some(route => {
    if (route.endsWith('/*')) {
      const baseRoute = route.slice(0, -2)
      return req.nextUrl.pathname.startsWith(baseRoute)
    }
    return route === req.nextUrl.pathname
  })

  // Si el header x-error-status es 400, redirige según el estado del usuario
  if (req.headers.get('x-error-status') === '400') {
    res = NextResponse.redirect(
      new URL(user ? '/home' : '/', req.url),
      { status: 303 }
    )
    res.headers.delete('x-middleware-set-cookie')
    return res
  }

  if (!user && !isPublicRoute) {
    res = NextResponse.redirect(new URL('/', req.url), { status: 303 })
    res.headers.delete('x-middleware-set-cookie')
    return res
  }
*/
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|videos/).*)']
}
