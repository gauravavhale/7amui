"use client"
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";
import { useReducer } from "react";
import { init } from "@/utils/init";
import { appReducer } from "@/reducer/appReducer";
import { ctx } from "@/context/appContext";

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
        </ctx.Provider>
      </body>
    </html>
  );
}
