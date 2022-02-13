import React from 'react';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import { mobile } from "../responsive";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  ${mobile({ margin: "15px 10px" })}
`
const Home = () => {
    return (
        <Container>
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
        </Container>
    )
};

export default Home;
