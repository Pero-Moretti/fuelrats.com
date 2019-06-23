// Module imports
// import moment from 'moment'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatAsEliteDate } from '../helpers/formatTime'
// import ReactTable from 'react-table'





// Module imports
import { connect } from '../store'
import Component from './Component'





// Component constants
// const ELITE_GAME_YEAR_DESPARITY = 1286 // Years between IRL year and Elite universe year
const initialState = {
  heckingEligibility: true,
  redeeming: false,
  decalsVisible: {},
}


/***********************************************/
/* DUE FOR REFACTORING. DO NOT MODIFY FURTHER. */
/***********************************************/
@connect
class UserDetailsPanel extends Component {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  state = {
    ...initialState,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _redeemDecal () {
    const { redeemDecal } = this.props

    this.setState({ redeeming: true })

    await redeemDecal()

    this.setState({
      redeeming: false,
    })
  }

  // static _renderClaimedAtRow (row) {
  //   const rescue = row.original
  //   // console.log(rescue)
  //
  //   return moment(rescue.claimedAt).add(ELITE_GAME_YEAR_DESPARITY, 'years').format('DD MMM, YYYY')
  // }




  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      checkDecalEligibility,
      eligible,
    } = this.props

    if (!eligible) {
      await checkDecalEligibility()
    }

    this.setState({ checkingEligibility: false })
  }

  _handleToggle = (event) => {
    const decalID = event.target.name
    console.log(event.target.name)
    console.log(this.state.decalsVisible[decalID])
    this.setState((state) => ({
      decalsVisible: {
        ...state.decalsVisible,
        [decalID]: !state.decalsVisible[decalID],
      },
    }))
  }

  renderNoDataText () {
    const {
      eligible,
    } = this.props

    const { checkingEligibility } = this.state

    if (!checkingEligibility) {
      if (!eligible) {
        return 'Sorry, you\'re not eligible for a decal.'
      }

      return (
        <div className="redeem-decal">
          <p>You're eligible for a decal but you haven't redeemed it yet.</p>
          <button
            onClick={() => this._redeemDecal()}
            type="button">
            Redeem
          </button>
        </div>
      )
    }

    return null
  }

  renderDecalCode = (decal) => (
    <>
      <div className="decal-code" key={decal.id}>
        <button
          aria-label="Show decal code"
          className="icon decal-toggle"
          name={decal.id}
          onClick={this._handleToggle}
          // title={maxNicksReached ? 'You\'ve used all your nicknames' : 'Add new nickname'}
          type="button">
          <FontAwesomeIcon icon={this.state.decalsVisible[decal.id] ? 'eye' : 'eye-slash'} fixedWidth />
        </button>
        {this.state.decalsVisible[decal.id] ? decal.attributes.code : `•••••-•••••-•••••-•••••-${decal.attributes.code.substring(24)}`}
      </div>
      <div className="decal-claimed-at" key={decal.id}>{formatAsEliteDate(decal.attributes.claimedAt)}</div>
    </>
  )

  renderDecalCodes = () => {
    const { decals } = this.props
    console.log(decals)

    if (!decals.length) {
      return null
    }

    return decals.map(this.renderDecalCode)
  }

  render () {
    const { decals } = this.props
    console.log(this)

    const {
      checkingEligibility,
      redeeming,
    } = this.state

    const loadingText = checkingEligibility ? 'Checking decal eligibility...' : 'Redeeming decal codes...'

    // console.log(loadingText)
    return (
      // <ReactTable
      //   className="panel user-decals"
      //   columns={this.columns}
      //   data={decals}
      //   defaultPageSize={10}
      //   loading={checkingEligibility || redeeming}
      //   loadingText={checkingEligibility ? 'Checking decal eligibility...' : 'Redeeming decal codes...'}
      //   manual
      //   minRows={3}
      //   noDataText={this._renderNoDataText()}
      //   showPagination={false} />
      <div className="panel user-decals">
        <header>Decal</header>
        <div className="panel-content">
          {(checkingEligibility || redeeming) ? (<div className="loading">{loadingText}</div>) : (this.renderDecalCodes(decals))}
          {(decals.length) ? ('') : (this.renderNoDataText())}
        </div>
      </div>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  // get columns () {
  //   return [
  //     {
  //       accessor: 'attributes.code',
  //       className: 'code',
  //       Header: 'Decal Code',
  //       headerClassName: 'code',
  //       id: 'code',
  //       resizable: false,
  //       sortable: false,
  //     },
  //     {
  //       accessor: 'attributes.claimedAt',
  //       Cell: this._renderClaimedAtRow,
  //       className: 'claimedAt',
  //       Header: 'Redeemed',
  //       headerClassName: 'claimedAt',
  //       id: 'claimedAt',
  //       resizable: false,
  //       sortable: true,
  //       width: 120,
  //     },
  //   ]
  // }





  /***************************************************************************\
    Redux Properties
  \***************************************************************************/

  static mapDispatchToProps = ['checkDecalEligibility', 'redeemDecal']

  static mapStateToProps = (state) => state.decals
}





export default UserDetailsPanel
