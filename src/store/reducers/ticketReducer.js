/* eslint-disable import/no-cycle */
import initialState from 'store/initialState'
import ACTIONS from 'store/actionTypes/actionTypes'

function ticketReducer(state = initialState, action) {
  // eslint-disable-next-line global-require

  switch (action.type) {
    case ACTIONS.TICKET_DATA: {
      return {
        ...state,
        ticketsData: action.payload,
        staticTicketData: action.payload,
        isLoaded: action.isLoaded,
      }
    }
    // case ACTIONS.SORT_DATA_PRICE: {
    //   const currentStatePrice = action?.payload?.sort((a, b) => a.price - b.price)
    //   return {
    //     ...state,
    //     ticketsData: currentStatePrice,
    //   }
    // }
    // case ACTIONS.SORT_DATA_FAST: {
    //   const currentStateFast = action.payload.sort(
    //     (a, b) => a.segments[0].duration - b.segments[0].duration,
    //   )
    //   return {
    //     ...state,
    //     ticketsData: currentStateFast,
    //   }
    // }
    // case ACTIONS.SORT_DATA_OPTIMAL: {
    //   const currentStateOptimal = action.payload.sort(
    //     (a, b) => a.price + a.segments[0].duration - (b.price + b.segments[0].duration),
    //   )
    //   return {
    //     ...state,
    //     ticketsData: currentStateOptimal,
    //   }
    // }

    default:
      return state
  }
}
export default ticketReducer
