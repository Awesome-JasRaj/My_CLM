const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var GlobalNodeSchema = new Schema({
  type: {
    type: String,
  },
  position: {
    type: Object,
    default: { x: 250, y: 100 },
  },
  style: {
    type: Object,
  },
  key: {
      type: String,
      required: true
  },
  data: {
    type: Object,
  },
});

var GlobalNode = mongoose.model("GlobalNode", GlobalNodeSchema);
module.exports = GlobalNode;
