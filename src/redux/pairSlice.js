import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritePairs : [],
    selectedPair : "BTCUSDT",
    searchPairs: ""
}

export const pairSlice = createSlice({
    name : "pair",
    initialState,
    reducers:{
        selectPair(state, action){
            state.selectedPair = action.payload
        },
        addToFav(state, action){
            state.favoritePairs.push(action.payload)
        },
        removeFromFav(state,action){
            state.favoritePairs.splice(state.favoritePairs.indexOf(action.payload), 1)
        },
        searchPair(state,action){
            state.searchPairs = action.payload
        }
    }
})


export const { selectPair, addToFav, removeFromFav, searchPair} = pairSlice.actions
export default pairSlice.reducer;