import addressRepository from "../repositories/address.repository.js";

class AddressService {
    async create(userId, data) {
        if (data.is_default) {
            await addressRepository.clearDefault(userId);
        }

        return await addressRepository.create({
            ...data,
            user_id: userId,
        });
    }

    async getAll(userId) {
        return await addressRepository.getAll(userId);
    }

    async getById(id) {
        return await addressRepository.getById(id);
    }

    async update(id, userId, data) {
        if (data.is_default) {
            await addressRepository.clearDefault(userId);
        }

        return await addressRepository.update(id, data);
    }

    async delete(id) {
        await addressRepository.delete(id);

        return true;
    }
}

export default new AddressService();
