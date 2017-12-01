import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {MenuItem, Image, InputGroup, DropdownButton, Col, Row, Well, Panel, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {bindActionCreators} from 'redux';
import {addBook, deleteBook, getBooks} from '../../actions/booksActions';
import axios from 'axios';

class BookForm extends Component {

	constructor(){
		super();
		this.state = {
			images:[],
			img:''
		};
	}
	componentDidMount(){
		this.props.getBooks();
		axios.get('/api/images')
		.then(function(response){
			this.setState({
				images: response.data,
			});
		}.bind(this))
		.catch(function(err){
			if(err){
				throw err;
			}
		})
	}
	handleSubmit() {
		console.log(this.refs);
		const book = [{
			
			title: findDOMNode(this.refs.title).value,

			description: findDOMNode(this.refs.description).value,

			image: findDOMNode(this.refs.image).value,

			cost: findDOMNode(this.refs.cost).value,

		}];
		this.props.addBook(book);
		browserHistory.push('/');
	}
	handleSelect(img){
		this.setState({
			img: '/images/' + img
		});
	}
	onDelete(){
		const index = findDOMNode(this.refs.delete).value;
		this.props.deleteBook(index);
	}
	render() {
		const bookListId = this.props.books.map(function(book){
			return (
				<option key={book._id}> {book._id} </option>
			)
		});

		const imgList = this.state.images.map(function(item,i){
			return (
			<MenuItem key={i} eventKey={item.name}
			onClick = {this.handleSelect.bind(this, item.name)}>{item.name}</MenuItem>
			)
		},this);
		return (

			<Well> 
				<Row>
					<Col xs={12} md={6}>
						<Panel>

      					<InputGroup>
        					<FormControl type="text" ref="image" value={this.state.img}/>
        						<DropdownButton
          						componentClass={InputGroup.Button}
          						id="input-dropdown-addon"
          						bsStyle="primary"
          						title="Select an image">
         						{imgList}
        						</DropdownButton>
      					</InputGroup>
      					<Image src={this.state.img} responsive />
						</Panel>
					</Col>
					<Col xs={12} md={6}>
						<Panel>
					<FormGroup controlId = 'title'>
						<ControlLabel>Title</ControlLabel>
						<FormControl 
						input="text" 
						placeholder="Enter the New Title"
						ref = 'title'
						/>
					</FormGroup>

					<FormGroup controlId = 'description'>
						<ControlLabel>Description</ControlLabel>
						<FormControl 
						input="text" 
						placeholder="Enter the New Description"
						ref = 'description'
						/>
					</FormGroup>

					<FormGroup controlId = 'cost'>
						<ControlLabel>Cost</ControlLabel>
						<FormControl 
						input="text" 
						placeholder="Enter the New Price"
						ref = 'cost'
						/>
					</FormGroup>
					<Button bsStyle='primary' onClick = {this.handleSubmit.bind(this)}> 
					Add this Book </Button>
				</Panel>

				<Panel style={{marginTop:'25px'}}>
					 <FormGroup controlId = 'formControlSelect'>
						<ControlLabel>Select a book id to delete</ControlLabel>
						<FormControl 
						componentClass ='select'
						placeholder="select"
						ref = 'delete'
						>
						<option value='select'> Select </option>
							{bookListId}
						</FormControl>
					</FormGroup>
					<Button bsStyle='danger' onClick = {this.onDelete.bind(this)}> Delete this book </Button>
				</Panel>
					</Col>
				</Row>
				
			</Well>
		);
	}
};

function mapStateToProps(state){
	return {
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addBook, deleteBook,getBooks}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookForm);