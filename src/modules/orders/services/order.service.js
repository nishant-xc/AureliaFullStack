import pool from "../../../database/database.js";
import orderRepository from "../repositories/order.repository.js";
import couponService from "../../coupons/services/coupon.service.js";

import { PAYMENT_STATUS, ORDER_STATUS } from "../../../shared/constants/index.js";

import ValidationError from "../../../shared/errors/ValidationError.js";

class OrderService {
    generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 9000) + 1000;

        return `ORD-${timestamp}-${random}`;
    }

    async checkout(userId, paymentMethod = "COD", notes = null, couponCode = null) {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const cartResult = await client.query(
                `
                SELECT
                    c.*,
                    m.name
                FROM cart_items c
                JOIN menu_items m
                    ON c.menu_item_id = m.id
                WHERE c.user_id = $1
                `,
                [userId]
            );

            const cart = cartResult.rows;

            if (cart.length === 0) {
                throw new ValidationError("Cart is empty");
            }

            let subtotal = 0;

            for (const item of cart) {
                subtotal += Number(item.unit_price) * Number(item.quantity);
            }

            const deliveryFee = 40;

            let discount = 0;
            let coupon = null;

            if (couponCode) {
                const result = await couponService.validate(couponCode, userId, subtotal);

                coupon = result.coupon;
                discount = result.discount;
            }

            const taxableAmount = subtotal - discount;

            const tax = Number((taxableAmount * 0.05).toFixed(2));

            const total = taxableAmount + deliveryFee + tax;

            const order = await orderRepository.createOrder(client, {
                user_id: userId,
                restaurant_id: cart[0].restaurant_id,
                order_number: this.generateOrderNumber(),
                subtotal,
                delivery_fee: deliveryFee,
                tax,
                discount,
                total,
                payment_status: PAYMENT_STATUS.PENDING,
                payment_method: paymentMethod,
                notes,
            });

            for (const item of cart) {
                await orderRepository.createOrderItem(client, {
                    order_id: order.id,
                    menu_item_id: item.menu_item_id,
                    name: item.name,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    total_price: Number(item.unit_price) * Number(item.quantity),
                });
            }

            await orderRepository.addStatusHistory(client, order.id, ORDER_STATUS.PENDING);

            if (coupon) {
                await couponService.consume(client, coupon.id, userId, order.id, discount);
            }

            await client.query(
                `
                DELETE FROM cart_items
                WHERE user_id = $1
                `,
                [userId]
            );

            await client.query("COMMIT");

            return order;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}

export default new OrderService();
