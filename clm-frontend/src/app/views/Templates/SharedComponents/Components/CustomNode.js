/* THE MAIN COMPONENT FOR EACH OF THE NODES. */
/* EACH NODE IS BASICALLY THIS COMPONENT. */
/* All the popovers(edit node data and sections) are both implemented here */
import React, { useState } from "react";
import { Handle } from "react-flow-renderer";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import NewNode from "./NewNode";
import SectionPopover from "../SectionPopover";
import { IoIosAdd, IoMdClose, IoIosCreate } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import CreatedNode from "./CreatedNode";
export default function CustomNode({ id, data }) {
  const [toggle, setToggle] = useState({
    create: false,
    openPopover: false,
    sectionPopover: false,
  });
  return (
    <div className={"customNode" + id}>
      <br />
      
      {/* Handles are basically required for the connectors. Check the documentation for more info. */}
      <Handle
        type="source"
        position="bottom"
        id="d"
        style={{ background: "red" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        id="a"
        type="source"
        position="right"
        style={{ background: "red", top: 100 }}
      />
      <Handle
        type="source"
        position="left"
        id="b"
        style={{ background: "red" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="target"
        position="top"
        id="c"
        style={{ background: "green" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      {/* Uncomment the below implementation for a possible decision tree implementation. */}
      {/* {data.isDependent && data.options && data.options.length ? (
        <>
          {data.options.map((val, index) => (
            <Handle
              type="source"
              position="right"
              id={data.heading + "||" + val}
              style={{ background: "black", top: 150 + index * 20 }}
              onConnect={(params) => {
                console.log("handle onConnect", params);
              }}
            />
          ))}
        </>
      ) : null} */}
      {/* <Button
        size="lg"
        color="danger"
        outline
        onClick={() => data.deleteNode([{ id: id, type: "selectorNode" }],1)}
        style={{ float: "right" }}
      >
        <AiOutlineDelete />
      </Button> */}
      {toggle.create ? (
        <>
          <Button
            size="lg"
            color="danger"
            id={"PopoverClick" + id}
            onClick={() => {
              setToggle({
                create: false,
                openPopover: false,
                sectionPopover: false,
              });
            }}
            style={{ marginLeft: 50 }}
          >
            <IoMdClose />
          </Button>
          <br />
          <Popover
            trigger="click"
            placement="right"
            target={"PopoverClick" + id}
            isOpen={toggle.openPopover}
            container={".customNode" + id}
          >
            <PopoverHeader style={{ paddingBottom: 20 }}>
              New Element
              <Button
                style={{ float: "right" }}
                size="sm"
                color="danger"
                outline
                onClick={() => {
                  setToggle({
                    create: false,
                    openPopover: false,
                    sectionPopover: false,
                  });
                }}
              >
                <IoMdClose />
              </Button>
            </PopoverHeader>
            <PopoverBody>
              <div style={{ margin: "0 5 5 10" }}>
                <Button
                  size="sm"
                  color="primary"
                  outline
                  style={{ float: "right" }}
                  id={"SectionPopover" + id}
                  onClick={() => {
                    setToggle({ ...toggle, sectionPopover: true });
                  }}
                >
                  Section
                </Button>
                <br />
                <NewNode data={data} id={id} />
              </div>
            </PopoverBody>
          </Popover>
          <SectionPopover
            ind={id}
            isOpen={toggle.sectionPopover}
            toggle={() => {
              setToggle({ ...toggle, sectionPopover: !toggle.sectionPopover });
            }}
            onChange={data.onChange}
            section={data.section}
          />
        </>
      ) : (
        <>
          <Button
            size="lg"
            color="success"
            id={"PopoverClick" + id}
            onClick={() => {
              setToggle({ ...toggle, create: true, openPopover: true });
            }}
            style={{ marginLeft: 50 }}
          >
            <IoIosCreate />
          </Button>
          {data.type && data.heading ? (
            <Button
              size="lg"
              color="primary"
              style={{ marginLeft: 20 }}
              onClick={() => {
                data.addNode(id);
              }}
            >
              <IoIosAdd />
            </Button>
          ) : null}
        </>
      )}
      <br />
      {data.heading ? (
        <strong style={{ marginLeft: 60 }}>{data.heading}</strong>
      ) : null}
      <br />
      {data.type ? (
        <div style={{ margin: 10 }}>
          <CreatedNode myData={data} />
        </div>
      ) : null}
      <br />
    </div>
  );
}
