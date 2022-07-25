import React, {useState} from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../redux/apiCalls";
import {useNavigate} from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 15%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({width: "75%"})}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 10px 10px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #195128;
  color: white;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Register = () => {

    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        addUser(inputs, dispatch, navigate);
    }


    return (
        <Container>
            <Wrapper>
                <Title>Cadastre-se</Title>
                <Form>
                    <div>
                        <label>Nome</label>
                        <Input placeholder="Nome"
                               type="text"
                               name="username"
                               onChange={handleChange}/>
                    </div>
                    <div>
                        <label>E-mail</label>
                        <Input placeholder="E-mail"
                               type="email"
                               name="email"
                               onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Senha</label>
                        <Input placeholder="Senha"
                               type="password"
                               name="password"
                               onChange={handleChange}/>
                    </div>
                </Form>
                <Button onClick={handleClick}>Criar Conta</Button>
            </Wrapper>
        </Container>
    );
};

export default Register;
