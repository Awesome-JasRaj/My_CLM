const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TemplateData = require("./TemplateData");
const DiagramFlow = require("./DiagramFlow");
const LicenseAuthority = require("./LicenseAuthority");
var TemplateSchema = new Schema({
  templateType: {
    type: String,
    enum: ["GRC", "CLM"],
    required: true,
  },
  jurisdiction: {
    type: String,
    default: "Others",
  },
  state: {
    type: String,
  },
  license: {
    type: String,
  },
  district: {
    type: String,
  },
  zone: {
    type: String,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Drafted", "Published"],
  },
  description: {
    type: String,
    default: "No Description",
  },
  sections: {
    type: Array,
  },
  data: [
    {
      type: Schema.ObjectId,
      ref: TemplateData,
    },
  ],
  diagramFlow: [
    {
      type: Schema.ObjectId,
      ref: DiagramFlow,
    },
  ],
  licenseAuthority: {
    type: Schema.ObjectId,
    ref: LicenseAuthority,
  },
});

var Templates = mongoose.model("Template", TemplateSchema);
module.exports = Templates;
