import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Rating } from "react-simple-star-rating";
import {
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";


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
  flex: 1;
  padding: 0px 25px;
  ${mobile({ padding: "0px" })}
`;
const Title = styled.h1`
  font-weight: 500;
  margin-bottom: 10px;
  ${mobile({ fontSize: "25px", marginBottom: "5px" })}
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
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
  background-color: ${(props) => props.color};
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
const Button = styled.button`
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

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setSize(res.data.size[0]);
        setColor(res.data.color[0]);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

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

  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <Carousel infiniteLoop>
            <img alt="" src={product.img} />
          </Carousel>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <hr />
          <Rating ratingValue={75} size={28} iconsCount={5} readonly={true} />
          <br />
          <Price>
            <Currency>₱</Currency> {product.price}
          </Price>
          <FilterContainer>
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
                  {product.size?.map((s) => (
                    <MenuItem key={s} value={s}>
                     <FilterSizeOption>{s}</FilterSizeOption>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Filter>
            {/* <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter> */}
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
              <Button>BUY NOW - COD AVAILABLE</Button>
            </Link>
          </AddContainer>
          <Desc>{product.desc}</Desc>
          {/* <div dangerouslySetInnerHTML={{__html:text}}></div> */}
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
