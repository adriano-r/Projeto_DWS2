import {MailOutline, PermIdentity, Publish,} from "@material-ui/icons";
import {Link, useHistory, useLocation} from "react-router-dom";
import "./user.css";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {updateUser} from "../../redux/apiCalls";

export default function User() {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state) =>
        state.user.users.find((user) => user._id === userId));
    const navigate = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        updateUser(userId, inputs, dispatch);
        alert("Usuario Atualizado com sucesso!");
        navigate.push("/");
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    console.log(inputs)
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Editar Usuario</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Criar</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.username}</span>
                            <span className="userShowUserTitle">ID:{user._id}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Detalhes da conta</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.username}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Editar</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder={user.username}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder={user.email}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Senha</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="*****"
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon"/>
                                </label>
                                <input type="file" id="file" style={{display: "none"}}/>
                            </div>
                            <button onClick={handleClick} className="userUpdateButton">Atualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
