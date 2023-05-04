import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritePairs : [],
    selectedPair : "BTCUSDT"
}

export const pairSlice = createSlice({
    name : "pair",
    initialState,
    reducers:{
        choosePair(state, action){

        },
        addToFav(state, action){
            state.favoritePairs.push(action.payload)
        },
        removeFromFav(state,action){
            state.favoritePairs.splice(state.favoritePairs.indexOf(action.payload), 1)
        }
    }
})


export const { selectPair, addToFav, removeFromFav} = pairSlice.actions
export default pairSlice.reducer;