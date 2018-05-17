import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteCartItem, addToCart, updateCart } from "../actions/cartActions";
import { Modal, Well, Panel, FormControl, FormGroup, ControlLabel, Button, Label } from "react-bootstrap";
class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }
    open() {
        this.setState({
            showModal: true
        })
    }
    close() {
        this.setState({
            showModal: false
        })
    }
    onDelete(_id) {
        const currentBookToBeDeleted = this.props.cart;
        //find index of to be deleted book
        const indexToBeDeleted = currentBookToBeDeleted.findIndex(
            function (cart) {
                return cart._id === _id;
            });
        //slice the array
        let cartAfterDelete = [...currentBookToBeDeleted.slice(0, indexToBeDeleted), ...currentBookToBeDeleted.slice(indexToBeDeleted + 1)];
        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1);
    }

    onDecrement(_id, quantity) {
        if (quantity > 1)
            this.props.updateCart(_id, -1);
    }

    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        }
        else {
            return this.renderEmpty();
        }
    }
    renderEmpty() {
        return (<div></div>);
    }
    renderCart() {
        const cartItemList = this.props.cart.map(function (cartArr) {
            return (
                <div className="panel" key={cartArr._id}>
                    <div className="">
                        <div className="col-xs-12 col-sm-4">
                            <h6>{cartArr.title}</h6>
                        </div>
                        <div className="col-xs-12 col-sm-2">
                            <h6>usd. {cartArr.price}</h6>
                        </div>
                        <div className="col-xs-12 col-sm-2">
                            <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </div>
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-primary" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</button>
                            <button className="btn btn-primary" onClick={this.onIncrement.bind(this, cartArr._id)}>+</button>
                            <span></span>
                            <button className="btn btn-danger" onClick={this.onDelete.bind(this, cartArr._id)} >DELETE</button>
                        </div>
                    </div>
                </div>
            )
        }, this);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Cart</div>
                <div className="row">
                    <div className="panel-body">{cartItemList}</div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h6>Total Amount:{this.props.totalAmount}</h6>
                        <button onClick={this.open.bind(this)} className="btn btn-success">PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will receive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-xs-12">
                            <h6>
                                total $:{this.props.totalAmount}
                            </h6>
                        </div>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);