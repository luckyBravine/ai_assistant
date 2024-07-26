import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Provider} from 'react-redux'

import {DashboardPage, HomePage, RegisterPage, LoginPage} from "./containers"
import {store} from './store'

const App = () => {
 return (
  <Provider store={store}>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/DashboardPage" element={<DashboardPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
       <Route path="/LoginPage" element={<LoginPage />} />
       </Routes>
    </Router>
    </Provider>
  )
}

export default App
