const Joi = require("@hapi/joi");

const DiagramFlowValidationSchema = Joi.object().keys({
  id: Joi.string().alphanum().required(),
  type: Joi.string().required(),
  position: Joi.object().default({ x: 250, y: 50 }),
  style: Joi.object(),
  source: Joi.string().alphanum(),
  target: Joi.string().alphanum(),
});
const options = { abortEarly: false, convert: false };

const ValidateDiagramFlow = (data) => {
  Joi.validate(data, DiagramFlowValidationSchema, options);
};

module.exports = ValidateDiagramFlow;
