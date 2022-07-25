import "./newUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";
import { useHistory} from 'react-router-dom';

export default function NewUser() {
  const [inputs,setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useHistory();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick =(e)=>{
    e.preventDefault();
    addUser(inputs, dispatch);
    alert("Usuario criado com sucesso!");
    navigate.push("/");
    }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Novo usuario</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>username</label>
          <input name="username"
                 type="text" 
                 placeholder="666FernaninDarkShadow6969"
                 onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>E-mail</label>
          <input name="email"
                 type="email" 
                 placeholder="6969fernandinDarkShadow@gmail.com"
                 onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password"
                 type="password" 
                 placeholder="password"
                 onChange={handleChange}/>
        </div>      
      </form>
      <button onClick={handleClick} className="newUserButton">Criar</button>
    </div>
  );
}
