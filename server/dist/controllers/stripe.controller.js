"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.stripeCheckout = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const aws_ses_1 = __importDefault(require("../utils/aws-ses"));
// Prisma
const prisma = new client_1.PrismaClient();
// Stripe
const stripe = require('stripe')(process.env.STRIPE_KEY);
const stripeCheckout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topUpAmount, sellerId } = req.body;
        if (!topUpAmount) {
            throw new http_errors_1.default.NotFound('Need to provide topUpAmount in body');
        }
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Top Up',
                        },
                        unit_amount: topUpAmount * 100,
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
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.stripeCheckout = stripeCheckout;
// const stripeCheckout = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { sellerId, topUpAmount } = req.body;
//     console.log('body ', req.body);
//     console.log('sellerId inside controller ', sellerId);
//     console.log('topupamount inside controller', topUpAmount);
//     if (!topUpAmount) {
//       throw new createError.NotFound('Need to provide topUpAmount in body');
//     }
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'eur',
//             product_data: {
//               name: 'Top Up',
//             },
//             unit_amount: 10 * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       // success_url: `http://localhost:${process.env.CLIENT_PORT}/details/${sellerId}`,
//       success_url: `http://localhost:${process.env.CLIENT_PORT}/payment/success`,
//       cancel_url: `http://localhost:${process.env.CLIENT_PORT}/payment/cancel`,
//     });
//     console.log('Do something');
//     // console.log('variables inside controller ', userId, topUpAmount, sellerId);
//     // ADD BALANCE
//     // res.json({ url: session.url });
//     res.redirect(303, session.url);
//   } catch (e: any) {
//     next(createError(e.statusCode, e.message));
//   }
// };
const endpointSecret = process.env.STRIPE_SIGN_SECRET;
const stripeWebhook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    //   console.log(endpointSecret);
    try {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        }
        catch (e) {
            res.status(400).send(`Webhook Error: ${e.message}`);
            return;
        }
        // Handle the event
        switch (event.type) {
            case 'charge.succeeded':
                const charge = event.data.object;
                // console.log(charge);
                // Find User
                const user = yield prisma.user.findUnique({
                    where: {
                        email: charge.billing_details.email,
                    },
                });
                // Update User
                let userEmail;
                if (user) {
                    userEmail = user.email;
                }
                else {
                    throw new http_errors_1.default.NotFound(`${charge.billing_details.email} email doesn't exist in database`);
                }
                const updatedUser = yield prisma.user.update({
                    where: {
                        email: userEmail,
                    },
                    data: {
                        balance: {
                            increment: charge.amount / 100,
                        },
                    },
                    select: {
                        balance: true,
                    },
                });
                // Send Email
                yield (0, aws_ses_1.default)(userEmail, user.username, charge.amount / 100, updatedUser.balance, charge.payment_method_details);
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
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
});
exports.stripeWebhook = stripeWebhook;
