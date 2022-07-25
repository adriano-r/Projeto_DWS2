import "./order.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, getOrders } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";
import {format} from "timeago.js"
export default function Order() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const history = useHistory()
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []); 
  const handleChange = (e) => {
    setInputs((prev) => {
        return {...prev, [e.target.name]: e.target.value};
    });
  };

/*const orders = useSelector((state) => state.order.orders);
  
    useEffect(() => {
      getOrders(dispatch);
  }, [dispatch]);*/

 const handleStatus = (id,order) => {
  updateOrder(id,order, dispatch);
 // history.push("/");
  alert("Status mudado com sucesso")
};
console.log(inputs)
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Cliente",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "createdAt", headerName: "Data do pedido", width: 200,
    renderCell: (params) => {
      return (
        <div className="productListItem">
          {format(params.row.createdAt)}
        </div>
      );
    }, },
    {
      field: "amount",
      headerName: "Preço",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <select name="status" onChange={handleChange}>
              <option value="aprovado">Aprovado</option>
              <option value="recusado">Recusado</option>
            </select>
            <Link to="/">
              <button className="productListEdit" onClick={()=> handleStatus(params.row._id,inputs)}>Mudar</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
