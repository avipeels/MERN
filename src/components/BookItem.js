import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { bindActionCreators } from "redux";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class BookItem extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     id:'',
  //     title:'',
  //     description:'',
  //     price:''
  //   }
  // }
  handleCart() {
    const book =  {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      price: this.props.price
    }
    this.props.addToCart(book);
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
    addToCart: addToCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);