import { Component } from 'react'
import Button from '@mui/material/Button'
import './index.css'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <>
        <div className='header-section'>
          <Header />
          <div className='sub-header-section'>
            <h3 className='banner-heading'>Summer Collection</h3>
            <Button variant='contained' sx={{ fontSize: 10 }}>
              View Collection
            </Button>
          </div>
        </div>
        <div>
          <h1>
            Welcome to you one stop destination for all your fashion needs
          </h1>
        </div>
      </>
    )
  }
}
export default Home
