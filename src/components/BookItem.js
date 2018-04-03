import React from "react";

class BookItem extends React.Component {
  render() {
    return (
      <div className="well">
        <div className="row">
          <div className="col-xs-12">
            <h6>{this.props.id}</h6>
            <p>{this.props.title}</p>
            <h6>USD.{this.props.price}</h6>
            <Button className="primary">Buy Now</Button>
          </div>
        </div>
      </div>
    )
  }
}
export default BookItem;