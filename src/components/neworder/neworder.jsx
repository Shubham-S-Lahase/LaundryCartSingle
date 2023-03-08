import React from "react";
import ProductRow from "../productsRow/row";


const CreateOrders = ()=> {
    return (
        <>
            <div
                className="catelog-container"
                style={{ width:"1500px" }}
            >
                <div className="catelog-container-hero" style={{ height: "10vh" }}>
                    <div style={{ position: "absolute", padding: "5vh 5vw" }}>
                        Create Order
                    </div>
                    <div style={{ float: "right", margin: "5vh 5vw" }}>
                        <div
                            style={{
                                display: "inline-block",
                                borderBottom: "1px solid gray",
                            }}
                        >
                            <img src={require("../../Images/search.png")} alt="search" />
                            <input type="text" style={{ border: "none" }} />
                        </div>
                    </div>
                </div>
                <div style={{ margin: "0 5vw" }}>
                    <ProductRow />
                </div>
            </div>
        </>
    )
}

export default CreateOrders;