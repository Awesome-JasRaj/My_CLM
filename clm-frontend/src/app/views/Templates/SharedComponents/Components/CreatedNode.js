/* This component is basically what is displayed on the node and NOT ON THE POPOVER.  */
/* Whatever changes you make in the popover is diplayed on the node as well. The data that is displayed on node is rendered by this component */
/* NOTE: Memo is used for performance reasons since this component is only dependent on the props it will only be re-rendered on change of props. */
/* This component just display the information on the node and no calculations or manipulation is done here. */
import React, { memo } from "react";
import { Input, Label } from "reactstrap";
export default memo(({ myData }) => {
  if (myData.type === "radio" || myData.type === "checkbox") {
    return (
      <div style={{ marginLeft: 20 }}>
        {myData.options
          ? myData.options.map((val) => (
              <>
                {myData.type === "radio" ? (
                  <>
                    <Input
                      type={myData.type}
                      value={val}
                      checked={myData.defaultValue == val}
                      disabled
                    />
                    {val}
                    <br />
                  </>
                ) : (
                  <>
                    <Input
                      type={myData.type}
                      value={val}
                      checked={
                        myData.defaultSelections &&
                        myData.defaultSelections.includes(val)
                      }
                      disabled
                    />
                    {val}
                    <br />
                  </>
                )}
              </>
            ))
          : null}
      </div>
    );
  } else if (myData.type == "select") {
    if (myData.options)
      return (
        <Input type="select" value={myData.defaultValue} disabled>
          <option value="">My Options</option>
          {myData.options.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </Input>
      );
  }
  else if(myData.type == "date"){
    return (
      <Input
        type={myData.type}
        disabled
        defaultValue={myData.defaultValue}
      />
    );
  }
   else {
    return (
      <Input
        type={myData.type}
        placeholder={myData.placeholder}
        disabled
      />
    );
  }
});
