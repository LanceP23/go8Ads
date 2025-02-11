const createEntity = async (Model, data) => {
    try {
        const newEntity = new Model(data);
        await newEntity.save();
        return newEntity;
    } catch (error) {
        throw error;
    }
};

const getEntityById = async (Model, id) => {
    try {
        const entity = await Model.findById(id);
        return entity;
    } catch (error) {
        throw error;
    }
};

const getAllEntities = async (Model) => {
    try {
        const entities = await Model.find();
        return entities;
    } catch (error) {
        throw error;
    }
};

const updateEntity = async (Model, id, data) => {
    try {
        const updatedEntity = await Model.findByIdAndUpdate(id, data, { new: true });
        return updatedEntity;
    } catch (error) {
        throw error;
    }
};

const deleteEntity = async (Model, id) => {
    try {
        const deletedEntity = await Model.findByIdAndDelete(id);
        return deletedEntity;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createEntity,
    getEntityById,
    getAllEntities,
    updateEntity,
    deleteEntity
};
