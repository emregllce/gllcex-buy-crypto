import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.product.id
        );
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].cartQuantity += action.payload.qty;
        } else {
          const tempProducts = { ...action.payload.product, cartQuantity: action.payload.qty };
          state.cartItems.push(tempProducts);
      }
    },

    addToCartCOP(state, action) {
      let itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
        );
        state.cartItems[itemIndex].cartQuantity += action.payload.additionCOP;
    },

    reduceCard(state, action) {
      let itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
        );
        state.cartItems[itemIndex].cartQuantity -= action.payload.reduceCOP;
    },

   
    getTotals(state,action){
      
        let {total, quantity}=state.cartItems.reduce((cartTotal, cartItem)=>{
            const {price,cartQuantity}=cartItem;
            const itemTotal = price*cartQuantity;
            
            cartTotal.total += itemTotal
            cartTotal.quantity += cartQuantity;
            
            return cartTotal
        },
        {
            total:0,
            quantity:0
        }
            
            );
            state.cartTotalQuantity= quantity
            state.cartTotalAmount = total;
        },
    
    removeItem(state,action){
      if (state.cartItems.length > 1) {
        state.cartItems?.map((cartItem)=>{
            if(cartItem.id===action.payload.id){
                const nextCartItems = state.cartItems.filter((item)=>item.id!==cartItem.id)
                state.cartItems = nextCartItems;
                return state;
              }
        })        
      }else{
        state.cartItems = []
        state.cartTotalQuantity= 0
        state.cartTotalAmount = 0

      }
    }
  },
});

export const { addToCart, addToCartCOP, getTotals, removeItem, reduceCard} = cartSlice.actions
export default cartSlice.reducer;