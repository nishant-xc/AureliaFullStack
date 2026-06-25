export const ROLES = {
    CUSTOMER: "customer",
    RESTAURANT: "restaurant",
    DELIVERY: "delivery",
    ADMIN: "admin",
    SUPER_ADMIN: "super_admin",
};

export const ORDER_STATUS = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    PREPARING: "preparing",
    READY: "ready",
    OUT_FOR_DELIVERY: "out_for_delivery",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
};

export const PAYMENT_STATUS = {
    PENDING: "pending",
    PAID: "paid",
    FAILED: "failed",
    REFUNDED: "refunded",
};

export const NOTIFICATION_TYPES = {
    SYSTEM: "system",
    ORDER: "order",
    PAYMENT: "payment",
    PROMOTION: "promotion",
};

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
