const TemplateValidations = require("../utils/TemplateValidations");
const ValidationServices = {
  TemplateType: async(req, res, next) => {
      const TemplateType = req.params.templateType;
    try {
        await TemplateValidations["TemplateType"](TemplateType);
        next();
    }
    catch(err) {
        res.status(400).json({error: err});
    }
  },
  TemplateId: async(req,res,next) => {
    const TemplateId = req.params.templateId;
    try {
        await TemplateValidations["TemplateId"](TemplateId);
        next();
    }
    catch(err) {
        res.status(400).json({error: err});
    }
  }
};
module.exports = ValidationServices;
