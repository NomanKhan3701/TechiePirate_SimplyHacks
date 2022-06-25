const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const makePayment = async (req, res) => {
  console.log("in");
  const storeItems = new Map([
    [1, { priceInCents: 100, name: "Learn React Today" }],
    [2, { priceInCents: 200, name: "Learn CSS Today" }],
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
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { makePayment };
