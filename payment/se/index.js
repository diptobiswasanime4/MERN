import express from "express";
import razorpay from "razorpay";
import cors from "cors";
import crypto from "crypto";

const PORT = 3000;
const RAZOR_KEY = "rzp_test_irAVlHzZ2Osf1T";
const RAZOR_SECRET = "H3yQjSQgbczoYxiZ3JX6NxHP";

const createRazorpayInstance = () => {
  return new razorpay({
    key_id: RAZOR_KEY,
    key_secret: RAZOR_SECRET,
  });
};

const razorpayInstance = createRazorpayInstance();

const app = express();

app.use(express.json());
app.use(cors());

async function createOrder(req, res) {}

async function verifyPayment(req, res) {}

app.get("/health", (req, res) => {
  res.json({ msg: "API health is ok ok", success: false });
});

app.post("/createOrder", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_1",
  };

  console.log(options);

  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: "Something went wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    return status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

app.post("/verifyPayment", async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const secret = RAZOR_SECRET;

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(order_id + "|" + payment_id);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature == signature) {
    return res.status(200).json({
      success: true,
      msg: "Payment verified",
    });
  } else {
    return res.status(400).json({
      success: false,
      msg: "Payment not verified",
    });
  }
});

app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});
