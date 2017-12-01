  // cart Actions
import axios from 'axios';
export function getCart(){
		return function(dispatch){
			axios.get('/api/cart')
				.then(function(response){
					dispatch({
						type: "Get_Cart",
						payload: response.data
					});
				})
				.catch(function(err){
					if(err){
						throw err;
					}
				})
		}
}
export function addToCart(book){

		return function(dispatch){
			axios.post('/api/cart', book)
				.then(function(response){
					dispatch({
						type: "Add_To_Cart",
						payload: book
					})
				})
				.catch(function(err){
					throw err;
				})
		}
};

export function removeFromCart(_id){
;
		return function(dispatch){
			axios.delete('/api/cart', { data: {_id} })
				.then(function(response){
					dispatch({
						type: "Remove_From_Cart",
						payload: _id
					});
				})
				
				.catch(function(err){
				throw err;
				})
		}
};

export function updateCart(_id, unit){
		let payload = {
			_id: _id,
			unit: unit
		};

		return function(dispatch){
			axios.put('/api/cart', payload)
			.then(function(response){
				dispatch({
					type: "Update_Cart",
					payload: payload
				});
			})
			.catch(function(err){
				throw err;
			})
		}
	
};