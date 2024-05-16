"use client"
import Login from "./login/page"
import Home from "./home/page"
import { ctx } from "@/context/appContext"
import { useContext } from "react"

export default function App() {
  const {state} = useContext(ctx)
  return <div>
    {state.isLoggedIn ? <Home /> : <Login />}
  </div>
}
