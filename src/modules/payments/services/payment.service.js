import {
    createPayment,
    getPaymentById,
    getPaymentByOrderId,
    updatePaymentStatus,
    createPaymentLog,
    getActivePaymentByOrderId,
    getOrderById,
} from "../repositories/payment.repository.js";

import {
    PAYMENT_STATUS,
    PAYMENT_METHOD,
    PAYMENT_PROVIDER,
} from "../../../shared/constants/paymentStatus.js";

import NotFoundError from "../../../shared/errors/NotFoundError.js";
import AuthorizationError from "../../../shared/errors/AuthorizationError.js";
import ConflictError from "../../../shared/errors/ConflictError.js";

class PaymentService {
    /*
    |--------------------------------------------------------------------------
    | Create Payment
    |--------------------------------------------------------------------------
    */

    async create(data) {
        const order = await getOrderById(data.order_id);

        if (!order) {
            throw new NotFoundError("Order not found");
        }

        if (order.user_id !== data.user_id) {
            throw new AuthorizationError("You are not allowed to pay for this order");
        }

        const existingPayment = await getActivePaymentByOrderId(data.order_id);

        if (existingPayment) {
            throw new ConflictError("Payment already exists for this order");
        }

        let provider = PAYMENT_PROVIDER.INTERNAL;

        if (data.method === PAYMENT_METHOD.RAZORPAY) {
            provider = PAYMENT_PROVIDER.RAZORPAY;
        }

        if (data.method === PAYMENT_METHOD.STRIPE) {
            provider = PAYMENT_PROVIDER.STRIPE;
        }

        const payment = await createPayment({
            order_id: data.order_id,
            user_id: data.user_id,
            provider,
            transaction_id: null,
            payment_order_id: null,
            amount: data.amount,
            currency: "INR",
            status: PAYMENT_STATUS.PENDING,
            method: data.method,
            gateway_response: null,
        });

        await createPaymentLog(payment.id, "PAYMENT_CREATED", payment);

        return payment;
    }

    /*
    |--------------------------------------------------------------------------
    | Get Payment By ID
    |--------------------------------------------------------------------------
    */

    async getById(id) {
        return await getPaymentById(id);
    }

    /*
    |--------------------------------------------------------------------------
    | Get Payment By Order
    |--------------------------------------------------------------------------
    */

    async getByOrder(orderId) {
        return await getPaymentByOrderId(orderId);
    }

    /*
    |--------------------------------------------------------------------------
    | Verify Payment
    |--------------------------------------------------------------------------
    */

    async verify(id, transactionId) {
        const payment = await updatePaymentStatus(id, PAYMENT_STATUS.SUCCESS, transactionId);

        await createPaymentLog(id, "PAYMENT_SUCCESS", payment);

        return payment;
    }

    /*
    |--------------------------------------------------------------------------
    | Mark Payment Failed
    |--------------------------------------------------------------------------
    */

    async fail(id) {
        const payment = await updatePaymentStatus(id, PAYMENT_STATUS.FAILED);

        await createPaymentLog(id, "PAYMENT_FAILED", payment);

        return payment;
    }

    /*
    |--------------------------------------------------------------------------
    | Refund Payment
    |--------------------------------------------------------------------------
    */

    async refund(id) {
        const payment = await updatePaymentStatus(id, PAYMENT_STATUS.REFUNDED);

        await createPaymentLog(id, "PAYMENT_REFUNDED", payment);

        return payment;
    }
}

export default new PaymentService();
