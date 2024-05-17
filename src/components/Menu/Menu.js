import React, { Fragment, useEffect, useRef, useState } from 'react'
import styles from './Menu.module.css'
import Link from 'next/link'
export const Menu = () => {
  const [left,setLeft] = useState(-130);
  const [menuItem,setMenuItem]=useState(window.location.pathname.slice(1) || 'home') 

  const [isMobileView,setIsMobileView]=useState(document.body.offsetWidth < 800 ? true :false);
  const refObj = useRef();

  const findWidth=()=>{
    setIsMobileView(document.body.offsetWidth < 800 ? true:false)
  }
  const fnResize=()=>{
    window.addEventListener("resize",()=>{
      if(!refObj.timeOutId){
        findWidth()
      }
      clearTimeout(refObj.timeOutId)
      refObj.timeOutId = setTimeout(() => {
        findWidth()
      },100);
    })
  }

  useEffect(()=>{ 
    fnResize()
  },[])

  const fnMobileMenuBtnClick=()=>{
    setLeft(left==0 ? -130 : 0);
  }

const fnMenuItemClick=(eve)=>{
  eve.stopPropagation();
  setMenuItem(eve.target.id)
  if(isMobileView){
    setLeft(-130)
  }
}
 
return <Fragment>
          { isMobileView && <button onClick={fnMobileMenuBtnClick} className={`position-absolute end-0 ${styles.mobileMenuBtn}`}><span></span><span></span><span></span></button>}
             <ul onClick={fnMenuItemClick} style={{left:left}} className={`${isMobileView ? styles.mobileMenu : styles.menu}`}>
              <li>
                  <Link id="home" className={`${menuItem == 'home' && styles.menuActive}`} href="/home">Home</Link>
              </li>
              <li>
                  <Link id="users" className={`${menuItem == 'users' && styles.menuActive}`} href="/users">Users</Link>
              </li>
              <li>
                  <Link id="profile" className={`${menuItem == 'profile' && styles.menuActive}`} href="/profile">Profile</Link>
              </li>
              <li>
                  <Link href="/login">Logout</Link>
              </li>
            </ul>
        </Fragment>
}