const TemplateDetails = require("../utils/TemplateDetails");
const TemplatesController = require("../controllers/TemplatesController");
const TemplateElementsController = require("../controllers/TemplateElementsController");
const errorMessages = require("../constants/errorConstants");
const TempDetails = require("../utils/TemplateDetails");
const TemplateElements = {
  GetTemplateElements: async (req, res, next) => {
    const templateId = req.params.templateId;
    const template = await TemplatesController["getTemplate"](
      { _id: templateId },
      ["data", "diagramFlow"]
    );
    if (!template) {
      res.status(400).json({ error: errorMessages["INVALID_TEMPLATE"] });
      next();
    } else {
      if (!template.data.length && !template.diagramFlow.length) {
        res.status(204).json();
        next();
      } else {
        const myData = await TemplateDetails["TemplateData"](
          template.data,
          template.diagramFlow
        );
        res.status(200).json({ data: myData, sections: template.sections });
        next();
      }
    }
  },
  UpdateTemplateElements: async (req, res, next) => {
    const templateId = req.params.templateId;
    const template = await TemplatesController["getTemplate"]({
      _id: templateId,
    });
    if (!template) {
      res.status(400).json({ error: errorMessages["INVALID_TEMPLATE"] });
      next();
    } else {
      let dgData = req.body.diagramFlowData;
      let tempData = req.body.templateData;
      let sections = req.body.templateSections;
      let temp_ids = [];
      // Delete old template data(if any) before adding the new ones
      if (template.data.length) {
        await Promise.all(
          template.data.map(async (td) => {
            await TemplateElementsController["deleteTemplateData"]({ _id: td });
          })
        );
      }
      // Adding the new template data
      await Promise.all(
        tempData.map(async (data) => {
          let key = await TemplateDetails["GenerateKey"](data.heading);
          let newTemplateData = await TemplateElementsController[
            "createTemplateData"
          ]({ ...data, key });
          temp_ids.push(newTemplateData._id);
        })
      );
      // Deleting old diagram flow data(if any) before adding the new ones
      if (template.diagramFlow.length)
        await Promise.all(
          template.diagramFlow.map(async (dg) => {
            await TemplateElementsController["deleteDiagramFlowData"]({
              _id: dg,
            });
          })
        );
      // Adding new diagram flow data
      let dg_ids = [];
      await Promise.all(
        dgData.map(async (diagram) => {
          let dg = await TemplateElementsController["createDiagramFlowData"](
            diagram
          );
          dg_ids.push(dg._id);
        })
      );
      await TemplatesController["editTemplate"](
        { _id: templateId },
        { data: temp_ids, diagramFlow: dg_ids, sections: sections }
      );
      res.status(200).json();
      next();
    }
  },
  GetTemplateData: async (req, res, next) => {
    const templateId = req.params.templateId;
    const template = await TemplatesController["getTemplate"](
      { _id: templateId },
      ["data", "diagramFlow"]
    );
    if (!template) {
      res.status(400).json({ error: errorMessages["INVALID_TEMPLATE"] });
      next();
    } else {
      if (!template.data.length) {
        res.status(204).json();
        next();
      } else {
        const myData = await TemplateDetails["TemplateData"](
          template.data,
          template.diagramFlow
        );
        const previewData = await TemplateDetails["Preview"](myData);
        res.status(200).json({ templateData: previewData });
        next();
      }
    }
  },
  FetchGlobalNodes: async (req, res, next) => {
    const myNodes = await TemplateElementsController["getGlobalNodes"]({});
    if (!myNodes.length) {
      res.status(204).json();
      next();
    } else {
      res.status(200).json({ globalNodes: myNodes });
      next();
    }
  },
  
  /* Only add the global nodes which are unique. */
  AddGlobalNodes: async (req, res, next) => {
    let { globalNodes } = req.body;
    await Promise.all(
      globalNodes.map(async (node) => {
        const nodeKey = await TempDetails["GenerateKey"](node.data.heading);
        let nodes = await TemplateElementsController["getGlobalNodes"]({
          key: nodeKey,
        });
        if (!nodes.length) {
          const globalNode = { ...node, key: nodeKey };
          await TemplateElementsController["createGlobalNode"](globalNode);
        }
      })
    );
    res.status(200).json();
    next();
  },
};

module.exports = TemplateElements;
