import React, { memo } from "react";
import { Input, Popover, PopoverHeader, PopoverBody, Button } from "reactstrap";
import { IoMdClose } from "react-icons/io";
export default memo(({ ind, isOpen, toggle, onChange, section }) => {
  const mySections = JSON.parse(localStorage.getItem("mySections"));
  return (
    <div>
      <Popover
        trigger="click"
        placement="right"
        target={"SectionPopover" + ind}
        isOpen={isOpen}
        container={".customNode" + ind}
        toggle={toggle}
      >
        <PopoverHeader style={{ paddingBottom: 20 }}>
          Section{" "}
          <Button
            color="danger"
            size="sm"
            outline
            onClick={toggle}
            style={{ float: "right" }}
          >
            <IoMdClose />
          </Button>
        </PopoverHeader>
        <PopoverBody>
          <div style={{ margin: 20 }}>
            <strong>Choose a section</strong>
            <br />
            {mySections && mySections.length ? (
              <Input
                type="select"
                name="section"
                onChange={(evt) => {
                  onChange(evt, ind);
                }}
                value={section}
              >
                <option>No Section</option>
                {mySections.map((val) => {
                  if (val) return <option>{val}</option>;
                })}
              </Input>
            ) : (
              <div>No Sections</div>
            )}
          </div>
        </PopoverBody>
      </Popover>
    </div>
  );
});
