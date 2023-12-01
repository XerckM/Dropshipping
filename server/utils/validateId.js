const mongoose = require('mongoose');

const validateId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        throw new Error("account invalid or not found");
    }
};

module.exports = { validateId };