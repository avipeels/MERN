import React from "react";
import { connect } from "react-redux";
class Cart extends React.Component {
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
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <h6>{cartArr.title}</h6>
                        </div>
                        <div className="col-xs-12 col-sm-2">
                            <h6>{cartArr.price}</h6>
                        </div>
                        <div className="col-xs-12 col-sm-2">
                            <h6>qty. <label className="success"></label></h6>
                        </div>
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-primary">-</button>
                            <button className="btn btn-primary">+</button>
                            <span></span>
                            <button className="btn btn-danger">DELETE</button>
                        </div>
                    </div>
                </div>
            )
        });
        return (

            <div className="panel panel-default">
                <div className="panel-heading">Cart</div>
                <div className="panel-body">{cartItemList}</div>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}
export default connect(mapStateToProps)(Cart);