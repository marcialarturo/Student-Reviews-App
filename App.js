import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import HomeGallery from './components/home-container/gallery/HomeGallery'
import LandingPage from './components/landing/LandingPage'
import Profile from './components/home-container/profile/Profile'
import CreateProfile from './components/create-profile/CreateProfile'
import PostComment from './components/create-profile/PostComment'
import CreateLinks from './components/create-links/CreateLinks'
import MyProfile from './components/home-container/myprofile/MyProfile'
import Notifications from './components/notifications/Notifications'
import DonateNFT from './components/donate-nft/DonateNFT'
import Web3Modal from 'web3modal'
import XmtpChat from './components/xmtp-chat/XmtpChat'
import ABI from './artifacts/contracts/Ratemyclass.sol/Ratemyclass.json'
import UAuth from '@uauth/js'
const { ethers } = require('ethers')

function App() {
  const [wallet, setWallet] = useState('')
  const [donateNfts, setDonateNfts] = useState(false)
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [donateStream, setDonateStream] = useState(false)
  const [web3authLogin, setWeb3authLogin] = useState(null)
  const [hasProfile, setHasProfile] = useState('')
  const [allProfiles, setAllProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState('')
  const [image, setImage] = useState('')
  const [position, setPosition] = useState('')
  const [instructorName, setInstructorName] = useState('')
  const [bio, setBio] = useState('')
  const [coverPhoto, setCoverPhoto] = useState('')
  const [userUD, setUserUD] = useState('')
  const [category, setCategory] = useState('')
  const [data, setData] = useState([])

  const unstoppableInstance = new UAuth({
    clientID: '36d48583-8d6f-418d-ab02-e35123dd1467',
    redirectUri: 'https://phasedapp.netlify.app',
    scope: 'openid wallet',
  })

  const unstoppableLogin = async () => {
    const user = await unstoppableInstance.loginWithPopup()
    if (user) {
      localStorage.setItem('user', user)
      setUserUD(user)
      setWallet(user.idToken.wallet_address)
    }
  }

  const userLogOut = () => {
    localStorage.removeItem('user')
    setUserUD('')
  }

  useEffect(() => {
    if (contract) {
      getAllClasses()
    }
  }, [contract])

  const getImage = (ipfsURL) => {
    if (!ipfsURL) return
    ipfsURL = ipfsURL.split('://')
    return 'https://ipfs.io/ipfs/' + ipfsURL[1]
  }

  const getAllClasses = async () => {
    const temp = []
    const res = await contract.getAllGroups()

    for (let i = 0; i < res.length; i++) {
      let obj = {}
      const organizer = res[i][4]
      const reviews = res[i].reviews
      const totalDonations = res[i]['totalDonations'].toString()
      const fundraiserId = res[i].id.toString()
      const nftStorageURL = res[i][1]
      
      let getNFTStorageData = await fetch(nftStorageURL)
      let post = await getNFTStorageData.json()
      const data = JSON.parse(post.description)
      obj.fundraiserId = fundraiserId
      obj.organizer = organizer
      obj.totalDonations = totalDonations
      obj.classDificulty = data.classDificulty
      obj.className = data.className
      obj.image = data.image
      obj.created = data.created
      obj.department = data.department
      obj.instructorName = data.instructorName
      obj.position = data.position
      obj.rating = [
        { label: 'Awesome 5', rate: 95 },
        { label: 'Great 4', rate: 10 },
        { label: 'Good 3', rate: 5 },
        { label: 'Ok 2', rate: 0 },
        { label: 'Awful 1', rate: 0 },
      ]
      obj.reviews = reviews
      obj.quality = data.quality
      obj.targetAmmount = data.targetAmmount
      temp.push(obj)
    }

    setData(temp)
  }

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    setWallet(address)
    localStorage.setItem('currentAccountLocalStorage', address)
    setProvider(provider)
    setSigner(signer)
    let contract = new ethers.Contract(
      '0xB61B5Ff6930EB40734d480C4e0b5312702673ED0',
      ABI.abi,
      signer,
    )
    setContract(contract)
  }

  const disconnectWallet = async () => {
    localStorage.removeItem('currentAccountLocalStorage')
    setWallet('')
  }

  useEffect(() => {}, [])

  return (
    <Router>
      <div className="">
        <Navbar
          unstoppableLogin={unstoppableLogin}
          userUD={userUD}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          wallet={wallet}
          hasProfile={hasProfile}
        />

        <Route exact path="/">
          <LandingPage setSelectedProfile={setSelectedProfile} />
        </Route>
        <Route exact path="/classes">
          <HomeGallery
            data={data}
            setSelectedProfile={setSelectedProfile}
            contract={contract}
          />
        </Route>

        <Switch>
          <Route exact path="/notifications" component={Notifications} />

          <Route path="/create">
            <CreateProfile
              setCoverPhoto={setCoverPhoto}
              setImage={setImage}
              setPosition={setPosition}
              setInstructorName={setInstructorName}
              instructorName={instructorName}
              setBio={setBio}
              setCoverPhotoFunction={setCoverPhoto}
              wallet={wallet}
              image={image}
              position={position}
              bio={bio}
              coverPhoto={coverPhoto}
              category={category}
              setCategory={setCategory}
              contract={contract}
            />
          </Route>

          <Route path="/post-comment">
            <PostComment
              setCoverPhoto={setCoverPhoto}
              setImage={setImage}
              setPosition={setPosition}
              setInstructorName={setInstructorName}
              instructorName={instructorName}
              setBio={setBio}
              setCoverPhotoFunction={setCoverPhoto}
              wallet={wallet}
              image={image}
              position={position}
              bio={bio}
              coverPhoto={coverPhoto}
              category={category}
              setCategory={setCategory}
              contract={contract}
            />
          </Route>
          <Route exact path="/donate">
            <DonateNFT
              selectedProfile={selectedProfile}
              contract={contract}
              wallet={wallet}
              donateNfts={donateNfts}
              provider={provider}
              signer={signer}
              donateStream={donateStream}
            />
          </Route>

          <Route path="/create-links">
            <CreateLinks
              wallet={wallet}
              image={image}
              position={position}
              bio={bio}
              coverPhoto={coverPhoto}
              category={category}
              contract={contract}
            />
          </Route>

          <Route path="/profile/details/:userAddress">
            <Profile selectedProfile={selectedProfile} wallet={wallet} />
          </Route>
          <Route path="/my-profile">
            <MyProfile selectedProfile={selectedProfile} wallet={wallet} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
