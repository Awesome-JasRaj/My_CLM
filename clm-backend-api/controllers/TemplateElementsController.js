const TemplateData = require("../models/TemplateData");
const DiagramFlow = require("../models/DiagramFlow");
const GlobalNodes = require("../models/GlobalNodes");
const LicenseAuthority = require("../models/LicenseAuthority");
const TemplateElementsController = {
  createTemplateData: async (templateData) => {
    try {
      let tempData = await TemplateData.create(templateData);
      return tempData;
    } catch (err) {
      throw err;
    }
  },
  deleteTemplateData: async (attribute_value_pair) => {
    try {
      let tempData = await TemplateData.findOneAndDelete(attribute_value_pair);
      return tempData;
    } catch (err) {
      throw err;
    }
  },
  createDiagramFlowData: async (diagramFlowData) => {
    try {
      let diagram = await DiagramFlow.create(diagramFlowData);
      return diagram;
    } catch (err) {
      throw err;
    }
  },
  deleteDiagramFlowData: async (attribute_value_pair) => {
    try {
      let tempData = await DiagramFlow.findOneAndDelete(attribute_value_pair);
      return tempData;
    } catch (err) {
      throw err;
    }
  },
  createGlobalNode: async (node) => {
    try {
      let myNode = await GlobalNodes.create(node);
      return myNode;
    } catch (err) {
      throw err;
    }
  },
  getGlobalNodes: async (attribute_value_pair) => {
    try {
      let nodes = await GlobalNodes.find(attribute_value_pair);
      return nodes;
    } catch (err) {
      throw err;
    }
  },
  createLicenseAuthority: async (attribute_value_pair) => {
    try {
      let authorities = await LicenseAuthority.create(attribute_value_pair);
      return authorities;
    } catch (err) {
      throw err;
    }
  },
  fetchLicenseAuthorities: async (attribute_value_pair) => {
    try {
      let authorities = await LicenseAuthority.find(attribute_value_pair);
      return authorities;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = TemplateElementsController;
