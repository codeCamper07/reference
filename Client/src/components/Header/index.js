import { withRouter, Link } from 'react-router-dom'
import LogoDevIcon from '@mui/icons-material/LogoDev'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import Button from '@mui/material/Button'
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) => {
  const onLogout = () => {
    const { history } = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className='nav-bar-style'>
      <LogoDevIcon color='primary' sx={{ fontSize: 50 }} />
      <ul className='align-nav-items'>
        <li>
          <Link className='nav-items' to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link className='nav-items' to='/products'>
            Shop
          </Link>
        </li>
        <li>
          <Link className='nav-items' to='/cart'>
            <ShoppingCartRoundedIcon color='action' />
          </Link>
        </li>
        <Button onClick={onLogout} variant='contained' sx={{ fontSize: 10 }}>
          Logout
        </Button>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
