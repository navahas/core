import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export async function POST (request) {
  const { sessionId } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

  console.log(lineItems)

  return NextResponse.json({ success: true })
}
