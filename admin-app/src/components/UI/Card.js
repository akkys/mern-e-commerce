import React from "react";
import Button from "@material-ui/core/Button";
const Card = (props) => {
  return (
    <div className="card">
      {props.noHeader ? null : (
        <div className="cardHeader" style={{ padding: "15px 24px" }}>
          <h6 style={{ color: "black" }}>
            {props.count && <span className="checkCount">{props.count}</span>}
            {props.title}
          </h6>
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
