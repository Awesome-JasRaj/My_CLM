import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  FormFeedback,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardFooter,
  Row,
  Col,
} from "reactstrap";
import { FiEdit } from "react-icons/fi";
import CreateDialougeGRC from "./GRC/CreateDialougeGRC";
import CreateDialougeCLM from "./CLM/CreateDialougeCLM";
import DeleteDialouge from "./SharedComponents/DeleteDialouge";
import SearchFilterGRC from "./GRC/SearchFilterGRC";
export default function Dashboard(props) {
  /* Recieving template type as props can be GRC or CLM */
  const templateType = props.route.props.type;
  const history = useHistory();

  /* For each template we have a popup/modal. In total we have 3 popups for each template: Create,Edit and Delete */
  const [modals, setModals] = useState({
    create: false,
    delete: false,
    edit: false,
  });

  /* Seach params is basically storing the license,state,zone and status dropdowns value. Once there is a change detected in the searchParams, templates are fetched again with that parameters. */
  const [searchParams, setSearchParams] = useState({});

  /* Details of the template when user opens the edit modal. */
  const [editTempDetails, setEditTempDetails] = useState({});

  /* Details of the template when user opens the create modal. */
  const [tempDetails, setTempDetails] = useState({});

  /* Stores all the templates */
  const [myTemplates, setMyTemplates] = useState([]);

  /* Fetch all the templates from the backend before the application renders. That's why this function is being called in useEffects below. useEffects is in-built in react hooks and it renders the function inside it before the application renders. */
  const fetchTemplates = async () => {
    let resp = await fetch("/api/templates/type/" + templateType, {
      method: "PUT",
      body: JSON.stringify(searchParams),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (resp.status === 204) setMyTemplates([]);
    else {
      let temp = await resp.json();
      setMyTemplates(temp);
    }
  };

  /* In use effects we have searchParams as an argument which basically tells useEffect to be called everytime there is a change in search params  */
  useEffect(() => {
    fetchTemplates();
  }, [searchParams]);

  /* Toggle for all 3 modals is below */
  const toggle = () => {
    setModals({ ...modals, create: !modals.create });
  };
  const deleteToggle = (tempId = null) => {
    /* Since each template is a card component. Therefore once clicked delete we have to know that templates templateId to delete it. That's why we are storing tempId here. Same for edit modal as well. */
    if (tempId)
      setModals({ ...modals, delete: !modals.delete, tempId: tempId });
    else setModals({ ...modals, delete: !modals.delete });
  };
  const editToggle = (evt, tempId = null) => {
    if (tempId) setModals({ ...modals, edit: !modals.edit, tempId: tempId });
    else setModals({ ...modals, edit: !modals.edit });
  };
  const handleEdit = (evt, tempId, ind) => {
    editToggle(evt, tempId);
    setEditTempDetails(myTemplates[ind]);
  };

  /* Once the user clicks on create, this api is called to save the template in the backend and extract an id which is the _id of the template table and add it to the route for further communications with the backend */
  const createTemplate = async (evt) => {
    evt.preventDefault();
    if (
      templateType == "CLM" ||
      (tempDetails.jurisdiction != "State" && tempDetails.license) ||
      (tempDetails.jurisdiction == "State" &&
        tempDetails.license &&
        tempDetails.state)
    ) {
      let resp = await fetch("/api/templates/type/" + templateType, {
        method: "POST",
        body: JSON.stringify(tempDetails),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let myResponse = await resp.json();
      if (resp.status === 201) {
        history.push(
          "/templates/" + templateType + "/" + myResponse.templateId
        );
      } else {
        alert(myResponse.error);
      }
    } else {
      alert("Fields denoted with * are mandatory fields!");
    }
  };

  /* Once the user clicks on delete this API is called to delete it from the backend. */
  const deleteTemplate = async (tempId) => {
    let resp = await fetch("/api/templates/modify/" + tempId, {
      method: "DELETE",
    });
    if (resp.status === 200) {
      fetchTemplates();
      deleteToggle();
    } else {
      const response = await resp.json();
      alert(response.error);
    }
  };

  /* When the user clicks on view, it should redirect to the platform where user can view the nodes and links and work accordingly */
  const viewTemplate = async (evt, tempId) => {
    history.push("/templates/" + templateType + "/" + tempId);
  };

  /* This api is called when the user wants to edit the details like state/license/zone in case of GRC and template name in case of CLM */
  const editTemplate = async (evt) => {
    evt.preventDefault();
    let params;
    /* Seprate validations for GRC and CLM. */
    if (templateType == "GRC") {
      let {
        state,
        license,
        zone,
        district,
        description,
        jurisdiction,
      } = editTempDetails;
      params = { state, license, zone, district, description, jurisdiction };
      if ((jurisdiction == "State" && !state) || !license) {
        alert("Fields denoted with * are mandatory fields!");
        return 0;
      }
    } else {
      let { name, description } = editTempDetails;
      params = { name, description };
    }
    let resp = await fetch("/api/templates/modify/" + modals.tempId, {
      method: "POST",
      body: JSON.stringify({
        ...params,
        templateType: templateType,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (resp.status === 200) {
      fetchTemplates();
      editToggle();
    } else {
      const response = await resp.json();
      alert(response.error);
    }
  };

  /* A functional component to render all the templates in card format. */
  /* Contains the template structure  */
  const RenderTemplates = ({ temps }) => {
    return (
      <Row>
        {temps.map((temp, index) => (
          <Col sm={4} style={{ marginBottom: 30 }}>
            <Card>
              <CardHeader tag="h3">
                {temp.name}
                <Button
                  style={{ float: "right" }}
                  color="success"
                  onClick={(evt) => {
                    handleEdit(evt, temp._id, index);
                  }}
                >
                  <FiEdit />
                </Button>
              </CardHeader>
              <CardBody>
                <CardText>{temp.description}</CardText>
                <Button
                  color="primary"
                  onClick={(evt) => {
                    viewTemplate(evt, temp._id);
                  }}
                >
                  View
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  color="danger"
                  onClick={(evt) => {
                    deleteToggle(temp._id);
                  }}
                >
                  Delete
                </Button>
              </CardBody>
              <CardFooter className="text-muted">
                Created On: {temp.createdAt} <br />
                Last Modified: {temp.lastModified}
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <Button
        color="primary"
        outline
        style={{ marginLeft: 30, marginTop: 15 }}
        onClick={toggle}
      >
        {/* Modifying the create button text based on the template type */}
        {templateType == "GRC"
          ? "Create License Application"
          : "Create Template"}
      </Button>
      {/* Search filter is added only for GRC. Search filter is the one with all the dropdowns like license,city,state,zone and status */}
      {templateType == "GRC" ? (
        <SearchFilterGRC details={searchParams} setDetails={setSearchParams} />
      ) : null}

      {/* If no templates recieved from the backend then print NO TEMPLATES EXIST else display all the templates with the heading My GRC/CLM Templates */}
      <div style={{ margin: 20 }}>
        <h2 style={{ textAlign: "center" }}>
          {myTemplates.length
            ? "My " + templateType + " Templates"
            : "No " + templateType + " Templates Exist"}
        </h2>
        <br />
        <RenderTemplates temps={myTemplates} />
      </div>

      {/* Different edit and create modals for different template types. */}
      {templateType == "CLM" && modals.create ? (
        <CreateDialougeCLM
          isOpen={modals.create}
          toggle={toggle}
          Submit={createTemplate}
          tempDetails={tempDetails}
          setTempDetails={setTempDetails}
          buttonValue="Create"
          header="Create a Template"
        />
      ) : null}
      {templateType == "GRC" && modals.create ? (
        <CreateDialougeGRC
          isOpen={modals.create}
          toggle={toggle}
          Submit={createTemplate}
          tempDetails={tempDetails}
          setTempDetails={setTempDetails}
          buttonValue="Create"
          header="Create a Template"
        />
      ) : null}
      {modals.delete ? (
        <DeleteDialouge
          isDelete={modals.delete}
          tempId={modals.tempId}
          deleteToggle={deleteToggle}
          deleteTemplate={deleteTemplate}
        />
      ) : null}
      {templateType == "CLM" && modals.edit ? (
        <CreateDialougeCLM
          isOpen={modals.edit}
          toggle={editToggle}
          Submit={editTemplate}
          tempDetails={editTempDetails}
          setTempDetails={setEditTempDetails}
          buttonValue="Save Changes"
          header="Edit Template"
        />
      ) : null}
      {templateType == "GRC" && modals.edit ? (
        <CreateDialougeGRC
          isOpen={modals.edit}
          toggle={editToggle}
          Submit={editTemplate}
          tempDetails={editTempDetails}
          setTempDetails={setEditTempDetails}
          buttonValue="Save Changes"
          header="Edit Template"
        />
      ) : null}
    </>
  );
}
