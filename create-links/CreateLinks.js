import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Button, Card, StylesProvider } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../../APIKEYS'
import './CreateLinks.css'
import Days from './Days'

function CreateLinks({
  position,
  bio,
  category,
  coverPhoto,
  image,
  wallet,
  contract,
}) {
  console.log('contract', contract)
  const history = useHistory()
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [ownerWalletAddress, setOwnerWalletAddress] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const hours = [
    { day: 'Mond', hours: '' },
    { day: 'Tuesd', hours: '' },
    { day: 'Wed', hours: '' },
    { day: 'Thursd', hours: '' },
    { day: 'Frid', hours: '' },
    { day: 'Sat', hours: '' },
    { day: 'Sund', hours: '' },
  ]

  const setHours = (newHours, index) => {
    hours[index].newHours = newHours
  }

  const getDay = async () => {
    let d = new Date()
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo}-${da}-${ye}`
  }

  // fix this
  const saveToNFTStorage = async () => {
    console.log('saveToNFT')
    try {
      const creationDate = await getDay()
      const obj = {
        category: category ? category : 'Other',
        location: location ? location : '123 Broadway Ave New York, NY, 10032',
        coverPhoto: coverPhoto
          ? coverPhoto
          : 'https://media.istockphoto.com/photos/chopping-board-picture-id89342700?k=20&m=89342700&s=170667a&w=0&h=Nh4B8kdpODYG5NwbvS75WxelOxhXlc-4UWu_ijkkmgE=',
        creationDate,
        description: bio ? bio : 'Comming soon...',
        image: image
          ? image
          : 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80',
        organizer: ownerWalletAddress
          ? ownerWalletAddress
          : '0x11760DB13aE3Aa5Bca17fC7D62172be2A2Ea9C11',
        targetAmmount: '1000',
        title: position ? position : 'Online Instructor',
        neighborhood: neighborhood ? neighborhood : 'Tribeca',
        hours: hours ? hours : 'Open Everyday',
      }

      console.log('what is obj', obj)

      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: position,
        description: JSON.stringify(obj),
        image: new File([image], 'imageName', { type: 'image/*' }),
      })
      console.log('metadata', metadata)

      if (metadata) {
        console.log('metadata URL', metadata?.url)
        const url = metadata?.url.substring(7) //  bafyreifeiksc7pfbdex5fhes2inqdail7cvf3jfphugtpyzw4rpzte3rca/metadata.json
        const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`
        console.log('fullUrl', fullUrl)

        const saveToContract = await contract.createClass(fullUrl, '1000')
        const tx = await saveToContract.wait()
        console.log('tx', tx)
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createPost = async (linksArray) => {
    // setLoading(true)
    console.log('🚀 hours', hours)
    // let user_name = position ? position : 'electrone'
    // let avatar = image ? image : 'https://i.imgur.com/62G0yQ0.jpeg'
    // let banner = coverPhoto ? coverPhoto : 'https://i.imgur.com/62G0yQ0.jpeg'

    // let bio_ = bio
    //   ? bio
    //   : 'I am a software developer who enjoys web and mobile development through universal components. By day I love to code and drinking tea. At night I sleep.'
    // let links = linksArray
    //   ? linksArray
    //   : [
    //       [
    //         'Website',
    //         'https://transak.gitbook.io/transak-docs/quick-guides/setting-up-a-quick-demo-integration',
    //       ],
    //     ]
    // let address = currentAccount
    //   ? currentAccount
    //   : '0x891352608735f630AF999ba572fd57511137e758'

    // console.warn(address, user_name, avatar, banner, bio_, links)

    // const res = await createPhase(
    //   address,
    //   user_name,
    //   avatar,
    //   banner,
    //   bio_,
    //   links,
    // )
    // await res.wait()
    // console.log(res)
    // setLoading(false)
    // history.push('/')
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-pet-details"
        style={{ minHeight: '50vh', paddingBottom: '3rem' }}
      >
        <center>
          <Card
            style={{
              maxWidth: '500px',
              padding: '2rem',
              paddingBottom: '3rem',
              borderRadius: '13px',
              textAlign: 'start',
            }}
          >
            <div className="">
              <Button
                className="whiteLink-no-active"
                component={Link}
                to="/create"
              >
                Appearance
              </Button>

              <Button className="whiteLink" component={Link} to="/create-links">
                Details
              </Button>
            </div>
            <br />

            <hr style={{ border: '1px solid #ccc' }} />
            <br />

            {/*Location*/}
            <p>
              <label htmlFor="fname">Location</label>
            </p>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="123 Broadway Ave New York, NY, 1002"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="create-profile-input"
            ></input>
            <br />
            <br />

            {/*Owner Wallet Address*/}
            <p>
              <label htmlFor="fname">Owner Wallet Address</label>
            </p>
            <input
              type="text"
              id="fname"
              name="ownerWalletAddress"
              placeholder="0x123..."
              className="create-profile-input"
              value={ownerWalletAddress}
              onChange={(e) => setOwnerWalletAddress(e.target.value)}
            ></input>
            <br />
            <br />

            {/* Neighborhood*/}
            <p>
              <label htmlFor="fname">Neighborhood</label>
            </p>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              placeholder="Upper East Side"
              className="create-profile-input"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            ></input>
            <br />
            <br />

            {/* Business Hours */}
            <p style={{ paddingBottom: '0.5rem' }}>
              <label htmlFor="fname">Business Hours</label>
            </p>
            {/* Business Hours Labels*/}
            <div style={{ display: 'flex' }}>
              <p style={{ width: '100%' }}>
                <label htmlFor="fname">Day</label>
              </p>
              <p style={{ width: '100%' }}>
                <label htmlFor="fname">Hours</label>
              </p>
            </div>
            {/* Business Hours per day*/}
            {hours?.map((ele, index) => (
              <Days key={index} setHours={setHours} index={index} ele={ele} />
            ))}
            <br />
            <br />

            <hr style={{ border: '1px solid #ccc' }} />
            <br />
            <br />
            {loading ? (
              <div className="">
                <LinearProgress />
              </div>
            ) : (
              ''
            )}

            <br />
            <center>
              <Button className="whiteLink" component={Link} to="/">
                Nevermind
              </Button>
              <Button
                className="phase-btn"
                variant="contained"
                onClick={saveToNFTStorage}
              >
                Save
              </Button>
            </center>
          </Card>
        </center>
      </Container>
    </StylesProvider>
  )
}

export default CreateLinks
