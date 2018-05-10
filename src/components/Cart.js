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
                <div className="panel" key={cartArr.id}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <h6>{cartArr.title}</h6>
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