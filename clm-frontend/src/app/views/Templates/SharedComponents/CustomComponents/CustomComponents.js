/* A component where textfield, textarea,dropdowns,checkboxes, radiobuttons are taken care of. */
/* NOTE: Checkboxes/Dropdowns/Radio Buttons provide additional functionality of creating your own options or deleting them as seen in the nodes popover. */
import React, { useState } from "react";
import { Input, Label, FormGroup, Button, Form } from "reactstrap";
import PlacesAutocomplete from "react-places-autocomplete";
export default function MyCheckbox(props) {
  const [entries, setEntries] = useState(props.value);
  const [toggle, setToggle] = useState(true);
  const [checked, setChecked] = useState(props.selected ? props.selected : []);
  const handleCheck = (evt) => {
    let data;
    if (evt.target.checked) {
      data = [...checked, evt.target.value];
    } else {
      data = checked.filter((ch) => ch != evt.target.value);
    }
    setChecked(data);
    let e = { target: { name: "defaultSelections", value: data } };
    props.onChange(e);
  };
  const setEntry = (evt, index) => {
    let e = [...entries];
    e[index] = evt.target.value;
    // console.log(e);
    setEntries(e);
  };
  const deleteEntry = (evt, index) => {
    let newData = [...entries.slice(0, index), ...entries.slice(index + 1)];
    setEntries(newData);
  };
  return (
    <Form style={{ margin: 20 }}>
      <br />
      {toggle ? (
        <>
          <strong>{props.heading}</strong>
          {entries.map((val, index) => {
            return (
              <>
                <FormGroup row>
                  <Input
                    type="text"
                    value={val}
                    onChange={(evt) => {
                      setEntry(evt, index);
                    }}
                  />{" "}
                  <Button
                    style={{ margin: 5 }}
                    size="sm"
                    color="success"
                    onClick={() => {
                      setEntries([...entries, ""]);
                    }}
                  >
                    ADD
                  </Button>{" "}
                  {entries.length > 1 ? (
                    <Button
                      style={{ margin: 5 }}
                      size="sm"
                      color="danger"
                      onClick={(evt) => {
                        deleteEntry(evt, index);
                      }}
                    >
                      DELETE
                    </Button>
                  ) : null}
                </FormGroup>
              </>
            );
          })}
          <FormGroup row>
            <Button
              size="sm"
              color="primary"
              name={props.name}
              value={entries}
              outline
              onClick={(e) => {
                props.onChange(e);
                setToggle(false);
              }}
            >
              Save Options
            </Button>
          </FormGroup>
        </>
      ) : (
        <>
          <strong>Default selections (if any)</strong>
          <br />
          {entries.map((val) => {
            return (
              <>
                <Label>
                  <Input
                    type="checkbox"
                    value={val}
                    onChange={handleCheck}
                    checked={checked && checked.includes(val)}
                  />
                  {val}
                </Label>
                <br />
              </>
            );
          })}
        </>
      )}
    </Form>
  );
}

/* Deals with textfield/textarea/date/email */
export function MyForm(props) {
  return (
    <Form style={{ marginLeft: 20, marginRight: 20 }}>
      <div className="row">
        <strong>{props.heading}</strong>
      </div>
      <div className="row">
        <Input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
      </div>
    </Form>
  );
}

export function MyDropdown(props) {
  const [entries, setEntries] = useState(props.value);
  const [toggle, setToggle] = useState(true);
  const setEntry = (evt, index) => {
    let e = [...entries];
    e[index] = evt.target.value;
    setEntries(e);
  };
  const deleteEntry = (evt, index) => {
    let newData = [...entries.slice(0, index), ...entries.slice(index + 1)];
    setEntries(newData);
  };
  return (
    <Form style={{ margin: 20 }}>
      <br />
      {toggle ? (
        <>
          <strong>{props.heading}</strong>
          {entries.map((val, index) => {
            return (
              <>
                <FormGroup row>
                  <Input
                    type="text"
                    value={val}
                    onChange={(evt) => {
                      setEntry(evt, index);
                    }}
                  />{" "}
                  <Button
                    style={{ margin: 5 }}
                    size="sm"
                    color="success"
                    onClick={() => {
                      setEntries([...entries, ""]);
                    }}
                  >
                    ADD
                  </Button>{" "}
                  {entries.length > 1 ? (
                    <Button
                      style={{ margin: 5 }}
                      size="sm"
                      color="danger"
                      onClick={(evt) => {
                        deleteEntry(evt, index);
                      }}
                    >
                      DELETE
                    </Button>
                  ) : null}
                </FormGroup>
              </>
            );
          })}
          <FormGroup row>
            <Button
              size="sm"
              color="primary"
              name={props.name}
              value={entries}
              outline
              onClick={(e) => {
                props.onChange(e);
                setToggle(false);
              }}
            >
              Save Options
            </Button>
          </FormGroup>
        </>
      ) : (
        <>
          <strong>Default Selection (if any)</strong>
          <Input
            type="select"
            onChange={(evt) => {
              props.onChange(evt);
            }}
            name="defaultValue"
            value={props.selected}
          >
            <option value="">Your Options</option>
            {entries.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </Input>
          <br />
        </>
      )}
    </Form>
  );
}

export function MyRadio(props) {
  const [entries, setEntries] = useState(props.value);
  const [toggle, setToggle] = useState(true);
  const setEntry = (evt, index) => {
    let e = [...entries];
    e[index] = evt.target.value;
    setEntries(e);
  };
  const deleteEntry = (evt, index) => {
    let newData = [...entries.slice(0, index), ...entries.slice(index + 1)];
    setEntries(newData);
  };
  return (
    <Form style={{ margin: 20 }}>
      <br />
      {toggle ? (
        <>
          <strong>{props.heading}</strong>
          {entries.map((val, index) => {
            return (
              <>
                <FormGroup row>
                  <Input
                    type="text"
                    value={val}
                    onChange={(evt) => {
                      setEntry(evt, index);
                    }}
                  />{" "}
                  <Button
                    style={{ margin: 5 }}
                    size="sm"
                    color="success"
                    onClick={() => {
                      setEntries([...entries, ""]);
                    }}
                  >
                    ADD
                  </Button>{" "}
                  {entries.length > 1 ? (
                    <Button
                      style={{ margin: 5 }}
                      size="sm"
                      color="danger"
                      onClick={(evt) => {
                        deleteEntry(evt, index);
                      }}
                    >
                      DELETE
                    </Button>
                  ) : null}
                </FormGroup>
              </>
            );
          })}
          <FormGroup row>
            <Button
              size="sm"
              color="primary"
              name={props.name}
              value={entries}
              outline
              onClick={(e) => {
                props.onChange(e);
                setToggle(false);
              }}
            >
              Save Options
            </Button>
          </FormGroup>
        </>
      ) : (
        <>
          <strong>Default Selection (if any)</strong>
          <br />
          {entries.map((val) => (
            <>
              <Label>
                <Input
                  name="defaultValue"
                  type="radio"
                  value={val}
                  checked={props.selected == val}
                  onChange={(evt) => {
                    props.onChange(evt);
                  }}
                />
                {val}
              </Label>
              <br />
            </>
          ))}
        </>
      )}
    </Form>
  );
}

/* Adress fields require GooglePlaces API */
export function MyAddress(props) {
  return (
    <div>
      <PlacesAutocomplete
        value={props.address}
        onChange={props.setAddress}
        onSelect={props.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
