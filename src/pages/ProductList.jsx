import styled from "styled-components";
import Navbar from "../components/Navbar";
import Anouncement from "../components/Anouncement";
import Products from "../components/Products";
import NewsLetter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;

`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({marginRigth: "0px"})}
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({width: "0px 20px", display: "flex", flexDirection: "column"})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: "10px 0px"})}
`
const Option = styled.option`
`
const ProductList = () => {
    return (
        <Container>
            <Navbar />
            <Anouncement />
            <Title>Products</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter:</FilterText>
                    <Select>
                        <Option selected>Home Appliances</Option>
                        <Option>Eye Wear</Option>
                        <Option>Gadgets</Option>
                        <Option>Dresses</Option>
                        <Option>Mens Fashion</Option>
                        <Option>Womens Fassion</Option>
                    </Select>
                    <Select>
                        <Option disabled selected>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort:</FilterText>
                    <Select>
                        <Option selected>Newest</Option>
                        <Option>Price (asc)</Option>
                        <Option>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products />
            <NewsLetter />
            <Footer />
        </Container>
    )
};

export default ProductList;
