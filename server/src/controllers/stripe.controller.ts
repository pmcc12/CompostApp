import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';
// Prisma
const prisma = new PrismaClient();
// Stripe
const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeCheckout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topUpAmount, sellerId } = req.body;
    if (!topUpAmount) {
      throw new createError.NotFound('Need to provide topUpAmount in body');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Top Up',
            },
            unit_amount: topUpAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:${process.env.CLIENT_PORT}/details/${sellerId}`,
      // success_url: `http://localhost:${process.env.CLIENT_PORT}/payment/success`,
      cancel_url: `http://localhost:${process.env.CLIENT_PORT}/payment/cancel`,
    });

    console.log('Do something');
    // console.log('variables inside controller ', userId, topUpAmount, sellerId);
    // ADD BALANCE

    res.json({ url: session.url });
    // res.redirect(303, session.url);
  } catch (e: any) {
    next(createError(e.statusCode, e.message));
  }
};

const endpointSecret = process.env.STRIPE_SIGN_SECRET;

const stripeWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  //   console.log(endpointSecret);

  try {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (e: any) {
      res.status(400).send(`Webhook Error: ${e.message}`);
      return;
    }
    // Handle the event
    switch (event.type) {
      case 'charge.succeeded':
        const charge = event.data.object;
        // console.log(charge);
        // Find User
        const user = await prisma.user.findUnique({
          where: {
            email: charge.billing_details.email,
          },
        });
        // Update User
        let userEmail: any;
        if (user) {
          userEmail = user.email;
        } else {
          throw new createError.NotFound(
            `${charge.billing_details.email} email doesn't exist in database`
          );
        }
        const updatedUser = await prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            balance: {
              increment: charge.amount,
            },
          },
          select: {
            balance: true,
          },
        });

        // Then define and call a function to handle the event charge.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({
      status: true,
      message: 'Top Up successful',
      data: null,
    });
  } catch (e: any) {
    next(createError(e.statusCode, e.message));
  }
};

export { stripeCheckout, stripeWebhook };
