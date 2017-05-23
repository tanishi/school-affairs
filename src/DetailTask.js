"use strict";

import React from "react";
import { Modal, Button } from "react-bootstrap";

class DetailTask extends React.Component {
  constructor (props){
    super();

    this.state = {
      showModal: false
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close (){
    this.setState({
      showModal: false
    });
  }

  open (){
    this.setState({
      showModal: true
    });
  }

  render (){
    return (
      <div>
        <Button onClick={this.open}>{this.props.day}</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{this.props.description}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>戻る</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

module.exports = DetailTask;

