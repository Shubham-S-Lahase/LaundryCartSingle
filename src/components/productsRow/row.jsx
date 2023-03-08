import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/popup";
import './summary.css';
import './row.css'


const ProductRow = () => {

    const navigate = useNavigate();

    const [rowData, setRowData] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [totalCart, setTotalCart] = useState([]);
    const [summaryOn, setSummaryOn] = useState(false);
    const [openPop, setOpenPop] = useState(false);


    useEffect(() => {
        fetch("https://lc-server.onrender.com/getproducts", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"  
        })
            .then((response) => {
                // if (response.status === 403) return navigate("/");
                return response.json();
            })
            .then((data) => {
                setRowData(data.products);
                ///console.log(data);
            });
    }, []);


    // Handling and validating the quantity input field
    const updateQuantity = (quantity, id, price, name) => {
        if (Number.isInteger(parseInt(quantity)) && parseInt(quantity) > 0) {
            setQuantity(quantity);
            document.getElementById(`key_${id}`).disabled = true;

            // Adding quantity and price with key as product id into the cart
            setTotalCart((prevState) => [
                ...prevState,
                {
                    key: `key_${id}`,
                    name,
                    value: [
                        parseInt(quantity),
                        parseInt(price),
                        parseInt(quantity) * parseInt(price),
                    ],
                },
            ]);
            document.getElementById(
                `calc-${id}`
            ).innerHTML = `${quantity} x ${price} = <span style=color:#5861AE;font-size:20px>${quantity * price
            }</span>`;
            document.getElementById(`reset-btn-${id}`).style.display = "block";
        } else {
            setQuantity(0);
            document.getElementById(`key_${id}`).value = 0;
        }
    };


    // Handling and adding to cart the user services
    const handleService = (service) => {
        let arr = service.split("_");
        const id = arr[1];
        const serviceName = arr[0];

        // Restricting to select when quantity is empty
        const input = document.getElementById(`key_${id}`);
        if (input.value === 0 || input.value === "") return;

        setTotalCart((prevState) => {
            for (let i = 0; i < prevState.length; i++) {
                if (prevState[i].key === `key_${id}`) {
                    prevState[i][serviceName] = true;
                    break;
                }
            }
            return prevState;
        });

        switch (serviceName) {
            case "washing-machine":
                document.getElementById(service).src = "/icons/washing-machine.png"
                break;
            case "ironing":
                document.getElementById(service).src = "/icons/ironing.png"
                break;
            case "towel":
                document.getElementById(service).src = "/icons/towel.png";
                break;
            case "bleach":
                document.getElementById(service).src = "/icons/bleach.png";
                break;
            default:
                console.log("We are currently not offering this service");
        }
    };


    const handleReset = (id) => {
        // deleteing data from cart
        setTotalCart((prevState) =>
            prevState.filter((data) => (data.key === `key_${id}` ? false : true))
        );

        // resetting the UI
        document.getElementById(`washing-machine_${id}`).src = `/icons/washing-machinenc.png`;
        document.getElementById(`ironing_${id}`).src = `/icons/ironingnc.png`;
        document.getElementById(`towel_${id}`).src = `/icons/Images/towel.png`;
        document.getElementById(`bleach_${id}`).src = `/icons/Images/bleachnc.png`;
        document.getElementById(`key_${id}`).value = "";
        document.getElementById(`key_${id}`).disabled = false;
        document.getElementById(`reset-btn-${id}`).style.display = "none";
        document.getElementById(`calc-${id}`).innerText = "__";
    };


    const handleSubmit = (arg) => {
        if (arg === "proceed") {
            return setSummaryOn(true);
        }
        let total_items = 0;
        let total_price = 0;
        for (let i = 0; i < totalCart.length; i++) {
            const quantity = totalCart[i]["value"][0];
            total_items += quantity;
            total_price += totalCart[i]["value"][1] * quantity;
        }
        if (arg === "total") { return total_price }
        total_price += 90; // Delivery Charges
        const date = Date.now();
        console.log(date);
        const order_id = `OR${date}`;
        const storeLocation = document.getElementById("storeLocation").value || "JP Nagar";
        const storeAddress = document.getElementById("storeAddress").value || "Near Phone booth, 10th road,"
        const storePhone = document.getElementById("storePhone").value || 9988776655;

     
        //console.log(token);
        fetch("https://lc-server.onrender.com/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                orderId: order_id,
                storeLocation: storeLocation,
                storeAddress: storeAddress,
                city: "Bangalore",
                storePhone: storePhone,
                totalItems: total_items,
                price: total_price,
                cart: totalCart
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.status === "Success") {
                    setSummaryOn(false);
                    setOpenPop(true);
                } else alert("failed to placed the order");
                setTotalCart([]);
                navigate("/home");
            });
    };

    const getService = (key) => {
        let serviceStr = "";
        for (let i = 0; i < totalCart.length; i++) {
            if (totalCart[i].key === key) {
                if (totalCart[i].hasOwnProperty("washing-machine")) serviceStr += "Washing   ";
                if (totalCart[i].hasOwnProperty("ironing")) serviceStr += "Ironing   ";
                if (totalCart[i].hasOwnProperty("towel")) serviceStr += "Dry Wash   ";
                if (totalCart[i].hasOwnProperty("bleach")) serviceStr += "Chemical Wash";
                return serviceStr;
            }
        }
    }

    return (
        <>
            {openPop ? <Popup setOpenPop={setOpenPop} /> : <></>}


            {summaryOn ? (
                <div id="summary">
                    <div className="heading both">
                        <div >Summary</div>
                        <img src="/icons/cancel.png" alt="cancel" className="png" onClick={() => { setSummaryOn(!summaryOn) }} />
                    </div>
                    <div className='subheading'>
                        <div className='inline_hd'>
                            Store Location:{" "}
                            <input
                                id="storeLocation"
                                defaultValue="Jp Nagar"
                                type="text"
                                placeholder="__"
                                className='block_input'
                                required
                            />
                        </div>
                        <div className='inline_hd'>
                            Store Address:{" "}
                            <input
                                id="storeAddress"
                                defaultValue="Near Phone booth, 10th road,"
                                type="text"
                                placeholder="__"
                                className='block_input'
                                required
                            />
                        </div>
                        <div className='inline_hd'>
                            Phone:{" "}
                            <input
                                type="tel"
                                defaultValue="1234567890"
                                id="storePhone"
                                placeholder="__"
                                className='block_input'
                                required
                            />
                        </div>
                    </div>
                    <div className="details">Order Details</div>
                    <div>
                    <ol className='list_style'>
                        {totalCart.map((data) => (
                            <li key={data.key} className='bottom_border'>
                                <span className='inline_hd' style={{ width: "5vw" }}>{data.name}</span>
                                <span className='inline_hd' style={{ width: "20vw" }}>{getService(data.key)}</span>
                                <span className='inline_hd' style={{ width: "10vw" }}>
                                    {data.value[0]} x {data.value[1]} ={" "}
                                    <span style={{ color: "#5861AE", fontSize: "1.3rem" }}>
                                        {" "}
                                        {data.value[2]}
                                    </span>
                                </span>
                            </li>
                        ))}
                        <li className='total_block' >Sub Total: &nbsp;&nbsp;{handleSubmit("total")}</li>
                        <li className='total_block'>Pickup Charges: 90</li>
                        <li className='total_block' style={{ background: "#5861AE", fontWeight: "bold", fontSize: "25px", color: "white", width: "35vw", textAlign: "right" }}>Total: <span style={{ fontSize: "1.8rem" }}>{parseInt(handleSubmit("total")) + 90}</span></li>
                        <li className='address'>Address
                            <div className='homeAddress'>
                                <div><img src="/icons/tick.svg" alt="tick" style={{ float: "right" }} /></div>
                                <div style={{ fontWeight: "bold" }}>Home</div>
                                <div style={{ color: "#777" }}>#223, 10th road, JP Nagar, Bangalore</div>
                            </div>
                        </li>
                        <li className='corner' style={{ border: "none" }}>
                            <button
                                className="btn-vt-fill"
                                onClick={() => handleSubmit("confirm")}>Confirm
                            </button>
                        </li>
                    </ol>
                    </div>
                </div>
            ) : (
                <></>
            )}


            <table id="catelog-table" className={summaryOn ? "blur" : ""}>
                <thead>
                    <tr style={{ position: "sticky", top: 0, zIndex: -101 }}>
                        <th style={{ padding: "0 .5rem", width: "25vw" }}>Product Types</th>
                        <th style={{ width: 10 }}>Quantity</th>
                        <th style={{ width: "30vw" }}>Wash Type</th>
                        <th style={{ width: "15vw", fontWeight: "bold" }}>Price</th>
                        <th style={{ width: "10vw" }}></th>
                    </tr>
                </thead>

                {/* List Rendering based on number of products */}
                <tbody>
                    {rowData ? (
                        rowData.map((obj) => (
                            <tr key={obj.id}>
                                <td>
                                    <img
                                        src={`https://lc-server.onrender.com/public/` + obj.filename}
                                        alt={obj.name}
                                        style={{ float: "left", padding: "0 .5rem" }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            textAlign: "left",
                                            width: "20vw",
                                        }}
                                    >
                                        <div>{obj.name}</div>
                                        <div style={{ color: "#777" }}>{obj.description}</div>
                                    </div>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id={`key_${obj.id}`}
                                        placeholder="0"
                                        style={{ width: 30, textAlign: "center" }}
                                        onBlur={(e) =>
                                            updateQuantity(
                                                e.target.value,
                                                obj.id,
                                                obj.price,
                                                obj.name
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <img
                                        className="pad"
                                        src={require("../../Images/washing-machinenc.png")}
                                        id={`washing-machine_${obj.id}`}
                                        alt="washing-machine"
                                        onClick={() => handleService(`washing-machine_${obj.id}`)}
                                    />
                                    <img
                                        className="pad"
                                        src={require("../../Images/ironingnc.png")}
                                        id={`ironing_${obj.id}`}
                                        alt="ironing"
                                        onClick={() => handleService(`ironing_${obj.id}`)}
                                    />
                                    <img
                                        className="pad"
                                        src={require("../../Images/towel.png")}
                                        id={`towel_${obj.id}`}
                                        alt="towel"
                                        onClick={() => handleService(`towel_${obj.id}`)}
                                    />
                                    <img
                                        className="pad"
                                        src={require("../../Images/bleachnc.png")}
                                        id={`bleach_${obj.id}`}
                                        alt="bleach"
                                        onClick={() => handleService(`bleach_${obj.id}`)}
                                    />
                                </td>
                                <td>
                                    <div id={`calc-${obj.id}`} style={{ color: "#777" }}>
                                        __
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="btn-vt"
                                        id={`reset-btn-${obj.id}`}
                                        style={{ display: "none" }}
                                        onClick={() => handleReset(obj.id)}
                                    >
                                        Reset
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td style={{ position: "absolute", left: "40vw", top: "40vh" }}>
                                Requesting for Services from Our server......
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>


            {rowData ? (
                <div style={{ float: "right", marginTop: "1rem" }}>
                    <button className="btn-vt">Cancel</button>
                    <button
                        className="btn-vt-fill"
                        onClick={() => handleSubmit("proceed")}
                    >
                        Proceed
                    </button>
                </div>
            ) : (
                <></>
            )}


        </>
    );
};

export default ProductRow;