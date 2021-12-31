/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import parseParams from 'helpers/parseParams'
import createParams from 'helpers/createParams'
import { makeStyles } from '@mui/styles'
import { useHistory, useLocation } from 'react-router'
import { Container } from '../../node_modules/@material-ui/core/index'

const useStyles = makeStyles({
  container: {
    display: 'flex !important',
    height: '50px',
    padding: '0 20px 0 20px !important',
    marginBottom: '4%',
    borderRadius: '5px !important',
  },
  radioBtn: {
    display: 'none',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '20px',
    height: '50px',
    width: '33%',
    color: '#4A4A4A',
    backgroundColor: '#fff',
    border: '1px solid #DFE5EC',
  },
  border: {
    borderRadius: '5px',
  },
  rightBtn: {
    borderBottomRightRadius: '5px',
    borderTopRightRadius: '5px',
  },
})

export default function SortRadioButtons() {
  const styles = useStyles()
  const history = useHistory()
  const searchStr = useLocation().search
  const initialState = {
    price: false,
    speed: false,
    optimal: false,
  }
  const [isChecked, setChecked] = useState(initialState)

  useEffect(() => {
    setChecked(parseParams(searchStr, isChecked, 'sort'))
  }, [searchStr])
  const sortHandle = (e) => {
    const res = { ...initialState, [e.target.value]: !initialState[e.target.checked] }
    setChecked((prev) => ({ ...prev, ...res }))
  }
  useEffect(() => {
    const url = createParams(isChecked, 'sort', searchStr)
    if (url !== '') {
      history.push(url)
    }
  }, [isChecked])

  return (
    <Container className={styles.container}>
      <input
        type="radio"
        name="sort"
        value="price"
        className={styles.radioBtn}
        id="1"
        onChange={sortHandle}
        checked={isChecked.price}
      />
      <label htmlFor="1" className={styles.label}>
        САМЫЙ ДЕШЕВЫЙ
      </label>
      <input
        type="radio"
        name="sort"
        value="speed"
        className={styles.radioBtn}
        id="2"
        onChange={sortHandle}
        checked={isChecked.speed}
      />
      <label htmlFor="2" className={styles.label}>
        САМЫЙ БЫСТРЫЙ
      </label>
      <input
        type="radio"
        name="sort"
        value="optimal"
        className={styles.radioBtn}
        id="3"
        onChange={sortHandle}
        checked={isChecked.optimal}
      />
      <label htmlFor="3" className={styles.label}>
        ОПТИМАЛЬНЫЙ
      </label>
    </Container>
  )
}
