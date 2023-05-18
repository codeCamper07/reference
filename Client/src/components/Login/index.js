import { Component } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Cookies from 'js-cookie'
import LogoDevIcon from '@mui/icons-material/LogoDev'
import { Redirect } from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = { username: '', password: '', error: '', showError: false }

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    history.replace('/')
  }

  onSubmitFail = (error) => {
    this.setState({ error, showError: true })
  }

  onSubmitLogin = async (event) => {
    event.preventDefault()
    const { username, password } = this.state
    const userDetails = { username, password }
    const api = 'http://localhost:4000/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data)
    }
    if (response.ok !== true) {
      this.onSubmitFail(data.error)
    }
  }

  render() {
    const { username, password, error, showError } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }
    return (
      <div className='form-container'>
        <div className='form-bg'>
          <form className='login-form' onSubmit={this.onSubmitLogin}>
            <LogoDevIcon color='primary' sx={{ fontSize: 60 }} />
            <TextField
              id='outlined-basic'
              label='username'
              type='text'
              value={username}
              onChange={this.onChangeUsername}
              variant='outlined'
            />
            <TextField
              id='outlined-basic'
              label='password'
              type='password'
              value={password}
              onChange={this.onChangePassword}
              variant='outlined'
            />
            <Button type='submit' variant='outlined'>
              Login
            </Button>
            {showError && <Alert severity='error'>{error}</Alert>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
