import React from 'react'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <div className={`position-fixed bottom-0 w-100 bg-primary text-center text-aqua ${styles.footer}`}>
       &copy; rights belongs to me
    </div>
  )
}
