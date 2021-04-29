const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var DiagramFlowSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  position: {
    type: Object,
    default: { x: 250, y: 50 },
  },
  style: {
    type: Object,
  },
  source: {
    type: String,
  },
  target: {
    type: String,
  },
});

var DiagramFlow = mongoose.model("DiagramFlow", DiagramFlowSchema);
module.exports = DiagramFlow;
