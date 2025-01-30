const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    feed: null
}

const feed = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addFeed: (state, action) => {
            state.feed = action.payload
        },
        removeFeed: (state, action) => {
            state.feed = null
        }
    }
})

export const {addFeed, removeFeed} = feed.actions
export default feed.reducer