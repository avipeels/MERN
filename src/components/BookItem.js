import React from "react";
import { connect } from "react-redux";
import { addToCart, updateCart } from "../actions/cartActions";
import { bindActionCreators } from "redux";



class BookItem extends React.Component {

  handleCart() {
    const book = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      price: this.props.price,
      quantity: 1
    }];
    if (this.props.cart.length > 0) {
      //cart is not empty
      let _id = this.props._id;

      let cartIndex = this.props.cart.findIndex(function (cart) {
        return cart._id === _id
      })
      //IF -1 then there are not items with same id
      if (cartIndex === -1) {
        this.props.addToCart(book);
      }
      //update the quantity
      else {
        this.props.updateCart(_id, 1);
      }
    }
    else {
      this.props.addToCart(book);
    }
  }
  render() {
    return (
      <div className="well">
        <div className="row">
          <div className="col-xs-12">
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>USD.{this.props.price}</h6>
            <button className="btn-primary" onClick={this.handleCart.bind(this)}>Buy Now</button>
          </div>
        </div>
      </div>
    )
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToCart: addToCart,
    updateCart: updateCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);