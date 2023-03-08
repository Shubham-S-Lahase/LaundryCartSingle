import React , {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PastOrders from "../components/pastOrders/pastOrders";

const Home = ()=> {

    const navigate = useNavigate();

    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        fetch("https://lc-server.onrender.com/api/order", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"  
        })
            .then((response) => {
                //if (response.status === 403) return navigate("/");
                return response.json();
            })
            .then((data) => {
                setFetchedData(data.orders);
                console.log(data);
            });
    }, []);

      const handleCreateClick = () => {
        navigate("/createorder");
      };
      
    return (
        <>  
            <div
                className="home-container"
                style={{ width:"1500px" }}
            >
                <div className="home-container-hero" style={{ height: "10vh" }}>
                    <div>
                        {fetchedData?.length ? (
                            <div htmlFor="order-count" style={{ position: "absolute", padding: "5vh 5vw" }}>
                                Orders | {fetchedData?.length}
                            </div>
                        ) : (
                            <div htmlFor="order-count" style={{ position: "absolute", padding: "5vh 5vw" }}>
                                Orders | 0
                            </div>
                        )
                        }
                    </div>
                    
                    <div style={{ float: "right", margin: "5vh 5vw" }}>
                        {fetchedData?.length ? (
                            <button className="btn-vt" onClick={() => handleCreateClick()}>
                                Create
                            </button>
                        ) : (
                            <></>
                        )}
                        <div
                            style={{
                                display: "inline-block",
                                borderBottom: "1px solid gray",
                            }}
                        >
                            <img src={require("../Images/search.png")} alt="search" />
                            <input type="text" style={{ border: "none" }} />
                        </div>
                    </div>
                </div>

                <div style={{ margin: "0 5vw" }}>
                    {fetchedData?.length ? (
                        <PastOrders data={fetchedData} />
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "60vh",
                                flexDirection: "column",
                            }}
                        >
                            <p style={{ color: "#222B45", opacity: "0.5" }}>
                                No Orders available
                            </p>
                            <button className="btn-vt" onClick={() => handleCreateClick()}>
                                Create
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
  
export default Home;