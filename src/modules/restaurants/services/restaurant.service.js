import {
    createRestaurant,
    getRestaurants,
    getRestaurantBySlug,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    restaurantSlugExists,
    restaurantSlugExistsExceptId,
} from "../repositories/restaurant.repository.js";

import AppError from "../../../shared/errors/AppError.js";

import { generateSlug } from "../../../shared/utils/slug.js";

class RestaurantService {
    async create(ownerId, data) {
        const slug = generateSlug(data.name);

if (await restaurantSlugExists(slug)) {
    throw new AppError("Restaurant slug already exists", 409);
}

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
    throw new AppError("Restaurant not found", 404);
}

        return restaurant;
    }

    async update(id, ownerId, data) {
        const restaurant = await getRestaurantById(id);

        if (!restaurant) {
    throw new AppError("Restaurant not found", 404);
}

        if (restaurant.owner_id !== ownerId) {
    throw new AppError(
        "You are not authorized to delete this restaurant",
        403
    );
}

if (data.name && data.name !== restaurant.name) {
   const newSlug = generateSlug(data.name);

    if (await restaurantSlugExistsExceptId(newSlug, id)) {
        throw new AppError("Restaurant slug already exists", 409);
    }

    data.slug = newSlug;
}

return await updateRestaurant(id, {
    slug: data.slug ?? restaurant.slug,
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
    throw new AppError("Restaurant not found", 404);
}

        if (restaurant.owner_id !== ownerId) {
    throw new AppError(
        "You are not authorized to delete this restaurant",
        403
    );
}

        await deleteRestaurant(id);

        return true;
    }
}

export default new RestaurantService();
