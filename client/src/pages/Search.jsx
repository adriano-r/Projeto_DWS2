import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import SearchProducts from "../components/SearchProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {Link, useLocation} from "react-router-dom";

const Container = styled.div``;

const Search = () => {

    const location = useLocation();

    const busca = location.state.busca;

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <SearchProducts busca={busca}/>
            <Newsletter/>
            <Footer/>
        </Container>
    );
};

export default Search;
