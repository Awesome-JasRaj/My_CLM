const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Routes = require("../constants/routeConstants");
const TemplateServices = require("../services/Templates");
const ValidationServices = require("../services/ValidationServices");
router.use(bodyParser.json());

router
  .route(Routes["MY_TEMPLATES"])
  .all(ValidationServices["TemplateType"])
  .put(TemplateServices["FetchTemplates"])
  .post(TemplateServices["CreateTemplate"]);

router
  .route(Routes["TEMPLATE"])
  .all(ValidationServices["TemplateId"])
  .post(TemplateServices["EditTemplate"])
  .put(TemplateServices["PublishTemplate"])
  .delete(TemplateServices["DeleteTemplate"]);

router
  .route(Routes["LICENSE_AUTHORITIES"])
  .get(TemplateServices["FetchLicenseAuthority"]);

module.exports = router;
