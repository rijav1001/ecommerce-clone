export const initialState = {
    cart: [],
    user: null
};

export const getSubTotal = (cart) => {
    var sum = 0;
    for(let i = 0; i < cart.length; i++) {
        sum += cart[i].price;
    }
    return sum;
}

const reducer = (state, action) => {
    // console.log(action);
    switch(action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.item],
            };
        
        case 'REMOVE_FROM_CART':
            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );
            let newCart = [...state.cart];

            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.id} as it's not in cart!`);
            }

            return {
                ...state,
                cart: newCart
            };
        
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
}

export default reducer;