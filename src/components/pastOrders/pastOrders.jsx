import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./pastOrders.css";


const PastOrders = ({ data }) => {
  const navigate = useNavigate();

  data?.map((obj) => {
    const date = new Date(obj.createdAt);
    return (obj.createdAt = date.toLocaleString());
  });

  const handleCancel = (order_id) => {
    alert("order cancel functionality to be added");
  };

  const handleView = (order_id) => {
    alert("order view functionality to be added");
  };

  return (
    <>
      <table
        id="order-table"
        // className={`fontSize ${summaryOn1 ? "blur" : ""}`}
      >
        <thead>
          <tr>
            <th className="cell">Order Id</th>
            <th className="cell">Order Date and Time</th>
            <th className="cell">Store Location</th>
            <th className="cell">City</th>
            <th className="cell">Store Phone</th>
            <th className="cell">Total Items</th>
            <th className="cell">Price</th>
            <th className="cell">Status</th>
            <th className="cell">Cancel Order</th>
            <th className="cell">View</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj) => (
            <tr key={obj.orderId}>
              <td>{obj.orderId}</td>
              <td>{obj.createdAt}</td>
              <td>{obj.storeLocation}</td>
              <td>{obj.city}</td>
              <td>{obj.storePhone}</td>
              <td>{obj.totalItems}</td>
              <td style={{ color: "#5861AE", fontWeight: "bold" }}>
                {obj.price}
              </td>
              <td
                style={
                  obj.status === "cancelled"
                    ? { color: "red", fontWeight: "bold" }
                    : {}
                }
              >
                {obj.status}
              </td>
              <td>
                {" "}
                {obj.status === "cancelled" ? (
                  ""
                ) : (
                  <p className="para" onClick={() => handleCancel(obj.orderId)}>
                    Cancel Order
                  </p>
                )}
              </td>
              
              <td>
                <img
                  src={require("../../Images/view.jpg")}
                  alt="view"
                  width="15vw"
                  onClick={() => {
                    handleView(obj._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PastOrders;
