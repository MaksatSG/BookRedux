import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Col, Row, Button, Carousel} from 'react-bootstrap';

import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';  


class BookList extends Component{

	componentDidMount(){
		this.props.getBooks();
	}

	render(){
		const booksList = this.props.books.map(function(book){
			console.log(book.images);
			return (
				<Col xs={12}  md={6} key={book._id} >
					<BookItem 
					_id = {book._id}
					title = {book.title}
					image = {book.image}
					description = {book.description}
					cost = {book.cost} />
				</Col>
			)
		})
		return (<Grid>

					<Row style={{marginTop:"15px"}}>
						<Cart />
					</Row>
					<Row>
						{booksList}
					</Row>
				</Grid>
				);
	}
}

function mapStateToProps(state){
	return {
		books: state.books.books
	}
}

function mapDispathToProps(dispatch){
	return bindActionCreators({getBooks:getBooks},dispatch);
}

export default connect(mapStateToProps,mapDispathToProps)(BookList);