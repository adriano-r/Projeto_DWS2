import React, {useState} from "react";
import {Badge} from "@material-ui/core";
import {ExitToApp, FavoriteBorder, ShoppingCartOutlined,} from "@material-ui/icons";
import styled from "styled-components";
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../redux/userRedux";
import LoginIcon from '@mui/icons-material/Login';

const Container = styled.div`
  height: 60px;
  background-color: #195128;
  ${mobile({height: "50px"})}
`;


const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f1f1f1;
  ${mobile({padding: "10px 0px"})}
`;

const Left = styled.div`
  text-align: center;
  flex: 1;
`;

const Logo = styled.span`
  font-size: 25px;
  cursor: pointer;
  font-weight: 700;
  ${mobile({fontSize: "14px"})}
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  margin-right: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({flex: 2, justifyContent: "center"})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize: "12px", marginLeft: "10px"})}
`;

const Navbar = () => {
    const [busca, setBusca] = useState("");

    const user = useSelector((state) => state.user.currentUser);

    const quantity = useSelector(state => state.cart.quantity)

    const whislistQunatity = useSelector(state => state.whislist.quantity)

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handlelogout = () => {
        dispatch(logout())
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (busca.trim()) {
            navigate("/search", {
                state: {busca: busca},
            });
        } else {
            navigate("/products");
        }
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/">
                        <Logo>Double Biceps</Logo>
                    </Link>
                </Left>
                <Center>
                    <form onSubmit={submitHandler} className="input-group">
                        <input
                            type="search"
                            className="form-control rounded search"
                            placeholder="Search"
                            onChange={(e) => setBusca(e.target.value)}
                        />
                        <button type="submit" className="search-button">
                            search
                        </button>
                    </form>
                </Center>
                <Right>
                    {user ? (
                        <MenuItem>
                            <ExitToApp onClick={() => handlelogout()}/>
                            <Link to="/whislist">
                                <FavoriteBorder/>
                                <Badge badgeContent={whislistQunatity} color="primary"/>
                            </Link>
                        </MenuItem>
                    ) : (
                        <Link to="/login">
                            <LoginIcon></LoginIcon>
                        </Link>
                    )}
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary"/>
                            <ShoppingCartOutlined/>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;