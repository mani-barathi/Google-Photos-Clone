
const reducer = (state = 'ROOT', action) => {
    switch (action.type) {
        case "SET_CURRENT_ALBUM":
            return action.payload
        default:
            return state
    }
}

export default reducer