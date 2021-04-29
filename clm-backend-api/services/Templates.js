const TemplateDetails = require("../utils/TemplateDetails");
const TemplatesController = require("../controllers/TemplatesController");
const TemplateElementsController = require("../controllers/TemplateElementsController");
const errorMessages = require("../constants/errorConstants");
const Templates = {
  /* Divided into two divisons based on the type (GRC,CLM) since the parameters will be different for both. */
  CreateTemplate: async (req, res, next) => {
    const tempType = req.params.templateType;
    if (tempType == "GRC") {
      const {
        state,
        license,
        zone,
        jurisdiction,
        district,
        description,
      } = req.body;
      const templateName = await TemplateDetails["GRCTemplateName"](
        state,
        license,
        zone,
        district
      );
      const templates = await TemplatesController["getTemplate"]({
        state,
        license,
        zone,
        district,
        jurisdiction,
      });
      if (templates) {
        res
          .status(400)
          .json({ error: errorMessages["TEMPLATE_ALREADY_EXISTS"] });
        next();
      } else {
        const newTemplate = await TemplatesController["createTemplate"]({
          status: "Drafted",
          name: templateName,
          state: state,
          license: license,
          zone: zone,
          district: district,
          templateType: "GRC",
          description: description,
          jurisdiction: jurisdiction,
        });
        res.status(201).json({ templateId: newTemplate._id });
        next();
      }
    } else {
      const templateName = req.body.name;
      const templates = await TemplatesController["getTemplate"]({
        name: templateName,
      });
      if (templates) {
        res
          .status(400)
          .json({ error: errorMessages["TEMPLATE_ALREADY_EXISTS"] });
        next();
      } else {
        const templateDescription = req.body.description;
        const newTemplate = await TemplatesController["createTemplate"]({
          status: "Drafted",
          name: templateName,
          description: templateDescription,
          templateType: "CLM",
        });
        res.status(201).json({ templateId: newTemplate._id });
        next();
      }
    }
  },

  /* Edit template name,description (CLM) or state,zone,city,etc (GRC). Proper validations are added to make sure the name is always unique. */
  EditTemplate: async (req, res, next) => {
    const templateId = req.params.templateId;
    const templateType = req.body.templateType;
    let params;
    if (templateType == "CLM") {
      params = { name: req.body.name };
    } else {
      const { state, license, district, zone, jurisdiction } = req.body;
      const templateName = await TemplateDetails["GRCTemplateName"](
        state,
        license,
        zone,
        district
      );
      req.body.name = templateName;
      params = { state, license, district, zone, jurisdiction };
    }
    const template = await TemplatesController["getTemplate"](params);
    if (!template || (template && template._id == templateId)) {
      await TemplatesController["editTemplate"](
        { _id: templateId },
        { ...req.body, lastModified: Date.now() }
      );
      res.status(200).json();
      next();
    } else {
      res.status(400).json({ error: errorMessages["TEMPLATE_ALREADY_EXISTS"] });
      next();
    }
  },

  /* Fetch all templates at the start when the system loads. */
  FetchTemplates: async (req, res, next) => {
    const templateType = req.params.templateType;
    let params = ["name", "description"];
    if (templateType == "GRC") {
      params = [
        ...params,
        "license",
        "district",
        "zone",
        "state",
        "jurisdiction",
      ];
    }
    let searchParams = { templateType };
    for (key in req.body) {
      if (req.body[key]) {
        searchParams[key] = req.body[key];
      }
    }
    const myTemplates = await TemplatesController[
      "getAllTemplates"
    ](searchParams, ["_id", ...params, "status", "createdAt", "lastModified"]);
    if (!myTemplates.length) {
      res.status(204).json();
      next();
    } else {
      res.status(200).json(myTemplates);
      next();
    }
  },
  DeleteTemplate: async (req, res, next) => {
    const templateId = req.params.templateId;
    const template = await TemplatesController["getTemplate"]({
      _id: templateId,
    });
    if (!template) {
      res.status(400).json({ error: errorMessages["INVALID_TEMPLATE"] });
      next();
    } else {
      if (template.data.length) {
        await Promise.all(
          template.data.map(async (td) => {
            await TemplateElementsController["deleteTemplateData"]({ _id: td });
          })
        );
      }
      if (template.diagramFlow.length) {
        await Promise.all(
          template.diagramFlow.map(async (dg) => {
            await TemplateElementsController["deleteDiagramFlowData"]({
              _id: dg,
            });
          })
        );
      }
      await TemplatesController["deleteTemplate"]({
        _id: templateId,
      });
      res.status(200).json();
      next();
    }
  },

  /* Changing the status in the db to PUBLISH */
  PublishTemplate: async (req, res, next) => {
    const tempId = req.params.templateId;
    await TemplatesController["editTemplate"](
      {
        _id: tempId,
      },
      { status: "Published" }
    );
    res.status(200).json();
    next();
  },

  /* Fetch all the license authorities in the db. */
  FetchLicenseAuthority: async (req, res, next) => {
    const licenses = await TemplateElementsController[
      "fetchLicenseAuthorities"
    ]({});
    if (!licenses.length) {
      res.status(204).json();
      next();
    } else {
      res.status(200).json(licenses);
      next();
    }
  },
};
module.exports = Templates;
