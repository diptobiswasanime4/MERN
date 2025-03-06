import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const onPayment = async (price, itemName) => {
    try {
      const options = {
        amount: amount,
      };
      const resp = await axios.post(
        "http://localhost:3000/createOrder",
        options
      );
      const data = resp.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  async function submit() {}
  return (
    <main>
      <h1>API Payment Gateway</h1>
      <input
        type="number"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={onPayment}>Submit</button>
    </main>
  );
}

export default App;
