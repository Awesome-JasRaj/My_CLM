import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Form,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default function SectionsDialouge({
  isOpen,
  toggle,
  sections,
  setSections,
}) {
  const [tempEntries, setTempEntries] = useState(sections);
  const Entry = (evt, index) => {
    const val = evt.target.value;

    let mySections = [...tempEntries];
    mySections[index] = val;
    setTempEntries(mySections);
  };
  const AddNewEntry = (evt) => {
    setTempEntries([...tempEntries, ""]);
  };
  const DeleteEntry = (index) => {
    setTempEntries([
      ...tempEntries.slice(0, index),
      ...tempEntries.slice(index + 1),
    ]);
  };
  const onSave = (evt) => {
    evt.preventDefault();
    if (uniqueCheck(tempEntries)) {
      setSections(tempEntries);
      toggle();
    } else {
      alert("Error! Section Names need to be unique!");
    }
  };
  function uniqueCheck(myArray) {
    return myArray.length === new Set(myArray).size;
  }
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        toggle();
      }}
    >
      <Form style={{ margin: 20 }} onSubmit={onSave}>
        <ModalHeader
          toggle={() => {
            toggle();
          }}
        >
          My Sections
        </ModalHeader>
        <ModalBody>
          {tempEntries.map((val, index) => {
            return (
              <div>
                <FormGroup row>
                  <Input
                    type="text"
                    value={val}
                    onChange={(evt) => {
                      Entry(evt, index);
                    }}
                    required
                  />{" "}
                  <Button
                    style={{ margin: 5 }}
                    size="sm"
                    color="success"
                    onClick={AddNewEntry}
                  >
                    ADD
                  </Button>{" "}
                  {tempEntries.length > 1 ? (
                    <Button
                      style={{ margin: 5 }}
                      size="sm"
                      color="danger"
                      onClick={() => {
                        DeleteEntry(index);
                      }}
                    >
                      DELETE
                    </Button>
                  ) : null}
                </FormGroup>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="success" type="submit" outline>
            SAVE
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              toggle();
            }}
            outline
          >
            CANCEL
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
