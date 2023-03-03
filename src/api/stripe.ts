import { loadStripe } from '@stripe/stripe-js'
import settings from 'src/settings'

export const stripePromise = loadStripe(settings.stripe.publicKey)
