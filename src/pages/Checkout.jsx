import styled from "styled-components";
import Navbar from "../components/Navbar";
import Anouncement from "../components/Anouncement";
import Footer from "../components/Footer";
import {
  Badge,
  TextField,
  Grid,
  MenuItem,
  Stepper,
  StepLabel,
  Step,
} from "@material-ui/core";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../redux/cartRedux";
import { CancelOutlined } from "@material-ui/icons";
import { useState } from "react";
// import axios from "axios";
import { provinces, municipalities } from "psgc";

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
const OrderFormCont = styled.div`
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
  color: white;
  font-weight: 800;
  border-radius: 10px;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const name = "Philippines";
  const [provName, setProvName] = useState("");
  const [munName, setMunName] = useState("");
  const [brgyName, setBrgyName] = useState("");
  const prov = provinces.all().sort((a, b) => a.name.localeCompare(b.name));
  const mun = provinces.find(provName);
  const brgy = municipalities?.find(munName);

  // console.log("prov: ", prov);
  // console.log("mun: ", mun);
  // console.log("brgy", brgy);

  const deleteCartProduct = (product) => {
    dispatch(deleteFromCart(product));
  };

  const handleChangeProv = (event) => {
    setProvName(event.target.value);
    setMunName("");
    setBrgyName("");
  };

  const handleChangeMun = (event) => {
    setMunName(event.target.value);
    setBrgyName("");
  };

  const handleChangeBrgy = (event) => {
    setBrgyName(event.target.value);
  };

  return (
    <Container>
      <Anouncement />
      <Navbar />
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
                        ₱ {product.price * product.quantity}
                      </ProductPrice>
                      <ProductName>{product.title}</ProductName>
                      <ProductColor color={product.color} />
                    </Details>
                  </ProductDetail>
                </Product>
              ))}
            </Info>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total ? 250 : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total ? -250 : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total}</SummaryItemPrice>
            </SummaryItem>
          </Summary>
          <OrderFormCont>
            <Stepper activeStep={0} orientation="horizontal" >
              <Step>
                <StepLabel>Information</StepLabel>
              </Step>
              <Step>
                <StepLabel>Payment Method</StepLabel>
              </Step>
              
            </Stepper>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Country"
                  value={name}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="First Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Province"
                  variant="outlined"
                  fullWidth
                  required
                  value={provName}
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
                  label="City, Municipality"
                  variant="outlined"
                  fullWidth
                  required
                  value={munName}
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
                <TextField
                  required
                  label="Postal/Zip Code"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {brgy?.barangays.length === 0 ? (
                  <TextField
                    label="Barangay, Village "
                    variant="outlined"
                    fullWidth
                    required
                    value={brgyName}
                    onChange={handleChangeBrgy}
                  />
                ) : (
                  <TextField
                    select
                    required
                    label="Barangay"
                    variant="outlined"
                    fullWidth
                    value={brgyName}
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
                  label="Street Name, Purok, House No."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button>Continue to Payment Method</Button>
              </Grid>
            </Grid>
          </OrderFormCont>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
