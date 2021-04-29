import React, { memo } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

export default memo(({ isPublish, publishIt, publishToggle }) => {
  return (
    <div style={{ margin: 15 }}>
      <Modal isOpen={isPublish} toggle={publishToggle}>
        <ModalHeader toggle={publishToggle}></ModalHeader>
        <ModalBody>Are you sure you want to publish this template?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            outline
            onClick={() => {
              publishIt();
            }}
          >
            YES
          </Button>{" "}
          <Button color="secondary" outline onClick={publishToggle}>
            NO
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});
