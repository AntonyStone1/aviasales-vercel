/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import { Container, Typography } from '../../node_modules/@material-ui/core/index'
import { ReactComponent as YourSvg } from '../img/S7_Logo.svg'

const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    marginBottom: '20px',
    padding: '0 20px 0 20px !important',
  },
  priceLogo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  priceText: {
    display: 'flex',
    alignItems: 'center',
    fontStyle: 'normal !important',
    fontWeight: '400 !important',
    fontSize: '24px !important',
    lineHeight: '24px !important',
    color: '#2196F3',
  },
  ticketInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  boxStyle: {
    width: '31%',
  },
  ticketContainer: {
    height: '144px',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  grayText: {
    fontStyle: 'normal',
    fontWeight: '400 !important',
    fontSize: '12px !important',
    lineHeight: '18px !important',
    letterSpacing: '0.5px !important',
    color: '#A0B0B9',
  },
  blackText: {
    fontStyle: 'normal',
    fontWeight: '600 !important',
    fontSize: '14px !important',
    lineHeight: '21px !important',
    color: '#4A4A4A',
  },
  textContainer: {
    width: '31%',
  },
})

const Ticket = ({ ticketData }) => {
  const styled = useStyles()
  const dataTicket1 = ticketData?.segments[0]
  const dataTicket2 = ticketData?.segments[1]
  const dateTicket1 = new Date(ticketData?.segments[0].date)
  const durationTicket1 = ticketData?.segments[0].duration
  const dateTicket2 = new Date(ticketData?.segments[1].date)
  const durationTicket2 = ticketData?.segments[1].duration

  const generatePriceIndent = (price) =>
    price
      .toString()
      .split('')
      .map((item, index) => {
        if (index === 2) return ` ${item}`
        return item
      })
      .join('')
  const departureTime = (date) =>
    `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
  const airrivalTime = (date, minutes) =>
    `${new Date(date.getTime() + minutes * 60000)
      .getHours()
      .toString()
      .padStart(2, '0')}:${new Date(date.getTime() + minutes * 60000)
      .getMinutes()
      .toString()
      .padStart(2, '0')}`

  const createTravelTimeStr = (minutes) => {
    let h = Math.floor(minutes / 60)
    let m = minutes % 60
    h = h < 10 ? `0${h}` : h
    m = m < 10 ? `${m}` : m
    return `${h}ч ${m}м`
  }
  // eslint-disable-next-line consistent-return
  const createTransferEndWord = (tiket) => {
    if (tiket.stops.length === 0) {
      return `БЕЗ ПЕРЕСАДОК`
    }
    if (tiket.stops.length === 1) {
      return `${tiket.stops.length} ПЕРЕСАДКА`
    }
    if (tiket.stops.length > 1) {
      return `${tiket.stops.length} ПЕРЕСАДКИ`
    }
  }

  return (
    <Container className={styled.container}>
      <Box className={styled.ticketContainer}>
        <Box className={styled.priceLogo}>
          <Typography variant="h4" className={styled.priceText}>
            {generatePriceIndent(ticketData.price)} P
          </Typography>
          <YourSvg />
        </Box>
        <Box className={styled.ticketInfo}>
          <Box className={styled.boxStyle}>
            <Typography
              className={styled.grayText}
            >{`${dataTicket1.origin} - ${dataTicket1.destination}`}</Typography>
            <Typography className={styled.blackText}>
              {`${departureTime(dateTicket1)} - 
            ${airrivalTime(dateTicket1, durationTicket1)}`}
            </Typography>
          </Box>
          <Box className={styled.boxStyle}>
            <Typography className={styled.grayText}>В ПУТИ</Typography>
            <Typography className={styled.blackText}>
              {createTravelTimeStr(durationTicket1).padStart(2, '0')}
            </Typography>
          </Box>
          <Box className={styled.boxStyle}>
            <Typography className={styled.grayText}>
              {createTransferEndWord(dataTicket1)}
            </Typography>
            <Typography className={styled.blackText}>
              {ticketData.segments[0].stops
                .map((item) => `${item}`)
                .join(', ')
                .split('')}
            </Typography>
          </Box>
        </Box>
        <Box className={styled.ticketInfo}>
          <Box className={styled.boxStyle}>
            <Typography
              className={styled.grayText}
            >{`${dataTicket2.origin} - ${dataTicket2.destination}`}</Typography>
            <Typography className={styled.blackText}>
              {`${departureTime(dateTicket2)} - 
            ${airrivalTime(dateTicket2, durationTicket2)}`}
            </Typography>
          </Box>
          <Box className={styled.boxStyle}>
            <Typography className={styled.grayText}>В ПУТИ</Typography>
            <Typography className={styled.blackText}>
              {Math.floor(ticketData.segments[1].duration / 60)}ч
            </Typography>
          </Box>
          <Box className={styled.boxStyle}>
            <Typography className={styled.grayText}>
              {createTransferEndWord(dataTicket2)}
            </Typography>
            <Typography className={styled.blackText}>
              {ticketData.segments[1].stops
                .map((item) => `${item}`)
                .join(', ')
                .split('')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Ticket
