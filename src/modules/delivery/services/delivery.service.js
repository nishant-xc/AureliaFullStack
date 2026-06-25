import {
    createDeliveryPartner,
    getPartnerByUserId,
    updateOnlineStatus,
    updateLocation,
    getAvailablePartners,
    assignOrder,
    getAssignmentByOrder,
} from "../repositories/delivery.repository.js";

import ConflictError from "../../../shared/errors/ConflictError.js";
import NotFoundError from "../../../shared/errors/NotFoundError.js";
import ValidationError from "../../../shared/errors/ValidationError.js";

class DeliveryService {
    async register(userId, data) {
        const existing = await getPartnerByUserId(userId);

        if (existing) {
            throw new ConflictError("Delivery partner already registered");
        }

        return await createDeliveryPartner({
            user_id: userId,
            full_name: data.full_name,
            phone: data.phone,
            vehicle_type: data.vehicle_type,
            vehicle_number: data.vehicle_number,
        });
    }

    async goOnline(userId) {
        const partner = await getPartnerByUserId(userId);

        if (!partner) {
            throw new NotFoundError("Delivery partner not found");
        }

        return await updateOnlineStatus(partner.id, true);
    }

    async goOffline(userId) {
        const partner = await getPartnerByUserId(userId);

        if (!partner) {
            throw new NotFoundError("Delivery partner not found");
        }

        return await updateOnlineStatus(partner.id, false);
    }

    async updateCurrentLocation(userId, latitude, longitude) {
        const partner = await getPartnerByUserId(userId);

        if (!partner) {
            throw new NotFoundError("Delivery partner not found");
        }

        return await updateLocation(partner.id, latitude, longitude);
    }

    async assign(orderId) {
        const assignment = await getAssignmentByOrder(orderId);

        if (assignment) {
            throw new ConflictError("Order already assigned");
        }

        const partners = await getAvailablePartners();

        if (partners.length === 0) {
            throw new ValidationError("No delivery partner available");
        }

        return await assignOrder(orderId, partners[0].id);
    }

    async getAssignment(orderId) {
        const assignment = await getAssignmentByOrder(orderId);

        if (!assignment) {
            throw new NotFoundError("Assignment not found");
        }

        return assignment;
    }
}

export default new DeliveryService();
