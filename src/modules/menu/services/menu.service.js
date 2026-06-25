import menuRepository from "../repositories/menu.repository.js";
import { generateUniqueSlug } from "../../../shared/utils/slugify.js";

class MenuService {
    async create(data) {
        data.slug = await generateUniqueSlug(menuRepository, data.name);

        return await menuRepository.create(data);
    }

    async getAll() {
        return await menuRepository.getAll();
    }

    async getBySlug(slug) {
        return await menuRepository.getBySlug(slug);
    }

    async getByCategory(categoryId) {
        return await menuRepository.getByCategory(categoryId);
    }

    async update(id, data) {
        if (data.name) {
            data.slug = await generateUniqueSlug(menuRepository, data.name, id);
        }

        return await menuRepository.update(id, data);
    }

    async delete(id) {
        return await menuRepository.delete(id);
    }
}

export default new MenuService();
