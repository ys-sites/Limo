/**
 * Configuration for FormSubmit (https://formsubmit.co)
 * Reservations and quote requests will be sent directly to this destination email.
 * 
 * Note: FormSubmit sends an initial one-time activation email to this address
 * when the first form is submitted. Simply click "Activate" in that email once.
 */
export const FORMSUBMIT_EMAIL = 'info@limoraf.com';

/**
 * Online Payment / Checkout link.
 * When the user sends their payment link, paste it here:
 * e.g. 'https://buy.stripe.com/...' or 'https://limoraf.com/checkout'
 * If empty, the "Book Now" buttons will open the instant reservation & dispatch system.
 */
export const ONLINE_PAYMENT_URL = '';
