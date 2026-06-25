import {
    createAdmin,
    getAdminByUserId,
    getDashboardStats,
} from "../repositories/admin.repository.js";

import ConflictError from "../../../shared/errors/ConflictError.js";
import NotFoundError from "../../../shared/errors/NotFoundError.js";

class AdminService {
    async register(userId, role = "admin") {
        const existing = await getAdminByUserId(userId);

        if (existing) {
            throw new ConflictError("User is already an admin");
        }

        return await createAdmin(userId, role);
    }

    async profile(userId) {
        const admin = await getAdminByUserId(userId);

        if (!admin) {
            throw new NotFoundError("Admin not found");
        }

        return admin;
    }

    async dashboard() {
        return await getDashboardStats();
    }
}

export default new AdminService();
