import React from 'react';
import Menu from '../menu';
import Footer from '../footer';


import {connect} from 'react-redux';


class Main extends React.Component{

	render(){
		let sum=0;
		this.props.cart.forEach(function(item){
			sum += item.quantity;
		});
		return (
			<div>
				<Menu itemsInCart = {sum}/>
					{this.props.children}
				<Footer />

			</div>
		);
	}
};

function mapStateToProps(state){
	return {
		cart: state.cart.cart
	}
}

export default connect(mapStateToProps)(Main);