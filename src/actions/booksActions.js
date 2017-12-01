import axios from 'axios';


export function getBooks(){
	return function(dispatch){
		axios.get('/api/books')
			.then(function(response){
				dispatch({
					type: 'Get_books',
					payload: response.data
				});
			})
			.catch(function(err){
				throw err;
			})
	}
}


export function addBook(book){
	return function(dispatch){
		axios.post('/api/books', book)
			.then(function(response){
				dispatch({
					type: 'Add_book',
					payload: response.data
				})
			})
			.catch(function(err){
				throw err;
			})
	}
};


export function deleteBook(_id){
	return function(dispatch){
		axios.delete(`/api/books/${_id}`)
			.then(function(response){
				dispatch({
					type: "Delete_book",
					payload: _id
				});
			})
			.catch(function(err){
				throw err;
			})
	}
	return {
		type: "Delete_book",
		payload: _id
	}
};

export function updateBook(book){
	return {
		type: "Update_title",
		payload: book
	}
};