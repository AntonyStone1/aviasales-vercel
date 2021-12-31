/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  paginationBtn: {
    width: '100% !important',
    height: '50px',
    marginBottom: '30px !important',
  },
})

const TicketsListPgnBtn = ({ clickHandler }) => {
  const styles = useStyles()
  return (
    <Button variant="contained" onClick={clickHandler} className={styles.paginationBtn}>
      Показать еще 5 билетов!
    </Button>
  )
}

export default TicketsListPgnBtn
