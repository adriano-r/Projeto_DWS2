import React from "react";
import "./topbar.css";
import {ExitToApp} from "@material-ui/icons";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/userRedux";

export default function Topbar() {

    const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser?.isAdmin;
    const history = useHistory();
    const location = useLocation();

    const loginScreen = location.pathname.split("/")[1];

    const dispatch = useDispatch();

    const handlelogout = () => {
        dispatch(logout());
        history.push("/login");
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <Link to="/">
                    <div className="topLeft">
                        <span className="logo">Double Biceps</span>
                    </div>
                </Link>
                {loginScreen !== "login" ? (

                    <div className="topRight">
                        {admin === true ?
                            <div className="topbarIconContainer">
                                <Link onClick={() => handlelogout()}>
                                    <ExitToApp/>
                                </Link>
                            </div>
                            :
                            <div className="topbarIconContainer">
                                <Link to="/login">
                                    <h2>Login</h2>
                                </Link>
                            </div>}
                    </div>

                ) : (
                    <div></div>
                )}


            </div>
        </div>
    );
}