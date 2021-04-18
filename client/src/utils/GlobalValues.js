import { createContext } from "react"

const GlobalValues = createContext({
  user: {},
  companies: [],
  company: {},
  setCompany: _ => null
})

export default GlobalValues
