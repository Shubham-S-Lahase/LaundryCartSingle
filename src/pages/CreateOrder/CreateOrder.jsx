import React from "react";
import "./CreateOrder.css";
import SideBarComponent from "../../components/sideBar/sidebar";
import NavnUser from "../../components/Navbar/NavnUser";
import FooterComponent from "../../components/Footer/Footer";
import CreateOrders from "../../components/neworder/neworder";


const CreateOrderPage = () => {
  return (
    <>
      <div className="createcontainer">
        <div className="navnuser">
            <NavnUser/>
        </div>
        <div className="sidebar">
            <SideBarComponent/>
        </div>
        <div className="nfooter">
            <FooterComponent/>
        </div>
        <div className="createorder">
            <CreateOrders/>
        </div>
      </div>
    </>
  );
};

export default CreateOrderPage;
