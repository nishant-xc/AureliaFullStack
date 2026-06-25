import notificationService from "./notification.service.js";
import { getIO } from "../../../socket/socket.js";
import { NOTIFICATION_TYPES } from "../../../shared/constants/index.js";
import { logger } from "../../../shared/logger/index.js";

export async function sendNotification({
    user_id,
    title,
    message,
    type = NOTIFICATION_TYPES.SYSTEM,
    metadata = null,
}) {
    try {
        const notification = await notificationService.create({
            user_id,
            title,
            message,
            type,
            metadata,
        });

        try {
            const io = getIO();

            io.to(`user:${user_id}`).emit("notification:new", notification);

            logger.info(`Notification emitted to user:${user_id}`);
        } catch (socketError) {
            logger.error({
                error: socketError.message,
            });
        }

        return notification;
    } catch (error) {
        logger.error({
            error: error.message,
        });

        throw error;
    }
}
