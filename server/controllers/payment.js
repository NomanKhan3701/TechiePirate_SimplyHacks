const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const makePayment = async (req, res) => {
  const amount = Number(req.body.amount);
  
  const storeItems = new Map([
    [1, { priceInCents: amount * 100, name: "Donation" }],
  ]);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    console.log(session);
    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = { makePayment };
