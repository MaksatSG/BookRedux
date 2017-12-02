import React, {Component} from 'react';
import {Modal, Well, Panel, Button, ButtonGroup, Row, Col, Label} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removeFromCart, updateCart, getCart} from '../../actions/cartActions';



class Cart extends Component{

		constructor(){
			super();
			this.state = {
				showModal: false,
				total: 0
			};
		}

		componentWillMount(){
			this.props.getCart();
		}
		onCheckout(){
			let amount = this.props.cart.map(function(item){
				return item.cost * item.quantity
			}).reduce(function(a,b){
				return a+b;
			});
			this.setState({
				showModal: true,
				total: amount
			});
		}
		close(){
			this.setState({
				showModal: false,
			});
		}
		onDelete(_id){
			this.props.removeFromCart(_id);
		}
		onPlus(_id){
			this.props.updateCart(_id,1);
		}
		onMinus(_id,q){
			if(q > 1){
			this.props.updateCart(_id,-1);
			}
			else if(q === 1){
			this.props.removeFromCart(_id);
			}

		}
		render(){
			if(this.props.cart[0]){
				return this.renderCart();			
			}
			else {
				return (<div> </div>);
			}
		}		
		renderCart(){
			const cartList = this.props.cart.map(function(item){
				return(
				<Panel key={item._id}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{item.title}</h6>
							<span>    </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>$ {item.cost} </h6>
							<span>    </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>	qnt: <Label bsStyle='success'>{item.quantity}</Label>  </h6>
							<span>    </span>
						</Col>
						<Col xs={12} sm={4}>
							<ButtonGroup style={{midWidth:'300px'}}>
								<Button bsStyle='default' bsSize='small'
								onClick = {this.onPlus.bind(this, item._id)}>+</Button>
								<Button bsStyle='default' bsSize='small'
								onClick = {this.onMinus.bind(this, item._id, item.quantity)}>-</Button>
								<Button bsStyle='danger' bsSize='small'
								onClick = {this.onDelete.bind(this, item._id)}>Delete</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>)
			}, this);

			return (<Panel header='Cart' bsStyle = 'primary' style={{marginTop:"25px"}}>
				{cartList}
				<Row>
					<Col xs={12}>

						<Button bsStyle = 'success' bsSize='small'
						onClick = {this.onCheckout.bind(this)}> PROCEED TO CHECKOUT </Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          			<Modal.Header closeButton>
            			<Modal.Title> Thank you !</Modal.Title>
          			</Modal.Header>
          			
          			<Modal.Body>
         		   		<h5> Your total is  {this.state.total.toFixed(2)} </h5>
         		    </Modal.Body>
          			
          			<Modal.Footer>
            			<Button onClick={this.close.bind(this)}>Close</Button>
          			</Modal.Footer>
        </Modal>
			</Panel>);
		}
};	

function mapStateToProps(state){
	return {
		cart : state.cart.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({removeFromCart, updateCart, getCart},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
