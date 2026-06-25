import {
    createRestaurant,
    getRestaurants,
    getRestaurantBySlug,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
} from "../repositories/restaurant.repository.js";

class RestaurantService {
    async create(ownerId, data) {
        const slug = data.name.trim().toLowerCase().replace(/\s+/g, "-");

        return await createRestaurant({
            owner_id: ownerId,

            name: data.name,

            slug,

            description: data.description || null,

            email: data.email || null,

            phone: data.phone || null,

            address: data.address,

            city: data.city,

            state: data.state,

            country: data.country,
        });
    }

    async getAll(page, limit) {
        return await getRestaurants(page, limit);
    }

    async getBySlug(slug) {
        const restaurant = await getRestaurantBySlug(slug);

        if (!restaurant) {
            const error = new Error("Restaurant not found");

            error.status = 404;

            throw error;
        }

        return restaurant;
    }

    async update(id, ownerId, data) {
        const restaurant = await getRestaurantById(id);

        if (!restaurant) {
            const error = new Error("Restaurant not found");

            error.status = 404;

            throw error;
        }

        if (restaurant.owner_id !== ownerId) {
            const error = new Error("You are not authorized to update this restaurant");

            error.status = 403;

            throw error;
        }

        return await updateRestaurant(id, {
            name: data.name,

            description: data.description,

            email: data.email,

            phone: data.phone,

            address: data.address,

            city: data.city,

            state: data.state,

            country: data.country,
        });
    }

    async delete(id, ownerId) {
        const restaurant = await getRestaurantById(id);

        if (!restaurant) {
            const error = new Error("Restaurant not found");

            error.status = 404;

            throw error;
        }

        if (restaurant.owner_id !== ownerId) {
            const error = new Error("You are not authorized to delete this restaurant");

            error.status = 403;

            throw error;
        }

        await deleteRestaurant(id);

        return true;
    }
}

export default new RestaurantService();
