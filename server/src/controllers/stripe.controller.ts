import { Request, Response, NextFunction } from 'express';
import * as auth from '../services/auth.service';
import createError from 'http-errors';
// Stripe
const stripe = require('stripe')(process.env.STRIPE_KEY)



const stripeCheckout = async (req: Request, res: Response, next: NextFunction) => {

    console.log(process.env.STRIPE_KEY)

    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:${process.env.PORT}/payment/success`,
        cancel_url: `http://localhost:${process.env.PORT}/payment/cancel`,
        });

        console.log('Do something')
        // ADD BALANCE


        res.redirect(303, session.url);
    }
    catch (e: any) {
        next(createError(e.statusCode, e.message))
    }
}

export { stripeCheckout };