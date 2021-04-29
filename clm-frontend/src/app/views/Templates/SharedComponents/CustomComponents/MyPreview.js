/* This section is triggered once the user clicks on preview. On preview click the data is fetched from the templateData table sorted by sections and sent here to map it dynamically and create a form. */
/* NOTE: MEMO is used for performance reasons, so that this component is only re-rendered on change of props. */
import React, { useState,memo } from "react";
import { Input, Label, FormGroup } from "reactstrap";
import { MyAddress } from "./CustomComponents";
/* A global variable to keep track of current sections, so that the section heading is only displayed once in bold and the rest of the elements in that section don't print it again. */
let currSection = "";
export default memo((props) => { 
  const data = props.myData;
  console.log(data);
  // const [address, setAddress] = useState();
  // const handleSelect = async (value) => {
  //   // const results = await geocodeByAddress(value);
  //   // const latLng = await getLatLng(results[0]);
  //   setAddress(value);
  //   console.log(value);
  //   // console.log(results);
  //   // setCoordinates(latLng);
  // };
  

  /* This function takes care of displaying the section heading only once. */
  const RenderSection = ({ sec }) => {
    if (sec != "No Section" && sec != currSection) {
      currSection = sec;
      return (
        <>
          <h2 style={{ margin: 20, textAlign: "center" }}>{sec}</h2>
        </>
      );
    }
    return null;
  };

  // Type of the field is checked and then rendered accordingly.
  return (
    <div style={{ margin: 15 }}>
      {data &&
        data.map((val) => (
          <>
            <RenderSection sec={val.section} />
            <FormGroup row>
              <Label style={{ marginLeft: 20, marginRight: 50 }}>
                <strong>{val.heading + (val.isMandatory ? "*" : "")}</strong>
              </Label>
              {val.type == "radio" || val.type == "checkbox" ? (
                val.options.map((opts) => (
                  <>
                    {val.type === "radio" ? (
                      <Label style={{ marginRight: 50 }}>
                        <Input
                          name={val.type + val.id}
                          type={val.type}
                          value={opts}
                          defaultChecked={
                            val.defaultValue && val.defaultValue == opts
                          }
                          // checked={val.defaultValue == opts}
                        />
                        {opts}
                      </Label>
                    ) : (
                      <Label style={{ marginRight: 50 }}>
                        <Input
                          name={val.type + val.id}
                          type={val.type}
                          value={opts}
                          // checked={
                          //   val.defaultSelections &&
                          //   val.defaultSelections.includes(opts)
                          // }
                          defaultChecked={
                            val.defaultValue &&
                            val.defaultSelections.includes(opts)
                          }
                        />
                        {opts}
                        <br />
                      </Label>
                    )}
                  </>
                ))
              ) : val.type == "select" ? (
                <Input type={val.type} defaultValue={val.defaultValue}>
                  {val.options.map((opts) => (
                    <option value={opts}>{opts}</option>
                  ))}
                </Input>
              ) : val.type == "address" ? (
                <MyAddress
                  // setAddress={setAddress}
                  // address={address}
                  // handleSelect={handleSelect}
                />
              ) : val.type == "date" ? (
                <Input type={val.type} defaultValue={val.defaultValue} />
              ) : (
                <Input type={val.type} placeholder={val.placeholder} />
              )}
            </FormGroup>
            <br />
          </>
        ))}
    </div>
  );
});
