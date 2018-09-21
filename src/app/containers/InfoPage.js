import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import InfoModal from '../components/InfoModal'
import { getModalStyles } from '../helpers'

Modal.setAppElement('#root')

class InfoPage extends Component {
  state = {
    showModal: true
  }

  toggleModal = () =>
    this.setState({showModal: false})

  render() {
    const { item, data, isLoad, err } = this.props

    return (
      <Modal
        isOpen={this.state.showModal}
        style={getModalStyles()}
      >
      {
        data && !err &&
        <InfoModal toggleModal={this.toggleModal} item={item} info={data}/>
      }
      {
        err && <h2 className="err">Something went wrong :(</h2>
      }
      {
        isLoad && 'Loading...'
      }
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.main.selectedItem.item,
    data: state.main.selectedItem.info,
    isLoad: state.main.isLoad,
    err: state.main.err
  }
}

export default connect(mapStateToProps)(InfoPage)
