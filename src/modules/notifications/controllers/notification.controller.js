import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import notificationService from "../services/notification.service.js";

export const create = asyncHandler(async (req, res) => {
    const notification = await notificationService.create(req.body);

    return ApiResponse.success(res, notification, "Notification created successfully", 201);
});

export const getAll = asyncHandler(async (req, res) => {
    const notifications = await notificationService.getAll(req.user.id);

    return ApiResponse.success(res, {
        total: notifications.length,
        notifications,
    });
});

export const getById = asyncHandler(async (req, res) => {
    const notification = await notificationService.getById(req.params.id, req.user.id);

    return ApiResponse.success(res, notification);
});

export const markAsRead = asyncHandler(async (req, res) => {
    const notification = await notificationService.markAsRead(req.params.id, req.user.id);

    return ApiResponse.success(res, notification, "Notification marked as read");
});

export const markAllAsRead = asyncHandler(async (req, res) => {
    await notificationService.markAllAsRead(req.user.id);

    return ApiResponse.success(res, null, "All notifications marked as read");
});

export const remove = asyncHandler(async (req, res) => {
    await notificationService.delete(req.params.id, req.user.id);

    return ApiResponse.success(res, null, "Notification deleted successfully");
});
