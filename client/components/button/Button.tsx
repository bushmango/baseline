import React from 'react'

import styles from './Button.scss'

export const Button = (props: { children: React.ReactNode }) => {
  return (
    <div className={styles.button}>
      This is an example button {props.children}
    </div>
  )
}
