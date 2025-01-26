const { configureStore } = require("@reduxjs/toolkit");
import userReducer from './slices/user'

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store