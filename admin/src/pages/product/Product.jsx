import {Link, useHistory, useLocation} from "react-router-dom";
import "./product.css";
import {Publish} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {updateProduct} from "../../redux/apiCalls";
import {getDownloadURL, getStorage, ref, uploadBytesResumable,} from "firebase/storage";
import app from "../../firebase"
import {useState} from "react";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const navigate = useHistory();
    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId));
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState({})
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = {...inputs, img: downloadURL};
                    updateProduct(productId, product, dispatch);
                    console.log("Produto atualizado com sucesso!");
                    alert("Produto atualizado com sucesso!");
                    navigate.push("/");
                });
            }
        );
    };
    console.log(productId)
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Produto</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Criar</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg"/>
                        <span className="productName">{product.tittle} </span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">{product._id}</span>
                            <span className="productInfoValue">{product.price}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Ativo</span>
                            <span className="productInfoValue">Sim</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Em estoque</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Nome</label>
                        <input
                            name="tittle"
                            type="text"
                            placeholder={product.tittle}
                            onChange={handleChange}
                        />
                        <label>Descrição</label>
                        <input
                            name="desc"
                            type="text"
                            placeholder={product.desc}
                            onChange={handleChange}
                        />
                        <label>Marca</label>
                        <input
                            name="brand"
                            type="text"
                            placeholder={product.brand}
                            onChange={handleChange}
                        />
                        <label>Tipo</label>
                        <input
                            name="type"
                            type="text"
                            placeholder={product.type}
                            onChange={handleChange}
                        />
                        <label>Preço</label>
                        <input
                            name="price"
                            type="number"
                            placeholder={product.price}
                            onChange={handleChange}
                        />
                        <label>Categoria</label>
                        <select name="category" onChange={handleChange}>
                            <option value="roupas">Roupas</option>
                            <option value="acessorios">Acessorios</option>
                            <option value="consumiveis">Consumiveis</option>
                        </select>
                        <label>Stock</label>
                        <select name="inStock" onChange={handleChange}>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg"/>
                            <label htmlFor="file">
                                <Publish/>
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <button onClick={handleClick} className="productButton">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
