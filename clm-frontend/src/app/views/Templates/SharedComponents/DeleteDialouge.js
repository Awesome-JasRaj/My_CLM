import React, { memo } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

export default memo(({ isDelete, tempId, deleteToggle, deleteTemplate }) => {
  return (
    <div style={{ margin: 15 }}>
      <Modal
        className="delete-template"
        isOpen={isDelete}
        toggle={deleteToggle}
      >
        <ModalHeader toggle={deleteToggle}></ModalHeader>
        <ModalBody>Are you sure you want to delete this template?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            outline
            onClick={() => {
              deleteTemplate(tempId);
            }}
          >
            YES
          </Button>{" "}
          <Button color="secondary" outline onClick={deleteToggle}>
            NO
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});
