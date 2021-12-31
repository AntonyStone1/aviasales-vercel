/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Ticket from 'components/Ticket'
import SortRadioButtons from 'components/SortRadioButtons'
import filterTickets from 'components/filterTickets'
import sortTickets from 'components/sortTickets'
import parseParams from 'helpers/parseParams'
import { makeStyles } from '@mui/styles'
import store from 'store/store'
import TicketsListPgnBtn from 'components/Pagination/TicketsListPagBtn'
import { useLocation } from 'react-router-dom'
import { Container } from '../../node_modules/@material-ui/core/index'

const useStyles = makeStyles({
  container: {
    display: 'flex !important',
    flexDirection: 'column',
    width: '70% !important',
    margin: '0 !important',
    marginBottom: '5%',
    paddingRight: '0 !important',
    paddingLeft: '0 !important',
  },
})

function TicketsList({ ticketsData: { ticketsData } }) {
  const { isLoaded } = store.getState()
  const [filteredTicketsData, setTicketsData] = useState(isLoaded ? ticketsData : [])
  const [paginationStep, SetPaginationStep] = useState(5)
  const styles = useStyles()
  const searchStr = useLocation().search
  const searchParams = new URLSearchParams(searchStr)
  useEffect(() => {
    setTicketsData(ticketsData)
    if (ticketsData.length > 0) {
      if (searchParams.has('sort') || searchParams.has('transfers')) {
        setTicketsData(
          sortTickets(
            parseParams(searchStr, {}, 'sort'),
            filterTickets(parseParams(searchStr, {}, 'transfers'), ticketsData),
          ),
        )
      }
    }
  }, [isLoaded])
  useEffect(() => {
    if (filteredTicketsData.length > 0) {
      setTicketsData(
        sortTickets(
          parseParams(searchStr, {}, 'sort'),
          filterTickets(parseParams(searchStr, {}, 'transfers'), ticketsData),
        ),
      )
    }
  }, [searchStr])

  const clickHandler = () => SetPaginationStep((prev) => prev + 5)
  return (
    <Container className={styles.container}>
      <SortRadioButtons />
      {isLoaded &&
        filteredTicketsData?.length > 0 &&
        filteredTicketsData?.map((ticket, index) => {
          if (index < paginationStep) {
            return <Ticket key={Math.random(ticket.price)} ticketData={ticket} />
          }
          return null
        })}
      <Container>
        <TicketsListPgnBtn clickHandler={clickHandler} />
      </Container>
    </Container>
  )
}

export default connect((state) => ({ ticketsData: state }))(TicketsList)
