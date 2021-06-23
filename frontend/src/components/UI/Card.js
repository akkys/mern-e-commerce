import React from "react";
import Button from "@material-ui/core/Button";
const Card = (props) => {
  return (
    <div className="card">
      {props.noHeader ? null : (
        <div className="cardHeader" style={{ padding: "13px 24px" }}>
          <h5 style={{ color: "#878787" }}>
            {props.count && <span className="checkCount">{props.count}</span>}
            {props.title}
          </h5>
          {props.btnTitle && (
            <Button variant="outlined" color="primary">
              {props.btnTitle}
            </Button>
          )}
        </div>
      )}

      {props.children ? props.children : null}
    </div>
  );
};

export default Card;
