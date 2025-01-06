// import axios from 'axios';
import PaymentInfos from '@assets/data/commands.json';

export const getTotalAmount = async () => {
    // Simule une requête API
    /*
    const response = await axios.get('https://api.exemple.com/totalAmount');
    return response.data;
    */
    const response = PaymentInfos;
    return PaymentInfos[0].total_amount;
}

export const getPaymentId = async () => {
    // Simule une requête API
    /*
    const response = await axios.get('https://api.exemple.com/paymentId');
    return response.data;
    */
    return PaymentInfos[0].command_id;
}