import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        productsValue: 0,
        quantity: 0,
        shipping: 0,
        discount: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {

            const isExist = state.products.find((product) => product._id === action.payload._id)

            if (isExist) {
                state.products.find((product) => product._id === action.payload._id).quantity += action.payload.quantity;
                state.productsValue += action.payload.price * action.payload.quantity;
            } else {
                state.quantity += 1;
                state.products.push(action.payload);
                state.productsValue += action.payload.price * action.payload.quantity;
            }

            if (state.productsValue >= 200) state.discount = state.productsValue * 0.05;

            state.shipping = Math.round(state.productsValue * 0.02);
            state.total = state.productsValue + state.shipping - state.discount;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((x) => x._id !== action.payload._id)
            state.productsValue -= action.payload.price * action.payload.quantity;
            state.quantity -= 1;
            state.shipping = Math.round(state.productsValue * 0.02);

            if (state.productsValue < 200) state.discount = 0;

            state.total = state.productsValue + state.shipping - state.discount;
        },
        cleanCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.shipping = 0;
            state.discount = 0;
            state.productsValue = 0;
        },
        changeProductQuantity: (state, action) => {

            const quantity = state.products.find((product) => product._id === action.payload._id).quantity

            if (action.payload.tipo === "dec" && action.payload.quantity > 1) {
                state.products.find((product) => product._id === action.payload._id).quantity = quantity - 1;
                state.productsValue -= action.payload.price;

            } else if (action.payload.tipo === "inc") {
                state.total = state.productsValue + state.shipping;
                state.products.find((product) => product._id === action.payload._id).quantity = quantity + 1;
                state.productsValue += action.payload.price;
            }

            if (state.productsValue >= 200) {
                state.discount = state.productsValue * 0.05;
            } else state.discount = 0;

            state.shipping = Math.round(state.productsValue * 0.02);
            state.total = state.productsValue + state.shipping - state.discount;

        }
    },
});

export const {addProduct, removeProduct, cleanCart, changeProductQuantity} = cartSlice.actions;
export default cartSlice.reducer;
