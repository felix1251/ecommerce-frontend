import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Rating } from "react-simple-star-rating";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import "./product.css"
import { getProductReview, addReview } from "../redux/reviewRedux";
import moment from "moment"


const Container = styled.div``;
const Wrapper = styled.div`
  padding: 25px 100px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const InfoContainer = styled.div`
  width: 700px;
  padding: 0px 20px;
  ${mobile({ padding: "0px", width: "100%", flex: 1 })}
`;
const Title = styled.h1`
  font-weight: 500;
  margin-bottom: 10px;
  ${mobile({ fontSize: "25px", marginBottom: "5px" })}
`;
// const Desc = styled.div`
//   margin-top: 35px;
//   width: fit-content; 
//   /* To adjust the height as well */ 
//   height: fit-content;
//   line-height: 1.4;
// `;
const Price = styled.span`
  font-weight: 600;
  font-size: 40px;
  ${mobile({ fontSize: "30px" })}
`;
const Currency = styled.span`
  font-size: 35px;
  ${mobile({ fontSize: "30px" })}
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right: 7px;
`;
const FilterColor = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color:  ${(props) => props.color};
  margin: 0px 5px;
  box-shadow: 1px 1px 3px #888888;
  cursor: pointer;
`;

const FilterSizeOption = styled.h4`
  padding: 0px 10px;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-content: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button1 = styled.button`
  padding: 15px;
  border: none;
  border-radius: 15px;
  background-color: #028a19;
  cursor: pointer;
  color: white;
  font-weight: 700;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #05a821;
  }
  ${mobile({ display: "none" })}
`;

const StickyFooter = styled.div`
  ${mobile({
  height: "80px",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  boxShadow:
    "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5)",
})}
`;

const ButtonSticky = styled.button`
  padding: 17px 20px;
  width: 100%;
  border: none;
  background-color: #028a19;
  cursor: pointer;
  color: white;
  font-weight: 700;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #2ac944;
  }
  @media only screen and (min-width: 420px) {
    display: none;
  }
`;

const ReviewContainer = styled.div`
  padding: 0px 5px;
`;

const Review = styled.div`
  margin-bottom: 10px;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [rating, setRating] = useState(0);
  const [notify, setNotify] = useState("")
  const [reviewInput, setReviewInput] = useState("")
  const [name, setName] = useState("")
  const [ratingInput, setRatingInput] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const rev = useSelector(state => state.reviews.data)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setSize(res.data.size[0]);
        setColor(res.data.color[0]);
        dispatch(getProductReview(res.data.reviews.reverse()))
      } catch (err) { }
    };
    getProduct();
  }, [id, dispatch]);

  useEffect(() => {
    var total = 0
    for (let i = 0; i < product.reviews?.length; i++) {
      total += product.reviews[i].rating
    }
    setRating(total / product.reviews?.length)
  }, [product]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    const stateId = Date.now();
    dispatch(
      addProduct({ ...product, quantity, color, size, stateId: stateId })
    );
  };

  const addRev = async () => {
    setLoading(true)
    var convertRating = 0
    convertRating = ratingInput * 5 / 100
    const review = { name: name, rating: convertRating, comment: reviewInput }
    if (name && convertRating !== 0 && reviewInput) {
      try {
        const res = await publicRequest.post("/products/review/" + product._id, review);
        dispatch(addReview(res.data.review))
        setNotify(res.data.message)
        setOpen(false)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setNotify("Error sending, something is wrong")
      }
    } else {
      if (ratingInput === 0) {
        setNotify("Rating is not set")
      }
      else if (name === "") {
        setNotify("Name is not set")
      }
      else if (reviewInput === "") {
        setNotify("Review message is not set")
      }
      setLoading(false)
    }
  }

  const handleRating = (rate) => {
    setRatingInput(rate)
  }

  const openReview = () => {
    setOpen(!open)
  }

  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <Carousel>
            {product.img?.map((c, key) => (
              <img key={key} alt="" src={c} />
            ))}
          </Carousel>
        </ImageContainer>
        <InfoContainer>
          <div>
            <Title>{product.title}</Title>
            <hr />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating ratingValue={rating / 5 * 100} size={28} iconsCount={5} readonly={true} />
              {product.reviews?.length !== 0 &&
                <span style={{ marginLeft: "10px", fontWeight: "600", fontSize: "18px" }}> {rev.length > 1 ? `( ${rev.length} reviews)` : `( ${rev.length} review)`}</span>
              }
            </div>
            <Price>
              <Currency>₱</Currency> {product.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Price>
            <FilterContainer>
              {product.color?.length !== 0 &&
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  <FormControl
                    style={{ border: "0.3px solid black", width: "60px" }}
                  >
                    <Select
                      labelId="simple-select-label"
                      id="select"
                      value={color}
                      label="Color"
                      onChange={(e) => setColor(e.target.value)}
                      required
                    >
                      {product.color?.map((c) => (
                        <MenuItem key={c} value={c}>
                          <FilterColor color={c} key={c} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Filter>
              }
              {product.size?.length !== 0 &&
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FormControl
                    style={{ border: "0.3px solid black" }}
                  >
                    <Select
                      labelId="simple-select-label"
                      id="select"
                      value={size}
                      label="Size"
                      onChange={(e) => setSize(e.target.value)}
                      required
                    >
                      {product.size?.map((s, key) => (
                        <MenuItem key={key} value={s}>
                          <FilterSizeOption>{s}</FilterSizeOption>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Filter>
              }

            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("dec")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("ins")}
                />
              </AmountContainer>
              <Link to="/checkout" onClick={handleClick}>
                <Button1>BUY NOW - COD AVAILABLE</Button1>
              </Link>
            </AddContainer>
            <div id="myDiv" dangerouslySetInnerHTML={{ __html: product.desc }} />
            <hr />
            <ReviewContainer>
              <h2 style={{ margin: "10px 10px", textAlign: "center" }}>Reviews</h2>
              <Button onClick={openReview} variant="contained" style={{ marginBottom: "15px" }} color={open ? "secondary" : "primary"}> {open ? "Close" : "Write a review"} </Button> {!open && notify === "Review Added" && notify}
              {open &&
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <Rating size={45} iconsCount={5} onClick={handleRating} />
                  <TextField
                    style={{ marginBottom: "10px" }}
                    required
                    value={name}
                    label={"Your name"}
                    fullWidth
                    variant="outlined"
                    onChange={(e => setName(e.target.value))}
                  />
                  <TextField
                    required
                    value={reviewInput}
                    label={"Review message"}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    onChange={(e => setReviewInput(e.target.value))}
                  />
                  <div style={{ color: "red", marginTop: "10px" }}>{notify}</div>
                  <Button onClick={addRev} variant="contained" style={{ margin: "15px", backgroundColor: "#3ee4bd", maxWidth: "200px" }}> Send review</Button>
                </div>
              }
              {rev.map((r, key) => (
                <Review key={key}>
                  <span style={{ marginRight: "10px", fontWeight: "700" }}>{r.name}</span> <Rating ratingValue={r.rating / 5 * 100} size={18} iconsCount={5} readonly={true} />
                  <div>
                    {r.comment}
                  </div>
                  <small style={{ color: "gray" }}>{moment(r.createdAt).fromNow()}</small>
                </Review>
              ))}
            </ReviewContainer>
          </div>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <StickyFooter>
        <Link to="/checkout" onClick={handleClick}>
          <ButtonSticky>BUY NOW - COD AVAILABLE (FREE SHIPPING)</ButtonSticky>
        </Link>
      </StickyFooter>
    </Container>
  );
};

export default Product;
