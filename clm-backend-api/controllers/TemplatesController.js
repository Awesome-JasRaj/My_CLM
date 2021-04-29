const Templates = require("../models/Templates");
const TemplatesController = {
  getAllTemplates: async (params, fields) => {
    try {
      const templates = await Templates.find(
        params,
        fields
      );
      return templates;
    } catch (err) {
      throw err;
    }
  },
  getTemplate: async (attribute_value_pair, populateFields = null) => {
    try {
      let template = await Templates.findOne(attribute_value_pair);
      if (template && populateFields) {
        await Promise.all(
          populateFields.map(async (val) => {
            template = await template.populate(val).execPopulate();
          })
        );
      }
      return template;
    } catch (err) {
      throw err;
    }
  },
  editTemplate: async (attribute_value_pair, update) => {
    try {
      const updatedTemplate = await Templates.findOneAndUpdate(
        attribute_value_pair,
        update,
        { new: true }
      );
      return updatedTemplate;
    } catch (err) {
      throw err;
    }
  },
  createTemplate: async (templateDetails) => {
    try {
      const myTemplate = await Templates.create(templateDetails);
      return myTemplate;
    } catch (err) {
      throw err;
    }
  },
  deleteTemplate: async (attribute_value_pair) => {
    try {
      const template = await Templates.findOneAndDelete(attribute_value_pair);
      return template;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = TemplatesController;
