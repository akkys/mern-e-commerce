import React from "react";
import { Table } from "react-bootstrap";

const ProductTable = ({ product, showProductDetailModal }) => {
  return (
    <Table hover responsive="sm" size="sm" style={{ fontSize: "14px" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
          <th style={{ textAlign: "right" }}>Price</th>
          <th style={{ textAlign: "right" }}>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {product.length > 0
          ? product.map((product, i) => (
              <tr
                key={product._id}
                onClick={() => showProductDetailModal(product)}
                style={{ cursor: "pointer" }}
              >
                <td>{i + 1}</td>
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td style={{ textAlign: "right" }}>{product.price}</td>
                <td style={{ textAlign: "right" }}>{product.quantity}</td>
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
};

export default ProductTable;
