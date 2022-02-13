import { useEffect, useState } from "react";
// import styled from "styled-components";
// import Product from "./Product";
// import { mobile } from '../responsive';
import { publicRequest } from "../requestMethods";
import ProductCard from "../components/ProductCard"
import { Grid } from "@material-ui/core";
import ReactPaginate from 'react-paginate';
// import { Link } from "react-router-dom";


const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageNumber, SetPageNumber] = useState(0)
  const productPerPage = 12
  const pagesVisited = pageNumber * productPerPage
  const pageCount = Math.ceil(products.length / productPerPage)
  const changePage = ({ selected }) => {
    SetPageNumber(selected)
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products?category=${cat}`
            : "/products"
        );
        setProducts(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  // console.log(products)
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div style={{ margin: "30px 0px" }}>
      <Grid container spacing={3} justifyContent="center">
        {cat
          ? filteredProducts.slice(pagesVisited, pagesVisited + productPerPage).map((item, key) =>
            <ProductCard item={item} key={key} />
          )
          : products
            .slice(0, 8)
            .map((item, key) => <ProductCard item={item} key={key} />)}
      </Grid>
      <br /><br />
      {cat && pageCount > 1 &&
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      }
    </div>
  );
};

export default Products;
