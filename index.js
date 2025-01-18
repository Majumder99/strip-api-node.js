require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index.ejs", { title: "Home" });
});

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });
  console.log(session);
  res.redirect(session.url);
});

app.get("/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session);
  res.send("Payment Success");
});

app.get("/cancel", async (req, res) => {
  // res.render("cancel.ejs", { title: "Cancel" });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
