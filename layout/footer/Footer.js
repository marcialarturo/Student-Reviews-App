import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Container,
  Grid,
  Link,
  StylesProvider,
  Typography,
} from '@material-ui/core'
import './Footer.css'

function Footer() {
  return (
    <StylesProvider injectFirst>
      <footer>
        <div className="footer">
          <div className="row"></div>

          <div className="row">
            <ul>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Our Services</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="row">
            Copyright &copy; {new Date().getFullYear()} Student Reviews App
          </div>
        </div>
      </footer>
    </StylesProvider>
  )
}

export default Footer
