import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
    flex: 1;
    margin: 0px 5px;
    height: 70vh;
    position: relative;
    
`
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    ${mobile({ height: "25vh" })}
    
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px ;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: #f1f51e;
    color: black;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
};

export default CategoryItem;
