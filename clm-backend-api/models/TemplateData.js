const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TemplateDataSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    default: "No Section",
  },
  isMandatory: {
    type: Boolean,
    default: false,
  },
  key: {
    type: String,
    required: true,
  },
  subsection: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  defaultValue: {
    type: String,
  },
  defaultSelections: {
    type: Array,
  },
  options: {
    type: Array,
  },
  type: {
    type: String,
    required: true,
  },
  isDependent: {
    type: Boolean,
  },
});

var TemplateData = mongoose.model("TemplateData", TemplateDataSchema);
module.exports = TemplateData;
