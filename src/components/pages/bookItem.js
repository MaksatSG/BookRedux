import React, {Component} from 'react';
import {Image,Well, Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';



class BookItem extends Component{
	constructor(){
		super();
		this.state = {
			isClicked: false
		};
	}

	onSubmit(){
		console.log("1111111111111111111111111111111111");
		this.setState({
			isClicked: true
		});
	}
	
	handleSubmit(){
		const newBook = [{
			_id: this.props._id,	

			title: this.props.title,

			description: this.props.description,

			image: this.props.image,

			cost: this.props.cost,

			quantity: 1

		}];
		if(this.props.cart.length > 0){
			let _id = this.props._id;
			let index = this.props.cart.findIndex(function(item){
				return item._id === _id
			});
			if(index === -1){
				this.props.addToCart(newBook);
			}
			else {
				this.props.updateCart(_id, 1);
			}
		}
		else {
			this.props.addToCart(newBook);
		}

		
	}

	render() {
		return (
			<Well>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.image} responsive />
					</Col>
					<Col xs={6} sm={8}>
						<h6>{this.props.title}</h6>
						<p>{(this.props.description.length>50 && this.state.isClicked === false)
							?(this.props.description.substring(0,50))
							:(this.props.description)}
							<button className="link" onClick={this.onSubmit.bind(this)}>
							{(this.state.isClicked === false && this.props.description !== null 
								&& this.props.description.length > 50)?('...read more'):("")}

							</button>
						</p> 
						<h6>{this.props.cost}</h6>
						<Button bsStyle='primary'
						onClick = {this.handleSubmit.bind(this)}> Buy this book ! </Button>
					</Col>
				</Row>
			</Well>
		);
	}
};


function mapStatetoProps(state){
	return {
		cart: state.cart.cart
	}
} 
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addToCart:addToCart,
		updateCart: updateCart
	}, dispatch);
};

export default connect(mapStatetoProps, mapDispatchToProps)(BookItem);