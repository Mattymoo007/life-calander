import { NextApiRequest, NextApiResponse } from 'next'
import getRawBody from 'raw-body'
import Stripe from 'stripe'
import { updateUserPremium } from '~/utils/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function checkoutsWebhooksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const rawBody = await getRawBody(req)
    const signature = req.headers['stripe-signature']!
    const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

    let event: Stripe.Event

    try {
      event = stripe?.webhooks.constructEvent(rawBody, signature, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      if (err! instanceof Error) console.log(err)
      console.log(`❌ Error message: ${errorMessage}`)
      res.status(400).send(`Webhook Error: ${errorMessage}`)
      return
    }

    // Successfully constructed event.
    const subscriptionObj = event.data.object as Stripe.Subscription
    const customerId = subscriptionObj.customer as string

    // Cast event data to Stripe object.
    if (event.type === 'customer.subscription.deleted') {
      updateUserPremium(customerId, false)
      console.log(`🔔 Customer ${customerId} cancelled their subscription.`)
    } else if (event.type === 'customer.subscription.updated') {
      // update isPremium field for customer
      const user = await updateUserPremium(customerId, true)
      console.log(`🔔 Customer ${user.email} updated their subscription.`)
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
