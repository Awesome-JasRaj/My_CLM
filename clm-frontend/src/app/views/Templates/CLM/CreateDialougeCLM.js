import React, { memo } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";

export default memo(
  ({
    isOpen,
    toggle,
    Submit,
    tempDetails,
    setTempDetails,
    buttonValue,
    header,
  }) => {
    return (
      <Modal className="create-template" isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{header}</ModalHeader>
        <Form
          onSubmit={(evt) => {
            Submit(evt);
          }}
        >
          <ModalBody>
            <FormGroup>
              <strong>Template Name*</strong>
              <br />
              <Input
                type="text"
                value={tempDetails.name}
                onChange={(evt) => {
                  setTempDetails({
                    ...tempDetails,
                    name: evt.target.value,
                  });
                }}
                required
              />
            </FormGroup>
            <FormGroup>
              <strong>Template Description</strong>
              <br />
              <Input
                type="textarea"
                value={tempDetails.description}
                onChange={(evt) => {
                  setTempDetails({
                    ...tempDetails,
                    description: evt.target.value,
                  });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <FormGroup>
              <Button color="primary" type="submit">
                {buttonValue}
              </Button>{" "}
              <Button color="danger" onClick={toggle}>
                Cancel
              </Button>
            </FormGroup>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
);
