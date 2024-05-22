import Stripe from 'stripe';

export const makeStripe = async (items) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const lineItemArray = [];

  await items.map(async (item) => {
    const price = parseFloat(item.price);
    if (isNaN(price)) {
      throw new ApiError(500, `Invalid price for item: ${item.name}`);
    }

    const unitAmount = Math.floor(price * 100);
    if (!Number.isInteger(unitAmount)) {
      throw new ApiError(
        500,
        `Invalid unit amount for item: ${item.name}, Price: ${item.price}`
      );
    }

    const lineItem = {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
    lineItemArray.push(lineItem);
  });

  const successUrl = process.env.STRIPE_SUCCESS_URL;
  const cancelURL = process.env.STRIPE_CANCEL_URL;
  const sessionData = {
    payment_method_types: ['card'],
    line_items: lineItemArray,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelURL,
  };

  const session = await stripe.checkout.sessions.create(sessionData);
  if (!session) {
    throw new ApiError(500, 'something went worng');
  }
  return session;
};
