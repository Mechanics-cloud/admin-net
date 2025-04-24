import createMiddleware from 'next-intl/middleware'
import { routing } from '@/src/appLayer/translate/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
