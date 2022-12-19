import {createBrowserRouter} from "react-router-dom"

import Dashboard from "./APP/Pages/Dashboard"
import Create from "./APP/Pages/Create"


const router = createBrowserRouter ([
    {
        path:"/Dashboard",
        element: <Dashboard/>
    },
    {
        path:"/Create",
        element: <Create/>
    }
])

export default router