export function cartReducers(state = {cart:[]}, action){
	switch(action.type){
		case "Get_Cart":
		return { ...state, cart:[ ...state.cart, ...action.payload ] }
		break;
		case "Add_To_Cart":
		return {cart: [...state.cart, ...action.payload]}
		break;

		case "Remove_From_Cart":
		const newCart = [...state.cart];
				const indexDelete = newCart.findIndex(function(item){
				return item._id === action.payload;
		});
		return {cart: [...newCart.slice(0,indexDelete), ...newCart.slice(indexDelete+1)]}
		break;

		case "Update_Cart":
		const copyOfCart = [...state.cart];
		const index = copyOfCart.findIndex(function(item){
			return item._id === action.payload._id;
		});

		const newCartToUpdate = {...copyOfCart[index],
								quantity: copyOfCart[index].quantity + action.payload.unit
							};

		return {cart: [...copyOfCart.slice(0,index), newCartToUpdate ,...copyOfCart.slice(index+1)]}
	}	
	return state;
};

