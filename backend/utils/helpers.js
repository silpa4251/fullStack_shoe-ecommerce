const CustomError = require("./customError");

//Helper function for validating joi
const validateInput = (validationFn, data) => {
    const { error } = validationFn(data);
    if (error) throw new CustomError(error.details[0].message, 400);
};


//Helper function for generating successfull response
const generateResponse = (res, statusCode, message, data = {}) => {
    res.status(statusCode).json({ status: "success", message,data:{ ...data }});
};

module.exports = { validateInput, generateResponse };