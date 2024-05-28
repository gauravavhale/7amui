"use client"
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css'
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";
import { useReducer } from "react";
import { init } from "@/utils/init";
import { appReducer } from "@/reducer/appReducer";
import { ctx } from "@/context/appContext";
import {ToastContainer} from 'react-toastify'
import {Loader} from "@/components/Loader/Loader"

export default function RootLayout({ children }) {

  const [state,dispatch] = useReducer(appReducer,init)

  return (
    <html lang="en">
      <body>
        <ctx.Provider value={{state,dispatch}}>
          <Header />
          {state.isLoggedIn && <Menu />} 
          {children}
          <Footer />
          <ToastContainer/>
          {state.isShowLoader && <Loader/>}
        </ctx.Provider>
      </body>
    </html>
  );
}
