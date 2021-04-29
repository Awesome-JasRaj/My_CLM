const Joi = require("@hapi/joi");

const TemplateDataValidationSchema = Joi.object().keys({
  id: Joi.string().alphanum().required(),
  heading: Joi.string().alphanum().required(),
  section: Joi.string().alphanum(),
  subsection: Joi.string().alphanum(),
  placeholder: Joi.string().alphanum(),
  defaultValue: Joi.string().alphanum(),
  defailtSelections: Joi.array(),
  options: Joi.array(),
  type: Joi.string().required(),
  key: Joi.string().required(),
});
const options = { abortEarly: false, convert: false };

const ValidateTemplateData = (data) => {
  Joi.validate(data, TemplateDataValidationSchema, options);
};

module.exports = ValidateTemplateData;
