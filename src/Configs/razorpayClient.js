const Razorpay = require('razorpay');

const apiKey="rzp_test_gm9WMeYGuIIdQQ";
const apiSecret="CVdU7dcuRNxy50Iq5NAb1787";

var razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports={razorpay};