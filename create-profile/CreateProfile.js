import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Container,
  Button,
  Card,
  StylesProvider,
  TextField,
  MenuItem,
} from '@material-ui/core'
import './CreateProfile.css'
import { apiKey } from '../../APIKEYS'
import Rectangle from '../../images/Rectangle 77.png'
import placeholder from '../../images/upload.jpg'

import { NFTStorage, File } from 'nft.storage'
import axios from 'axios'

function CreateProfile({
  setImage,
  setPosition,
  image,
  position,
  category,
  setCategory,
  setInstructorName,
  instructorName,
  contract,
}) {
  const history = useHistory()
  const [className, setClassName] = useState('')
  const [rating, setRating] = useState('')
  const [quality, setQuality] = useState('')
  const [targetAmmount, setTargetAmmount] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const type = useRef()

  const getDay = async () => {
    let d = new Date()
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo}-${da}-${ye}`
  }

  const postNewClass = async () => {
    try {
      const creationDate = await getDay()
      const obj = {
        image: image
          ? image
          : 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
        className: className ? className : 'Introduction to Programming 100',
        instructorName: instructorName
          ? instructorName
          : 'Prof. Thomas Wiesner',
        rating: rating ? rating : '5',
        created: creationDate,
        wouldTakeAgain: '90%',
        position: position
          ? position
          : 'Formal instructor at the University of California, USA.',
        department: category ? category : 'Programming',
        classDificulty: '5',
        quality: quality ? quality : '5',
      }

      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: position,
        description: JSON.stringify(obj),
        image: new File([image], 'imageName', { type: 'image/*' }),
      })

      if (metadata) {
        console.log('metadata URL', metadata?.url)
        const url = metadata?.url.substring(7)
        const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`

        setImage('')
        setClassName('')
        setRating('')
        setPosition('')
        setCategory('')
        setQuality('')
        setTargetAmmount('')
        setImageName('')
        setImageType('')

        const saveToContract = await contract.createClass(fullUrl, '1000')
        const tx = await saveToContract.wait()
        console.log('tx', tx)
        history.push('/classes')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImage = async (event) => {
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
    const updataData = new FormData()
    updataData.append('file', event.target.files[0])
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      updataData,
      {
        maxContentLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: 'd4d71a5ab68d37b50cb7',
          pinata_secret_api_key:
            '24136e4c8ac255e760785a854926e079b17a0119e48a67272f4103a183f6b7ca',
        },
      },
    )
    setImage('https://gateway.pinata.cloud/ipfs/' + res.data.IpfsHash)
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
                className="whiteLink-nonavbar"
                component={Link}
                to="/create"
              >
                New Record
              </Button>

              <Button
                className="whiteLink-no-active"
                // component={Link}
                // to="/create-links"
              >
                Confirmation
              </Button>
            </div>

            <br />
            <hr style={{ border: '1px solid #ccc' }} />
            <br />

            <img
              style={{
                width: '150px',
                top: '0',
                left: '0',
                borderRadius: 'inherit',
              }}
              src={image ? image : placeholder}
              alt="userBGimage"
            />

            <label htmlFor="formFileImage5">+ Add Class Image</label>
            <input
              type="file"
              id="formFileImage5"
              onChange={handleImage}
              defaultValue={image}
              style={{ display: 'none' }}
              required
            />

            <br />
            <br />
            <p>
              <label htmlFor="fname">Class Name</label>
            </p>
            <input
              type="text"
              id="fname"
              name="name"
              placeholder="name.."
              className="create-profile-input"
              defaultValue={className}
              onChange={(e) => setClassName(e.target.value)}
            ></input>

            <br />
            <p>
              <label htmlFor="fname">Instructor Name</label>
            </p>
            <input
              type="text"
              id="fname"
              name="name"
              placeholder="Joe Boulet"
              className="create-profile-input"
              defaultValue={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
            ></input>

            <br />
            <p>
              <label htmlFor="fname">Instructor Position</label>
            </p>
            <input
              type="text"
              id="fname"
              name="name"
              placeholder="Professor at MIT, Unitversity of California"
              className="create-profile-input"
              defaultValue={position}
              onChange={(e) => setPosition(e.target.value)}
            ></input>
            <br />

            {/*targetAmmount*/}
            <p>
              <label htmlFor="fname">Raise funds for this class</label>
            </p>
            <input
              type="text"
              id="targetAmmount"
              name="targetAmmount"
              placeholder="$1,000"
              className="create-profile-input"
              defaultValue={targetAmmount}
              onChange={(e) => setTargetAmmount(e.target.value)}
            ></input>

            {/*Type*/}
            <p>
              <label htmlFor="fname">Department</label>
            </p>
            <TextField
              fullWidth
              name="classType"
              select
              variant="outlined"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
              ref={type}
            >
              <MenuItem value="All Departments">All Departments</MenuItem>
              <MenuItem value="Accounting">Accounting</MenuItem>
              <MenuItem value="Advertising">Advertising</MenuItem>
              <MenuItem value="Art & History">Art & History</MenuItem>
              <MenuItem value="Computers">Computers</MenuItem>
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Human Resources">Human Resources</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="Anatomy">Anatomy</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <br />
            <br />
            {/*Rating*/}
            <p>
              <label htmlFor="fname">Rating</label>
            </p>
            <TextField
              fullWidth
              name="rating"
              select
              variant="outlined"
              onChange={(e) => setRating(e.target.value)}
              defaultValue={rating}
              ref={type}
            >
              <MenuItem value="Awesome 5">Awesome 5</MenuItem>
              <MenuItem value="Great 4">Great 4</MenuItem>
              <MenuItem value="Good 3">Good 3</MenuItem>
              <MenuItem value="Ok 2">Ok 2</MenuItem>
              <MenuItem value="Awful 1">Awful 1</MenuItem>
            </TextField>
            <br />
            <br />

            {/*Quality*/}
            <p>
              <label htmlFor="fname">Quality</label>
            </p>
            <TextField
              fullWidth
              name="quality"
              select
              variant="outlined"
              onChange={(e) => setQuality(e.target.value)}
              defaultValue={quality}
              ref={type}
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="1">1</MenuItem>
            </TextField>
            <br />
            <br />
            <br />
            <center>
              <Button
                className="nevermind-btn"
                variant="contained"
                component={Link}
                to="/classes"
              >
                Never mind
              </Button>
              <Button
                className="phase-btn"
                variant="contained"
                onClick={postNewClass}
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

export default CreateProfile
