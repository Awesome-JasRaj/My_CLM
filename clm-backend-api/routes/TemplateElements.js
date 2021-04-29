const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Routes = require("../constants/routeConstants");
const TemplateElementsServices = require("../services/TemplateElements");
const ValidationServices = require("../services/ValidationServices");
router.use(bodyParser.json());

router
  .route(Routes["TEMPLATE_DATA"])
  .all(ValidationServices["TemplateId"])
  .get(TemplateElementsServices["GetTemplateData"])
  .put(TemplateElementsServices["UpdateTemplateElements"]);

router
  .route(Routes["DIAGRAM_DATA"])
  .all(ValidationServices["TemplateId"])
  .get(TemplateElementsServices["GetTemplateElements"]);

router
  .route(Routes["GLOBAL_NODES"])
  .get(TemplateElementsServices["FetchGlobalNodes"])
  .post(TemplateElementsServices["AddGlobalNodes"]);

module.exports = router;
