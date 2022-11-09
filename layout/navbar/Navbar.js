import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import { StylesProvider } from '@material-ui/core/styles'
import './Navbar.css'
import logo from '../../../images/1.png'

export const Navbar = ({
  currentAccount,
  connectWallet,
  disconnectWallet,
  hasProfile,
  unstoppableLogin,
  userUD,
  wallet,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <StylesProvider injectFirst>
      <div className="grow">
        <AppBar position="static" className="nav-bar">
          <Toolbar>
            <img src={logo} alt="logo" style={{ width: '350px' }} />
            <Button className="whiteLink" component={Link} to="/">
              About
            </Button>
            <Button className="whiteLink" component={Link} to="/">
              Home
            </Button>

            <Button className="whiteLink" component={Link} to="/classes">
              Dashboard
            </Button>
            <Button className="whiteLink" component={Link} to="/create">
              Create
            </Button>

            <div className="grow" />

            {wallet ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ backgroundColor: 'black', color: 'white' }}
                  endIcon={<VerifiedUserSharpIcon />}
                >
                  {wallet}
                </Button>
                <Button
                  style={{ color: 'black' }}
                  to="/"
                  onClick={disconnectWallet}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: '#060606',
                    color: 'white',
                    height: '2.5rem',
                    fontSize: '.875rem',
                    lineHeight: '1.25rem',
                    fontWeight: '700',
                    textTransform: 'none',
                    marginRight: '5rem',
                  }}
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              </>
            )}

            {/* <div className="sectionDesktop">

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className="sectionMobile">
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div> */}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </StylesProvider>
  )
}
