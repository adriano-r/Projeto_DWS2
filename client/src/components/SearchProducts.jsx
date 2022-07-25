import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import {mobile} from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const EmptyCart = styled.div`
  border: 0.5px solid lightgray;
  padding: 100px;
  text-align: center;
  margin: 50px 300px;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
`;

const SearchProducts = ({busca}) => {

    const [products, setProducts] = useState([]);

    const buscaComp = busca.toLowerCase().trim();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
            }
        };
        getProducts();
    });

    let produtosFiltrados = '';

    if (!buscaComp) {
        produtosFiltrados = products;
    } else {
        produtosFiltrados = products.filter((produto) => {
            const nomeProduto = produto.tittle.toLowerCase().trim();
            return nomeProduto.includes(buscaComp)
        });
    }

    return (
        <Container>
            {produtosFiltrados.length ? (
                produtosFiltrados.slice(0, produtosFiltrados.length).map((item) =>
                    <Product item={item} key={item.id}/>)
            ) : (<Wrapper>
                    <EmptyCart>
                        <h1>
                            Sua busca não encontrou nenhum produto
                        </h1>
                        <p>
                            Volte para página inicial ou faça uma nova busca
                        </p>
                    </EmptyCart>
                </Wrapper>)}
        </Container>
    );
};
export default SearchProducts;
