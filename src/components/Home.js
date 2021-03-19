import React, { Component } from 'react';
import Modal from "react-modal";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalopened: false
        }
    }

    openModal = () => {
        this.setState({modalopened: true});
    }

    closeModal = () => {
        this.setState({modalopened: false});
    }

    render() {
        return (
            <div className="home">
                <div className="home__heading">
                    <h1>
                        Look
                    </h1>
                    <h2>
                        1st
                    </h2>
                </div>
                <div>
                    <div className="row">
                        <button onClick={this.openModal}  href={"#"}>
                            <div className="col-1-of-3 home__look-box">
                                <img alt="hello" width="100%" src="/images/dress1.jpg" />
                            </div>
                        </button>
                        <div className="col-1-of-3 home__look-box">
                            <img alt="hello" width="100%" src="/images/dress2.jpg" />
                        </div>
                        <div className="col-1-of-3 home__look-box">
                            <img alt="hello" width="100%" src="/images/dress3.jpg" />
                        </div>
                    </div>
                </div>
                {
                    this.state.modalopened &&
                    (
                    <Modal  isOpen={true} onRequestClose={this.closeModal}>
                        <div class="row modal">
                            <div class="col-1-of-3 modal__left">
                                <img className="modal__left--p1" alt="hello" width="100%" src="/images/dress2.jpg" />
                            </div>
                            <div class="col-2-of-3 modal__right">
                                <img className="modal__right--p1" alt="hello" width="100%" src="/images/top1.jpg" />
                                <img className="modal__right--p2" alt="hello" width="100%" src="/images/bottom1.jpg" />
                            </div>
                        </div>
                    </Modal>
                    )
                }
            </div>
        )
    }
}
