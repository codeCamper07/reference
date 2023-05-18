import { Switch } from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './components/Products'
import Cart from './components/Cart'

const App = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/products' component={Products} />
        <ProtectedRoute exact path='/cart' component={Cart} />
      </Switch>
    </>
  )
}

export default App
