import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const CardInfo = styled.div`
  width: 100%;
  height: 50px;
  opacity: 80%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #ffd2b4;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  min-width: 300px;
  height: 350px;
  z-index: 2;
  object-fit: cover;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Title = styled.h1`
  font-size: 16px;
  margin: 0px 10px;
`;
const Price = styled.h1`
  font-size: 24px;
  margin: 0px 10px;
  color: white;
`;
const PriceContainer = styled.div`
  background-color: black;
  height: 100%;
  min-width: 95px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Product = ({ item }) => {
  console.log(item)
  return (
    <Container>
      <Circle />
      <CardInfo>
        <Title>{item.title}</Title>
        <PriceContainer>
          <Price>₱ {item.price}</Price>
        </PriceContainer>
      </CardInfo>
      <Image src={item.img[0]} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
