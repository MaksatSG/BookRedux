import React from 'react';
import {Navbar, Nav, NavItem, Badge} from 'react-bootstrap';

class Menu extends React.Component {
	render(){
		return (
			<Navbar inverse fixedTop>
    			<Navbar.Header>
      				<Navbar.Brand>
                    	<a href="/">Book Source</a>
     			    </Navbar.Brand>
     		        <Navbar.Toggle />
    			</Navbar.Header>
    		<Navbar.Collapse>
      			<Nav>
        			<NavItem eventKey={1} href="/about">About</NavItem>
        				<NavItem eventKey={2} href="/contact">Contact Us</NavItem>

     		    </Nav>
      
      			<Nav pullRight>
        			<NavItem eventKey={1} href="/admin">Admin</NavItem>
        		    <NavItem eventKey={2} href="/cart">Cart Item 
                  {(this.props.itemsInCart > 0) ? (<Badge>{this.props.itemsInCart}</Badge>):("")}
                  
                </NavItem>
     			 </Nav>

   			</Navbar.Collapse>
 		    </Navbar>
			);
	}
};

export default Menu;