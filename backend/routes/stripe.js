const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
//const KEY = process.env.STRIPE_KEY
const KEY = "sk_test_51L71WzKV5ghIcaS2hRabMNRCgDC9Psz6p5lc7dzNq7aq4hnsVUd1L0Zx5c2KsqvR6R9blzCb6MPip8f2dlbEKXMG00dFmRmVse"
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;
