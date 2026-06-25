import {
    getRestaurantOrders,
    getRestaurantOrderById,
    updateOrderStatus,
} from "../repositories/restaurantOrder.repository.js";

import { sendNotification } from "../../notifications/services/notification.helper.js";

import { ORDER_STATUS, NOTIFICATION_TYPES } from "../../../shared/constants/index.js";

import NotFoundError from "../../../shared/errors/NotFoundError.js";

class RestaurantOrderService {
    async getOrders(ownerId, status = null) {
        return await getRestaurantOrders(ownerId, status);
    }

    async getOrderById(orderId, ownerId) {
        const order = await getRestaurantOrderById(orderId, ownerId);

        if (!order) {
            throw new NotFoundError("Order not found");
        }

        return order;
    }

    async updateStatus(orderId, ownerId, status, remarks = null) {
        const existingOrder = await getRestaurantOrderById(orderId, ownerId);

        if (!existingOrder) {
            throw new NotFoundError("Order not found");
        }

        const updatedOrder = await updateOrderStatus(orderId, ownerId, status, remarks);

        const titleMap = {
            [ORDER_STATUS.ACCEPTED]: "Order Accepted",
            [ORDER_STATUS.PREPARING]: "Order is Being Prepared",
            [ORDER_STATUS.READY]: "Order Ready",
            [ORDER_STATUS.OUT_FOR_DELIVERY]: "Order Out for Delivery",
            [ORDER_STATUS.DELIVERED]: "Order Delivered",
            [ORDER_STATUS.CANCELLED]: "Order Cancelled",
        };

        const messageMap = {
            [ORDER_STATUS.ACCEPTED]: `Your order ${updatedOrder.order_number} has been accepted.`,

            [ORDER_STATUS.PREPARING]: `Your order ${updatedOrder.order_number} is being prepared.`,

            [ORDER_STATUS.READY]: `Your order ${updatedOrder.order_number} is ready.`,

            [ORDER_STATUS.OUT_FOR_DELIVERY]: `Your order ${updatedOrder.order_number} is out for delivery.`,

            [ORDER_STATUS.DELIVERED]: `Your order ${updatedOrder.order_number} has been delivered.`,

            [ORDER_STATUS.CANCELLED]: `Your order ${updatedOrder.order_number} has been cancelled.`,
        };

        if (titleMap[status]) {
            await sendNotification({
                user_id: updatedOrder.user_id,
                title: titleMap[status],
                message: messageMap[status],
                type: NOTIFICATION_TYPES.ORDER,
                metadata: {
                    order_id: updatedOrder.id,
                    status,
                },
            });
        }

        return updatedOrder;
    }
}

export default new RestaurantOrderService();
