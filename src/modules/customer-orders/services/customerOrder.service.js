import {
    getCustomerOrders,
    getCustomerOrderById,
    getOrderTimeline,
    getOrderTracking,
} from "../repositories/customerOrder.repository.js";

class CustomerOrderService {
    async getOrders(userId) {
        return await getCustomerOrders(userId);
    }

    async getOrderById(orderId, userId) {
        const order = await getCustomerOrderById(orderId, userId);

        if (!order) {
            const error = new Error("Order not found");
            error.status = 404;

            throw error;
        }

        return order;
    }

    async getTimeline(orderId, userId) {
        return await getOrderTimeline(orderId, userId);
    }

    async getTracking(orderId, userId) {
        const order = await getOrderTracking(orderId, userId);

        if (!order) {
            const error = new Error("Order not found");
            error.status = 404;

            throw error;
        }

        const progressMap = {
            pending: 10,
            accepted: 25,
            preparing: 50,
            ready: 70,
            out_for_delivery: 90,
            delivered: 100,
            cancelled: 0,
        };

        const etaMap = {
            pending: "Waiting for restaurant",
            accepted: "25-30 mins",
            preparing: "20 mins",
            ready: "10 mins",
            out_for_delivery: "5-10 mins",
            delivered: "Delivered",
            cancelled: "Cancelled",
        };

        return {
            current_status: order.status,
            progress: progressMap[order.status] ?? 0,
            estimated_delivery: etaMap[order.status] ?? "Unknown",
        };
    }
}

export default new CustomerOrderService();
