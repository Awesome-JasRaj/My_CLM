/* This component is basically what is displayed ON THE POPOVER. Once the user clicks on the green button on the node (edit button), this component is triggered.  */
/* All the popover data reading, calculations and manipulations for each of the fields is done here. */
/* NOTE: Memo is used for performance reasons since this component is only dependent on the props it will only be re-rendered on change of props. */
import React, { memo } from "react";
import { Input, Label, Col } from "reactstrap";
import MyCheckBox, {
  MyDropdown,
  MyRadio,
  MyForm,
} from "../CustomComponents/CustomComponents";
export default memo(({ data, id }) => {
  const ind = id;

  /* A custom function that displays the custom component according to the type. */
  /* NOTE: We are using the custom components like MyRadio, MyDropdown which are in the CustomComponents.js. */
  const renderSwitch = (params) => {
    switch (params) {
      case "text":
        return (
          <MyForm
            type="text"
            name="placeholder"
            value={data.placeholder}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            heading="Placeholder"
          />
        );
      case "textarea":
        return (
          <MyForm
            type="textarea"
            name="placeholder"
            value={data.placeholder}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            heading="Placeholder"
          />
        );
      case "radio":
        return (
          <MyRadio
            name="options"
            value={data.options && data.options.length ? data.options : [""]}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            selected={data.defaultValue}
            heading="Radio Button Options"
          />
        );
      case "date":
        return (
          <MyForm
            type="date"
            name="defaultValue"
            value={data.defaultValue}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            heading="Default Date Value"
          />
        );
      case "number":
        return (
          <MyForm
            type="number"
            name="placeholder"
            value={data.placeholder}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            heading="Placeholder"
          />
        );
      case "email":
        return (
          <MyForm
            type="email"
            name="placeholder"
            value={data.placeholder}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            heading="Placeholder"
          />
        );
      case "select":
        return (
          <MyDropdown
            name="options"
            value={data.options && data.options.length ? data.options : [""]}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            selected={data.defaultValue}
            heading="Dropdown Options"
          />
        );
      case "checkbox":
        return (
          <MyCheckBox
            name="options"
            value={data.options && data.options.length ? data.options : [""]}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            selected={data.defaultSelections}
            heading="Checkbox Options"
          />
        );
      default:
        return null;
    }
  };
  return (
    <div style={{ margin: 15 }}>
      {/* Checkbox for the globalNode. On check it is set to true and sent to the home component. */}
      <Label>
        <Input
          type="checkbox"
          name="isGlobal"
          defaultChecked={data.isGlobal}
          onChange={(evt) => {
            data.onChange(evt, ind);
          }}
        />
        Global Node
      </Label>
      <br />
      {/* Checkbox for the mandatory fields. If true, then '*' is displayed right next to the heading on preview.On check it is set to true and sent to the home component. */}
      <Label>
        <Input
          type="checkbox"
          name="isMandatory"
          defaultChecked={data.isMandatory}
          onChange={(evt) => {
            data.onChange(evt, ind);
          }}
        />
        isMandatory
      </Label>
      <br />
      {data.type == "radio" ? (
        <Label>
          <Input
            type="checkbox"
            name="isDependent"
            defaultChecked={data.isDependent}
            onChange={(evt) => {
              data.onChange(evt, ind);
            }}
          />
          Dependent
        </Label>
      ) : null}
      <div className="row">
        <Col sm={12}>
          <strong>Heading/Label*</strong>
        </Col>
        <Col sm={12}>
          <MyForm
            type="text"
            name="heading"
            value={data.heading}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
          />
        </Col>
      </div>
      <div className="row">
        <Col sm={12}>
          <strong>Choose a type*</strong>
        </Col>
        <Col sm={12}>
          <Input
            type="select"
            value={data.type}
            onChange={(e) => {
              data.onChange(e, ind);
            }}
            name="type"
          >
            <option value="">Type</option>
            <option value="text">Text Field</option>
            <option value="email">Email Address</option>
            <option value="textarea">Text Area</option>
            <option value="number">Number Field</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio Buttons</option>
            <option value="select">Dropdowns</option>
            <option value="address">Address Field</option>
            <option value="date">Date Picker</option>
          </Input>
        </Col>
      </div>
      {renderSwitch(data.type)}
    </div>
  );
});
