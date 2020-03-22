const Joi = require("@hapi/joi");

const validateUser = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    newPassword: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};

module.exports = validateUser;
