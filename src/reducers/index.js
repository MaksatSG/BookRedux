import {combineReducers} from 'redux';

import {booksReducers} from './booksReducers.js';
import {cartReducers} from './cartReducers.js';
export default combineReducers({
	books: booksReducers,
	cart: cartReducers
});


