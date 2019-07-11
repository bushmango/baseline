import React from 'react'

import styles from './Button2.scss'

export const Button2 = (props: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
