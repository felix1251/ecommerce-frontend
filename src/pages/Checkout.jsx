import styled from "styled-components";
import { Badge, TextField, Grid, MenuItem } from "@material-ui/core";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../redux/cartRedux";
import { AttachMoney, CancelOutlined, LocalShipping } from "@material-ui/icons";
import { useState } from "react";
import { provinces, municipalities } from "psgc";
import data from "../postal";
import { makeStyles } from "@material-ui/core/styles";
import { publicRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import io from "socket.io-client"

const useStyles = makeStyles({
  root: {
    "& .MuiFormLabel-root": {
      color: "#242424",
    },
    "& .Mui-error .MuiFormLabel-root": {
      color: "#000000",
    },
    "& .MuiOutlinedInput-root ": {
      borderColor: "#0026fff8",
    },
    "& .MuiOutlinedInput-root": {
      borderColor: "#000000f8",
    },
  },
});

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;
const Bottom = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Delete = styled.div`
  margin: 5px 5px;
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 50%;
  right: 0;
  top: 0;
  z-index: 3;
  display: flex;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const Product = styled.div`
  border: 1px solid lightgray;
  display: flex;
  padding: 5px;
  height: 100px;
  align-items: center;
  background-color: white;
  position: relative;
`;
const ProductDetail = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  ${mobile({ width: "100px", height: "100px" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const ProductName = styled.span`
  margin-bottom: 5px;
  ${mobile({ fontSize: "15px" })}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 500;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 20px;
  ${mobile({ margin: "5px", padding: "10px" })}
  background-color: #e4e4e4;
`;
const OrderFormCont = styled.form`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 20px;
  ${mobile({ margin: "5px", padding: "0px", border: "none" })}
`;
const SummaryTitle = styled.h1`
  font-weight: 500;
  margin-bottom: 10px;
`;
const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  margin-top: 15px;
  background-color: #0aa316;
  padding: 16px;
  width: 300px;
  color: white;
  border: none;
  font-weight: 800;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #05a821;
  }
  ${mobile({ width: "300px" })}
`;

const socket = io("http://localhost:5000")

const Cart = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [provName, setProvName] = useState("");
  const [munName, setMunName] = useState("");
  const [brgyName, setBrgyName] = useState("");
  const [code, setCode] = useState("");
  const [stName, setStName] = useState("");
  const [payWith, setPaywith] = useState("CASH ON DELIVERY");

  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [provNameError, setProvNameError] = useState(false);
  const [munNameError, setMunNameError] = useState(false);
  const [brgyNameError, setBrgyNameError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [stNameError, setStNameError] = useState(false);
  
  const prov = provinces.all().sort((a, b) => a.name.localeCompare(b.name));
  const mun = provinces.find(provName);
  const brgy = municipalities?.find(munName);
  const paymentMethod = ["CASH ON DELIVERY", "PAYPAL", "GCASH"];
  const [error, setError] = useState("");
  const history = useHistory();

  const sendOrder = async (e) => {
    e.preventDefault()
    setFNameError(false)
    setLNameError(false)
    setMobileNumberError(false)
    setProvNameError(false)
    setCodeError(false)
    setMunNameError(false)
    setBrgyNameError(false)
    setStNameError(false)

    if (cart?.products.length !== 0) {
      if (fName && lName && mobileNumber && stName && brgyName && munName && provName && code && payWith === "CASH ON DELIVERY") {
        try {
          const res = await publicRequest.post("/orders", {
            userId: fName + " " + lName,
            mobileNo: mobileNumber,
            products: prodArr,
            amount: cart.total,
            address: stName + ", " + brgyName + ", " + munName + " ," + provName + ", " + code,
            paymentType: payWith,
          });
          socket.emit('sendNotification', { senderName: `${fName + " " + lName}`, recieverName: "admin" })
          history.push("/success", { data: res.data });
          dispatch(clearCart())
        } catch { }
      } else {
        if (fName === "") {
          setFNameError(true)
        }
        if (lName === "") {
          setLNameError(true)
        }
        if (mobileNumber === "") {
          setMobileNumberError(true)
        }
        if (provName === "") {
          setProvNameError(true)
        }
        if (code === "") {
          setCodeError(true)
        }
        if (munName === "") {
          setMunNameError(true)
        }
        if (brgyName === "") {
          setBrgyNameError(true)
        }
        if (stName === "") {
          setStNameError(true)
        }
        setError(`Missing details ( ${!fName ? "*First Name*" : ""} ${!lName ? "*Last Name*" : ""} 
        ${!mobileNumber ? "*Mobile-No.*" : ""} ${!provName ? "*Province*" : ""} ${!munName ? "*City/Municipality*" : ""}
        ${!code ? "*Postal Code*" : ""} ${!brgyName ? "*Barangay*" : ""} ${!stName ? "*Street Name/Purok/House No.*" : ""} 
        ${payWith !== "CASH ON DELIVERY" ? `*${payWith} payment is not available for the meantime*` : ""} )`);
      }
    } else {
      setError("Add a product to your cart first!");
    }
  };

  const prodArr = [];
  cart?.products.map((p) => {
    const { _id, quantity, color } = p;
    return prodArr.push({ productId: _id, quantity: quantity, color: color });
  });

  // console.log(cart)

  // console.log(prodArr);
  const postalData = data.filter(function (d) {
    return (
      d.municipality.toLowerCase() === munName.toLowerCase() &&
      d.province.toLowerCase() === provName.toLowerCase()
    );
  });

  // console.log(prodArr);

  // console.log(fName, lName, mobileNumber);
  // console.log(
  //   stName + ", " + brgyName + ", " + munName + " ," + provName + ", " + code
  // );

  const deleteCartProduct = (product) => {
    dispatch(deleteFromCart(product));
  };

  const handleChangeProv = (event) => {
    setProvName(event.target.value);
    setMunName("");
    setBrgyName("");
    setCode("");
  };

  const handleChangeMun = (event) => {
    setMunName(event.target.value);
    setBrgyName("");
    setCode("");
  };

  const handleChangeBrgy = (event) => {
    setBrgyName(event.target.value);
  };

  const pPrice = (price, quantity) => {
    return price * quantity
  }

  return (
    <Container>
      <Wrapper>
        <Title>CHECKOUT</Title>
        <Bottom>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <Info>
              {cart.products?.map((product, key) => (
                <Product key={key}>
                  <Delete onClick={() => deleteCartProduct(product)}>
                    <CancelOutlined />
                  </Delete>
                  <Badge badgeContent={product.quantity} color="primary">
                    <Image src={product.img} />
                  </Badge>
                  <ProductDetail>
                    <Details>
                      <ProductPrice>
                        ₱ {pPrice(product.price, product.quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </ProductPrice>
                      <ProductName>{product.title.length >= 25 ? product.title.slice(0, 25) + "...." : product.title}</ProductName>
                      <ProductColor color={product.color} />
                    </Details>
                  </ProductDetail>
                </Product>
              ))}
            </Info>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total ? "250.00" : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total ? "-250.00" : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</SummaryItemPrice>
            </SummaryItem>
          </Summary>
          <OrderFormCont noValidate autoComplete="off" onSubmit={sendOrder}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.root}
                  value={fName}
                  required
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={fNameError}
                  onChange={(e) => setFName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  className={classes.root}
                  value={lName}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={lNameError}
                  onChange={(e) => setLName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  inputProps={{ min: 4, max: 10 }}
                  className={classes.root}
                  value={mobileNumber && mobileNumber}
                  label={mobileNumber.length === 0 ? "Mobile Number (ex. 09123456789)" : `Mobile Number - Length Checker: (${mobileNumber.length})`}
                  variant="outlined"
                  fullWidth
                  error={mobileNumberError}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  className={classes.root}
                  label="Province"
                  variant="outlined"
                  fullWidth
                  required
                  value={provName}
                  error={provNameError}
                  onChange={handleChangeProv}
                >
                  {prov.map((option, key) => (
                    <MenuItem value={option.name} key={key}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  select
                  className={classes.root}
                  label="City, Municipality"
                  variant="outlined"
                  fullWidth
                  required
                  value={munName}
                  error={munNameError}
                  onChange={handleChangeMun}
                >
                  {mun?.municipalities.map((option, key) => (
                    <MenuItem value={option.name} key={key}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                {postalData.length === 0 ? (
                  <TextField
                    className={classes.root}
                    label="Zip/Postal Code"
                    variant="outlined"
                    fullWidth
                    required
                    value={code}
                    error={codeError}
                    onChange={(e) => setCode(e.target.value)}
                  />
                ) : (
                  <TextField
                    select
                    className={classes.root}
                    label="Zip/Postal Code"
                    variant="outlined"
                    fullWidth
                    required
                    value={code}
                    error={codeError}
                    onChange={(e) => setCode(e.target.value)}
                  >
                    {postalData.map((option, key) => (
                      <MenuItem value={option.code} key={key}>
                        {option.code}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>
              <Grid item xs={12}>
                {brgy?.barangays.length === 0 ? (
                  <TextField
                    className={classes.root}
                    label="Barangay/Village"
                    variant="outlined"
                    fullWidth
                    required
                    value={brgyName}
                    error={brgyNameError}
                    onChange={handleChangeBrgy}
                  />
                ) : (
                  <TextField
                    select
                    className={classes.root}
                    required
                    label="Barangay"
                    variant="outlined"
                    fullWidth
                    value={brgyName}
                    error={brgyNameError}
                    onChange={handleChangeBrgy}
                  >
                    {brgy?.barangays.map((option, key) => (
                      <MenuItem value={option.name} key={key}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  label="Street Name/Purok/House No."
                  variant="outlined"
                  value={stName}
                  fullWidth
                  required
                  error={stNameError}
                  onChange={(e) => setStName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "15px" }}>
                <TextField
                  className={classes.root}
                  select
                  error={payWith === "CASH ON DELIVERY" ? false : true}
                  label={
                    payWith === "CASH ON DELIVERY"
                      ? "Payment Method"
                      : "Temporary not available"
                  }
                  variant="outlined"
                  fullWidth
                  required
                  value={payWith}
                  onChange={(e) => setPaywith(e.target.value)}
                >
                  {paymentMethod.map((p) => (
                    <MenuItem value={p} key={p}>
                      {p === "CASH ON DELIVERY" ? (
                        <div
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <LocalShipping style={{ marginRight: "10px" }} /> {p}
                        </div>
                      ) : (
                        <div
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <AttachMoney style={{ marginRight: "10px" }} /> {p}
                        </div>
                      )}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <div style={{ color: "red", marginTop: "10px", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
                <span style={{ textAlign: "center" }}>{error}</span>
                <Button>ORDER NOW</Button>
              </div>
            </Grid>
          </OrderFormCont>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
