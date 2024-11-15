const CustomError = require("./customError");

const validateInput = (validationFn, data) => {
    const { error } = validationFn(data);
    if (error) throw new CustomError(error.details[0].message, 400);
};

const generateResponse = (res, statusCode, message, data = {}) => {
    res.status(statusCode).json({ status: "success", message, ...data });
};

module.exports = { validateInput, generateResponse };