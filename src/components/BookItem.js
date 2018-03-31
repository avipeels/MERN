import React from "react";

import { Row, Col, Well, Button } from "react-bootstrap";

class BookItem extends React.Component {
  render() {
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.id}</h6>
            <p>{this.props.title}</p>
            <h6>USD.{this.props.price}</h6>
            <Button bsStyle="primary">Buy Now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}
export default BookItem;