/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import parseParams from 'helpers/parseParams'
import createParams from 'helpers/createParams'
import { makeStyles } from '@mui/styles'
import { useHistory, useLocation } from 'react-router-dom'
import { Typography, Container, Box } from '../../node_modules/@material-ui/core/index'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkboxHeading: {
    fontStyle: 'normal !important',
    fontWeight: '600 !important',
    fontSize: '12px !important',
    lineHeight: '12px !important',
    padding: '25px 20px',
    paddingBottom: '10px',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  checkboxContainer: {
    width: '33% !important',
    margin: '0 !important',
    paddingRight: '0 !important',
  },
  checkboxPanel: {
    height: '230px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  checkbox: {},
  link: {
    color: '#4A4A4A',
    textDecoration: 'none',
  },
})

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const CheckboxPanel = () => {
  const styles = useStyles()
  const history = useHistory()
  const searchStr = useLocation().search
  const homePage = useLocation().pathname
  const [filtersState, setFiltersState] = useState({
    noTransfer: false,
    transferOne: false,
    transferTwo: false,
    transferThree: false,
  })
  useEffect(() => {
    setFiltersState(parseParams(searchStr, filtersState, 'transfers'))
  }, [searchStr])
  const clickHandle = (e) => {
    setFiltersState((prev) => ({ ...prev, [e.target.name]: !prev[e.target.name] }))
  }
  useEffect(() => {
    const url = createParams(filtersState, 'transfers', searchStr)
    if (url !== '') {
      history.push(url)
    }
    if (url === '' && searchStr !== '') {
      history.push(homePage)
    }
  }, [filtersState])
  return (
    <>
      <Container className={styles.checkboxContainer}>
        <Box className={styles.checkboxPanel}>
          <Typography variant="h6" className={styles.checkboxHeading}>
            Количество пересадок
          </Typography>
          <div className={styles.container}>
            <label htmlFor="noDirectFlight">
              <Checkbox
                {...label}
                name="noTransfer"
                id="noDirectFlight"
                className={styles.checkbox}
                onClick={clickHandle}
                checked={filtersState.noTransfer}
              />
              Без пересадок
            </label>
            <label htmlFor="1_dirrect">
              <Checkbox
                {...label}
                name="transferOne"
                id="1_dirrect"
                className={styles.checkbox}
                onClick={clickHandle}
                checked={filtersState.transferOne}
              />
              1 пересадка
            </label>
            <label htmlFor="2_dirrect">
              <Checkbox
                {...label}
                name="transferTwo"
                id="2_dirrect"
                className={styles.checkbox}
                onClick={clickHandle}
                checked={filtersState.transferTwo}
              />
              2 пересадки
            </label>
            <label htmlFor="3_dirrect">
              <Checkbox
                {...label}
                name="transferThree"
                id="3_dirrect"
                className={styles.checkbox}
                onClick={clickHandle}
                checked={filtersState.transferThree}
              />
              3 пересадки
            </label>
          </div>
        </Box>
      </Container>
    </>
  )
}

export default CheckboxPanel
