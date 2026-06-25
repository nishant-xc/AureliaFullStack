import {
    createNotification,
    getUserNotifications,
    getNotificationById,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} from "../repositories/notification.repository.js";

class NotificationService {
    async create(data) {
        return await createNotification(data);
    }

    async getAll(userId) {
        return await getUserNotifications(userId);
    }

    async getById(id, userId) {
        const notification = await getNotificationById(id, userId);

        if (!notification) {
            const error = new Error("Notification not found");
            error.status = 404;

            throw error;
        }

        return notification;
    }

    async markAsRead(id, userId) {
        const notification = await markNotificationAsRead(id, userId);

        if (!notification) {
            const error = new Error("Notification not found");
            error.status = 404;

            throw error;
        }

        return notification;
    }

    async markAllAsRead(userId) {
        await markAllNotificationsAsRead(userId);

        return {
            success: true,
        };
    }

    async delete(id, userId) {
        const notification = await getNotificationById(id, userId);

        if (!notification) {
            const error = new Error("Notification not found");
            error.status = 404;

            throw error;
        }

        await deleteNotification(id, userId);

        return {
            success: true,
        };
    }
}

export default new NotificationService();
