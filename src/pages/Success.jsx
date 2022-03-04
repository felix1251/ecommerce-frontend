import { Redirect, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation()
  // console.log(location)
  return (

    <div style={{ flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center", margin: "20px", height: "50vh" }}>
      {location.state?.data ?
        <>
          <h1 style={{ marginBottom: "20px", textAlign: "center" }}> Thank you! You ordered successfully!  </h1><div>
            <div style={{ textAlign: "center", fontSize: '22px' }}><b>Order Shipping Details</b></div><br />
            <div style={{ margin: "5px 0px" }} > <b>Order id:</b> {location.state?.data._id}</div>
            <div style={{ margin: "5px 0px" }}> <b>Full name:</b> {location.state?.data.userId}</div>
            <div style={{ margin: "5px 0px" }}> <b>Location:</b> {location.state?.data.address}</div>
            <div style={{ margin: "5px 0px" }}> <b>Amount to pay:</b> ₱ {location.state?.data.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</div>
            <div style={{ margin: "5px 0px" }}> <b>Payment Type:</b> {location.state?.data.paymentType}</div>
            <div style={{ margin: "5px 0px" }}> <b>Status:</b> <span style={{ color: "green" }}>{location.state?.data.status}</span> (to be delivered as soon as possible)</div>
          </div>
        </>
        :
        <Redirect to="/" />
      }
    </div>
  )
};

export default Success;
