import React  from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// create reducer
import BooksList from './components/pages/booksList';
import BookForm from './components/pages/bookForm';
import Main from './components/pages/main';
import Cart from './components/pages/cart';
import reducers from './reducers/index.js';




// creating store
const middleware = applyMiddleware(thunk,logger);
const store = createStore(reducers, middleware);

const Routes = (
	<Provider store={store}>

		<Router history = {browserHistory}>
			<Route path="/" component = {Main}>
					<IndexRoute component={BooksList} />
					<Route path="/admin" component={BookForm} />
					<Route path="/cart" component= {Cart} />
			</Route>
		</Router>

	</Provider>
	);
render(
	Routes,
	document.getElementById('app')
);



