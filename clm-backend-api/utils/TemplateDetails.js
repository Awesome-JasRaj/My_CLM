const TempDetails = {

  /* Function to generate template name in GRC based on different parameters mentioned below. */
  GRCTemplateName: (state, license, zone, district) => {
    const State = state ? state.trim().split(" ").join("-") : "";
    const License = license.trim().split(" ").join("-");
    const Zone = zone ? zone.trim().split(" ").join("-") : "";
    const District = district ? district.trim().split(" ").join("-") : "";
    let name = License + "_" + State;
    name += Zone ? "_" + Zone : "";
    name += District ? "_" + District : "";
    return name;
  },

  /* Generating a unique key field (based on forms.io) using the heading. Assuming that the heading will always be unique */
  GenerateKey: async (label) => {
    const myLabel = label.trim().split(" ").join("");
    const key = myLabel[0].toLowerCase() + myLabel.slice(1);
    return key;
  },

  /* Used to accumulate diagramFlow data with templateData. So that in the nodes have the template data as well. Cause in the UI the template data is displayed in the preview as well in the nodes themselves. */
  TemplateData: async (tempData, diagramFlowData) => {
    const myData = await Promise.all(
      diagramFlowData.map(async (val) => {
        if (val.source && val.target) return val;
        let temp_data = await tempData.filter((ele) => {
          return ele.id === val.id;
        })[0];
        return { ...val.toJSON(), data: temp_data };
      })
    );
    return myData;
  },

  /* Function to cumulate all the entries based on the order of the path traced from the very first node. */
  /* This function also acumulates all the nodes into their respective sections. */
  Preview: async (templateData) => {
    let edges = {},
      nodes = {};
    // dependentNodes = [];
    await Promise.all(
      templateData.map(async (val) => {
        if (val.source && val.target) {
          // if (val.source.includes("||"))
          //   dependentNodes.push({ source: val.source, target: val.target });
          // else
          edges[val.source.split("_")[0]] = val.target.split("_")[0];
        } else {
          nodes[val.id] = val.data;
        }
        return val;
      })
    );
    /* Start with the very first node. */
    let tempData = [nodes["1"]];
    let n = 1;
    let currNode = "1";

    /* Tracing the node with id 1 till the end to get all the elements in the order they are connected */
    while (edges[currNode]) {
      tempData.push(nodes[edges[currNode]]);
      currNode = edges[currNode];
      n++;
    }
    let sections = [];
    let myData = [];
    let i = 0;
    /* Iterate through all the sections and aggregate the ones with same section together */
    while (i < n) {
      if (tempData[i].section == "No Section") {
        myData.push(tempData[i]);
      } else if (!sections.includes(tempData[i].section)) {
        let sectionData = await tempData.filter((val) => {
          return val.section == tempData[i].section;
        });
        myData = [...myData, ...sectionData];
        sections.push(tempData[i].section);
      }
      i++;
    }
    return myData;
  },
};
module.exports = TempDetails;
