
import React, { memo } from "react";
import Select from "react-select";
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
import { states } from "./Constants/States";
import { districts } from "./Constants/Districts";
import { allDistricts } from "./Constants/AllDistricts";
import { licenses } from "./Constants/Licenses";
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
              <strong>License Name*</strong>
              <br />
              <Select
                options={licenses}
                value={{
                  label: tempDetails.license,
                  value: tempDetails.license,
                }}
                onChange={(lic) => {
                  console.log(lic);
                  setTempDetails({
                    ...tempDetails,
                    license: lic.value,
                  });
                }}
              />
            </FormGroup>
            <FormGroup>
              <strong>License Authority*</strong>
              <br />
              <Select
              // options={licenses}
              // value={{
              //   label: tempDetails.license,
              //   value: tempDetails.license,
              // }}
              // onChange={(lic) => {
              //   console.log(lic);
              //   setTempDetails({
              //     ...tempDetails,
              //     license: lic.value,
              //   });
              // }}
              />
            </FormGroup>
            <FormGroup>
              <strong>Jurisdiction</strong>
              <Input
                type="select"
                value={
                  tempDetails.jurisdiction ? tempDetails.jurisdiction : "Others"
                }
                onChange={(evt) => {
                  setTempDetails({
                    ...tempDetails,
                    jurisdiction: evt.target.value,
                  });
                }}
              >
                <option value="Central">Central</option>
                <option value="State">State</option>
                <option value="Others">Others</option>
              </Input>
            </FormGroup>

            {tempDetails.jurisdiction == "State" ? (
              <>
                <FormGroup>
                  <strong>State*</strong>
                  <br />
                  <Input
                    type="select"
                    value={tempDetails.state}
                    onChange={(evt) => {
                      setTempDetails({
                        ...tempDetails,
                        state: evt.target.value,
                        district: "",
                      });
                    }}
                    required
                  >
                    <option value="">Select a State</option>
                    {states.map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <strong>Zone</strong>
                  <br />
                  <Input
                    type="text"
                    placeholder="Enter a Zone"
                    value={tempDetails.zone}
                    onChange={(evt) => {
                      setTempDetails({
                        ...tempDetails,
                        zone: evt.target.value,
                      });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <strong>District</strong>
                  <br />
                  <Input
                    type="select"
                    value={tempDetails.district}
                    onChange={(evt) => {
                      setTempDetails({
                        ...tempDetails,
                        district: evt.target.value,
                      });
                    }}
                  >
                    <option value="">Select a District</option>
                    {tempDetails.state ? (
                      <>
                        {districts[tempDetails.state].map((dist) => (
                          <option value={dist}>{dist}</option>
                        ))}
                      </>
                    ) : (
                      <>
                        {allDistricts.map((dist) => (
                          <option value={dist}>{dist}</option>
                        ))}
                      </>
                    )}
                  </Input>
                </FormGroup>
              </>
            ) : null}

            <FormGroup>
              <strong>Description</strong>
              <br />
              <Input
                placeholder="Template Description"
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
