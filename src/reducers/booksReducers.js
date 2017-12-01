export function booksReducers(state = {books:[]} , action){

	switch(action.type){
		case "Get_books":
		return { ...state, books: [...action.payload]}

		case "Add_book":
		return {books: [...state.books, ...action.payload]}
		break;
    ////////////////////////////////////////////////////////////////
		case 'Delete_book':

		const newBook = [...state.books];
				const indexDelete = newBook.findIndex(function(book){
				return book._id == action.payload;
				});

		return {books: [...newBook.slice(0,indexDelete), ...newBook.slice(indexDelete+1)]}
		break;
	////////////////////////////////////////////////////////////////////////////////////
		case 'Update_title':
		const copyOfBooks = [...state.books];

		const indexOfUpdate = copyOfBooks.findIndex(function(book){
			return book._id === action.payload._id;
		});

		const newBookToUpdate = {...copyOfBooks[indexOfUpdate],
								title: action.payload.title
							};

		return {books: [...copyOfBooks.slice(0,indexOfUpdate), newBookToUpdate ,...copyOfBooks.slice(indexOfUpdate+1)]}
		break;

	}
	return state;
};