import { createStore } from "redux"
import { Provider } from "react-redux"
import userReducer from "./reducers/userReducer"

const store = createStore(userReducer)

function StoreProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProvider