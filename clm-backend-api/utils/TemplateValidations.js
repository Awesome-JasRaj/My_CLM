const errorMessages = require("../constants/errorConstants");
const TemplateValidations = {
  /* Check for valid template type */
  TemplateType: (type) => {
    return new Promise((resolve, reject) => {
      if (type !== "GRC" && type !== "CLM")
        return reject(errorMessages["INAVLID_TEMPLATE_TYPE"]);
      return resolve();
    });
  },
  /* Check for a valid mongosoe object ID */
  TemplateId: (id) => {
    return new Promise((resolve, reject) => {
      if (id.match(/^[0-9a-f]{24}$/)) return resolve(id);
      return reject(errorMessages["INVALID_OBJECT_ID"]);
    });
  },
};

module.exports = TemplateValidations;
