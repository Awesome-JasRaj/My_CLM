const Joi = require("@hapi/joi");

const TemplateValidationSchema = Joi.object().keys({
  templateType: Joi.string().valid("GRC", "CLM").required(),
  state: Joi.string().min(3),
  license: Joi.string(),
  city: Joi.string().min(3),
  zone: Joi.string(),
  lastModified: Joi.date().default(Date.now),
  createdAt: Joi.data.default(Date.now),
  name: Joi.string().alphanum().required(),
  status: Joi.string().valid("Draft", "Published").required(),
  description: Joi.string().default("No Description"),
  data: Joi.array().default([]),
  diagramFlow: Joi.array().default([]),
});
const options = { abortEarly: false, convert: false };

const ValidateTemplate = (data) => {
  Joi.validate(data, TemplateValidationSchema, options);
};

module.exports = ValidateTemplate;
