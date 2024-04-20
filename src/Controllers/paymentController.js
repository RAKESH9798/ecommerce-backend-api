const paymentView = require("../Views/paymentView.js");

const createPaymentLink=async(req,res)=>{
    try {
        const paymentLink=await paymentView.createPaymentLink(req.params.id);
        return res.status(200).send(paymentLink);
    } catch (error) {
        return res.status(500).send(erroe.message);
    }
}

const updatePaymentInformation=async(req,res)=>{
    try {
        await paymentView.updatePaymentInformation(req.query);
        return res.status(200).send({message:"payment information updated",status:success});
    } catch (error) {
        return res.status(500).send(erroe.message);
    }
}

module.exports={createPaymentLink,updatePaymentInformation};