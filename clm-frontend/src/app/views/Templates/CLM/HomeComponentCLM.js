import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
} from "react-flow-renderer";
import { Button, Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import MyPreview from "../SharedComponents/CustomComponents/MyPreview";
import CustomNode from "../SharedComponents/Components/CustomNode";
import Scrollbar from "react-perfect-scrollbar";
import SectionsDialouge from "../SharedComponents/SectionsDialouge";
import PublishDialouge from "../SharedComponents/PublishDialouge";
const onElementClick = (element) => console.log("click", element);
const onLoad = (reactFlowInstance) =>
  console.log("graph loaded:", reactFlowInstance);
const HomeComponent = () => {
  const params = useParams();
  const [mySections, setMySections] = useState([""]);
  const [myElements, setMyElements] = useState([]);
  const [myDetails, setMyDetails] = useState({ loaderPreview: true });
  const [previewModal, setPreviewModal] = useState(false);
  const [sectionsModal, setSectionsModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const previewToggle = () => setPreviewModal(!previewModal);
  const sectionsToggle = () => setSectionsModal(!sectionsModal);
  const publishToggle = () => setPublishModal(!publishModal);
  const [positions, setPositions] = useState({});
  const onNodeDragStop = (node) => {
    setPositions({ ...positions, [node.id]: node.position });
  };
  async function onPublish() {
    let resp = await fetch("/api/templates/modify/" + params.templateId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (resp.status == 200) {
      publishToggle();
    } else {
      alert("Error occured while publishing!");
    }
  }
  async function onPreview() {
    previewToggle();
    let resp = await fetch(
      "/api/templateElements/templateData/" + params.templateId,
      {
        method: "GET",
      }
    );
    if (resp.status === 200) {
      let response = await resp.json();
      setMyDetails({ myData: response.templateData, loaderPreview: false });
    } else if (resp.status === 204) {
      setMyDetails({ myData: null, loaderPreview: false });
    } else {
      let response = await resp.json();
      alert(response.error);
    }
  }
  async function onSave() {
    let myData = [];
    let globalNodes = [];
    let allElements = await Promise.all(
      myElements.map((e) => {
        if (!isEdge(e)) {
          if (e.data.isGlobal) {
            globalNodes.push(e);
          }
          myData.push({ ...e.data, id: e.id });
        }
        // console.log(positions[e.id]);
        return { ...e, position: positions[e.id] };
      })
    );
    let resp = await fetch(
      "/api/templateElements/templateData/" + params.templateId,
      {
        method: "PUT",
        body: JSON.stringify({
          templateData: myData,
          diagramFlowData: allElements,
          templateSections: mySections,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (resp.status !== 200) {
      let response = await resp.json();
      alert(response.error);
    } else {
      if (globalNodes.length) {
        await fetch("/api/templateElements/globalNodes", {
          method: "POST",
          body: JSON.stringify({
            globalNodes,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      }
      alert("Saved Successfully!");
    }
  }
  /* THE MAIN FUNCTION OF THE APPLICATION */
  /* Handles all the changes in the nodes/popovers/section popovers. */
  /* All and every data is recieved by this component and then sent to the API's once cliked on SAVE. */
  function onChange(evt, ind = "1") {
    setMyElements((els) =>
      els.map((e) => {
        if (isEdge(e) || e.id !== ind) {
          return e;
        }
        let { name, value } = evt.target;
        if (name === "options") value = value.split(",");
        if (
          name === "isGlobal" ||
          name === "isDependent" ||
          name === "isMandatory"
        )
          value = evt.target.checked;
        return {
          ...e,
          data: {
            ...e.data,
            [name]: value,
          },
        };
      })
    );
  }
  /* This function is called when the user clicks on the '+' sign on the node. */
  function addNode(sourceIndex) {
    let myEdge;
    setMyElements((els) => {
      let targetPosition;
      let ind = (els.length + 1).toString();
      setPositions((pos) => {
         /* Updates the postion of the new node to be +350 in y direction. So that on clicking + the new Node comes below the node that created it. */
        targetPosition = { ...pos[sourceIndex], y: pos[sourceIndex].y + 350 };
        return { ...pos, [ind]: targetPosition };
      });

      let newNode = {
        id: ind,
        type: "selectorNode",
        data: {
          onChange: onChange,
          type: null,
          addNode: addNode,
          isGlobal: false,
        },
        position: targetPosition,
        style: { border: "1px solid #777", padding: 10, width: 300 },
      };
      myEdge = {
        source: sourceIndex,
        target: ind,
      };
      return els.concat(newNode);
    });
    onConnect(myEdge);
  }
  /* This data is fetch before the application renders. All the diagramFlow data is fetched from the backend here. */
  const fetchData = async () => {
    let resp = await fetch(
      "/api/templateElements/diagramData/" + params.templateId,
      {
        method: "GET",
      }
    );
    if (resp.status === 204) {
      setMyElements([
        {
          id: "1",
          type: "selectorNode",
          data: {
            type: null,
            addNode: addNode,
            onChange: onChange,
            isGlobal: false,
          },
          style: {
            border: "1px solid #777",
            padding: 10,
            width: 300,
          },
          position: { x: 250, y: 100 },
        },
      ]);
      setPositions({ "1": { x: 250, y: 100 } });
      return 1;
    }
    let response = await resp.json();
    let data = response.data;
    let NodePositions = {};
    let myData = await Promise.all(
      data.map((val) => {
        if (val.source && val.target) return val;
        NodePositions[val.id] = val.position;
        return {
          ...val,
          data: { ...val.data, addNode: addNode, onChange: onChange },
        };
      })
    );
    setMyElements(myData);
    setPositions(NodePositions);
    if (response.sections) {
      setMySections(response.sections);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  /* If there is a change in sections popover. Then store the sections data in local storage. Cause all the data only gets save on click of save to the backend. For maintaining it temporarly we use local storage. */
  useEffect(() => {
    localStorage.setItem("mySections", JSON.stringify(mySections));
  }, [mySections]);

  /* Called when delete button is pressed. All the nodes except the first can be deleted */
  const onElementsRemove = (elementsToRemove) => {
    if (elementsToRemove[0].id != "1")
      setMyElements((els) => removeElements(elementsToRemove, els));
    else {
      alert("Cannot remove the first node");
    }
  };
  const onConnect = (params) => setMyElements((els) => addEdge(params, els));

  return (
    <Scrollbar
      style={{
        position: "absolute",
        right: 10,
        width: "100%",
        hegiht: "100%",
        background: "yellow",
      }}
    >
      <ReactFlow
        deleteKeyCode={46}
        elements={myElements}
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        style={{
          background: "linear-gradient(180deg, #2af598 0%, #009efd 100%)",
          height: 1000,
          width: "100%",
        }}
        onLoad={onLoad}
        nodeTypes={{
          selectorNode: CustomNode,
        }}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case "input":
                return "red";
              case "default":
                return "#00ff00";
              case "output":
                return "rgb(0,0,255)";
              default:
                return "yellow";
            }
          }}
        />
        <Controls />
        <Button
          color="primary"
          style={{ position: "absolute", right: 25, top: 20, zIndex: 4 }}
          onClick={publishToggle}
          outline
        >
          PUBLISH
        </Button>
        <Button
          color="primary"
          style={{ position: "absolute", right: 120, top: 20, zIndex: 4 }}
          onClick={onPreview}
          outline
        >
          PREVIEW
        </Button>
        <Button
          color="primary"
          style={{ position: "absolute", right: 220, top: 20, zIndex: 4 }}
          onClick={onSave}
          outline
        >
          SAVE
        </Button>
        <Button
          color="primary"
          outline
          style={{ position: "absolute", right: 290, top: 20, zIndex: 4 }}
          onClick={sectionsToggle}
        >
          SECTIONS
        </Button>
        <Modal isOpen={previewModal} toggle={previewToggle} size="lg">
          <ModalHeader toggle={previewToggle}>Preview</ModalHeader>
          <ModalBody>
            {myDetails.loaderPreview ? (
              <Spinner style={{ margin: 50 }} color="primary" />
            ) : (
              <MyPreview myData={myDetails.myData} />
            )}
          </ModalBody>
        </Modal>
        {publishModal ? (
          <PublishDialouge
            isPublish={publishModal}
            publishToggle={publishToggle}
            publishIt={onPublish}
          />
        ) : null}
        {sectionsModal ? (
          <SectionsDialouge
            isOpen={sectionsModal}
            toggle={sectionsToggle}
            sections={mySections}
            setSections={setMySections}
          />
        ) : null}
      </ReactFlow>
    </Scrollbar>
  );
};

export default HomeComponent;
