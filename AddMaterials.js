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
// import './CreateProfile.css'
import { apiKey } from '../../../APIKEYS'
import Rectangle from '../../../images/Rectangle 77.png'
import placeholder from '../../../images/upload.jpg'
import CircularStatic from '../../commons/CircularProgressWithLabel'
import { NFTStorage, File } from 'nft.storage'
import axios from 'axios'
const secret =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJFOGY5MWZENTJmMGI4MTRGN2ZFNjdkNzcyQTJDRjE0RjkyNTU0ODgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODAzMTMwNjIwMCwibmFtZSI6InN0dWRlbnQtcmV2aWV3cy1tYXRlcmlhbHMifQ.H0g2NZp087990mAKBGNf8CDhTr93-5r2FQHeIRNDunI'

function AddMaterials({ contract, wallet }) {
  const history = useHistory()
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const getDay = async () => {
    let d = new Date()
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo}-${da}-${ye}`
  }

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const postNewClassMaterial = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const obj = {
        description: description
          ? description
          : 'Here are my notes for the mid term on the last two labs and up to all material cover for this class.. I hope it helps you =)',
        creator: wallet ? wallet : '0xjhfs2435',
        title: title ? title : 'Notes for this class up to now.',
        image: image
          ? image
          : 'https://sp-uploads.s3.amazonaws.com/uploads/services/2785118/20211222122733_61c319b5536d3_python_programming_notespage0.png',
      }

      const client = new NFTStorage({ token: secret })
      const metadata = await client.store({
        name: title,
        description: JSON.stringify(obj),
        image: new File([image], imageName, { type: imageType }),
      })
      if (metadata) {
        history.push('/')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
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
              <Button className="whiteLink-nonavbar">Add New Materials</Button>

              <Button className="whiteLink-no-active">Confirmation</Button>
            </div>
            <br />
            <hr style={{ border: '1px solid #ccc' }} />
            <br />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="pet"
                style={{
                  width: '150px',
                  top: '0',
                  left: '0',
                  borderRadius: 'inherit',
                }}
              />
            ) : (
              <img
                style={{
                  width: '200px',
                  top: '0',
                  left: '0',
                  borderRadius: 'inherit',
                }}
                src={image ? image : Rectangle}
                alt="userBGimage"
              />
            )}
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
              <label htmlFor="fname">Title</label>
            </p>
            <input
              type="text"
              id="fname"
              name="title"
              placeholder="Notes for Lab #6"
              className="create-profile-input"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <br /> <br />
            {/*  Description*/}
            <p>
              <label htmlFor="w3review">Description </label>
            </p>
            <textarea
              className="create-profile-input"
              type="text"
              id="bio"
              name="comment"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p style={{ textAlign: 'right', fontSize: '11px' }}>
              <label htmlFor="w3review">0/300</label>
            </p>
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
                onClick={postNewClassMaterial}
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

export default AddMaterials
