import "./userList.css";
import {DataGrid} from "@material-ui/data-grid";
import {DeleteOutline} from "@material-ui/icons";
import {userRows} from "../../dummyData";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";

export default function UserList() {
    const [data, setData] = useState(userRows);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);

    const handleDelete = (id) => {
        deleteUser(id, dispatch)
    };

    useEffect(() => {
        getUsers(dispatch)
    }, [dispatch])

    const columns = [
        {field: "_id", headerName: "ID", width: 200},
        {
            field: "user",
            headerName: "Usuario",
            width: 400,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg"
                             src={params.row.avatar || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                             alt=""/>
                        {params.row.username}
                    </div>
                );
            },
        },
        {field: "email", headerName: "E-mail", width: 200},
        {
            field: "action",
            headerName: "Delete/Edit",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
