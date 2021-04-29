import React, { memo } from "react";
import Select from "react-select";
import { Input, FormGroup, Label, Col } from "reactstrap";
import { states } from "./Constants/States";
import { districts } from "./Constants/Districts";
import { allDistricts } from "./Constants/AllDistricts";
import { licenses } from "./Constants/Licenses";
export default memo(({ details, setDetails }) => {
  return (
    <div style={{ margin: 20 }}>
      <FormGroup row>
        <Col>
          <Label>License</Label>
          <Select
            options={[{ label: "All", value: "" }, ...licenses]}
            value={{
              label: details.license ? details.license : "All",
              value: details.license,
            }}
            onChange={(lic) => {
              setDetails({
                ...details,
                license: lic.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>State</Label>
          <Input
            type="select"
            name="state"
            onChange={(evt) => {
              setDetails({ ...details, state: evt.target.value,district: "" });
            }}
            value={details["state"]}
          >
            <option value="">All</option>
            {states.map((st) => (
              <option value={st}>{st}</option>
            ))}
          </Input>
        </Col>
        <Col>
          <Label>Zone</Label>
          <Input
            placeholder="Enter a Zone"
            type="text"
            name="zone"
            onChange={(evt) => {
              setDetails({ ...details, zone: evt.target.value });
            }}
            value={details["zone"]}
          />
        </Col>
        <Col>
          <Label>District</Label>
          <Input
            type="select"
            name="district"
            onChange={(evt) => {
              setDetails({ ...details, district: evt.target.value });
            }}
            defaultValue=""
            value={details["district"]}
          >
            <option value="">All</option>
            {details.state ? (
              <>
                {districts[details.state].map((dist) => (
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
        </Col>
        <Col>
          <Label>Status</Label>
          <Input
            type="select"
            name="status"
            onChange={(evt) => {
              setDetails({ ...details, status: evt.target.value });
            }}
            value={details["status"]}
          >
            <option value="">All</option>
            <option value="Drafted">Drafted</option>
            <option value="Published">Published</option>
          </Input>
        </Col>
      </FormGroup>
      <br />
    </div>
  );
});
