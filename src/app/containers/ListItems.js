import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData, activateItem, deactivateItem, selectItemStats } from '../modules/index'
import Items from '../components/Items'

class ListItems extends Component {
  componentDidMount() {
    this.props.getData()
  }

  activate = id =>
    this.props.activateItem(id)

  deactivate = id =>
    this.props.deactivateItem(id)

  selectItem = item =>
    this.props.selectItemStats(item)

  render() {
    const { isLoad, data, err } = this.props

    return (
      <section className="container">
        {
          !err && data &&
          <Items
            data={data}
            activate={this.activate}
            deactivate={this.deactivate}
            selectItem={this.selectItem}
          />
        }
        {
          isLoad && 'Loading...'
        }
        {
          err && <h2 className="err"><h2 className="err">Something went wrong :(</h2></h2>
        }
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoad: state.main.isLoad,
    data: state.main.data,
    err: state.main.err,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getData()),
    activateItem: id => dispatch(activateItem(id)),
    deactivateItem: id => dispatch(deactivateItem(id)),
    selectItemStats: item => dispatch(selectItemStats(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems)
