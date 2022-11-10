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

function PostComment({
  setImage,
  setPosition,
  setBio,
  setCoverPhoto,
  image,
  position,
  bio,
  coverPhoto,
  category,
  setCategory,
  setInstructorName,
  instructorName,
  contract,
  wallet,
}) {
  console.log('🚀 ~ file: PostComment.js ~ line 35 ~ contract', contract)
  const history = useHistory()
  const [quality, setQuality] = useState('')
  const [dificulty, setDificulty] = useState('')
  const [section, setSection] = useState('')
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [tags, setTags] = useState('')
  const type = useRef()

  const getDay = async () => {
    let d = new Date()
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo}-${da}-${ye}`
  }

  const addNewComment = async () => {
    if (!wallet) alert('Please connect your wallet!')
    try {
      const creationDate = await getDay()
      const obj = {
        quality: quality ? quality : '5',
        dificulty: dificulty ? dificulty : '5',
        section: section ? section : 'Programming 100',
        rating: rating ? rating : '😎 AWESOME',
        comment: comment
          ? comment
          : 'This professor is by far my favorite Professor I have had. He is so understanding and takes the time to make sure you understand the material.He will review it and explain it in different ways to ensure that everyone is gets it.He also so funny and loves when the class has a discussion instead of him just speaking.I learned a lot from him.',
        created: creationDate,
        tags: tags ? tags : 'Caring,Participation Matters,Caring,helpful',
        author: wallet,
      }
      const postId = 0

      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: 'Review',
        description: JSON.stringify(obj),
        image: new File([image], 'imageName', { type: 'image/*' }),
      })

      if (metadata) {
        console.log('metadata URL', metadata?.url)
        const url = metadata?.url.substring(7)
        const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`

        const saveToContract = await contract.createReview(fullUrl, postId)
        const tx = await saveToContract.wait()
        history.push('/classes')
      }
    } catch (error) {
      console.log(error)
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
              <Button
                className="whiteLink-nonavbar"
                component={Link}
                to="/create"
              >
                New Rate
              </Button>

              <Button className="whiteLink-no-active">Confirmation</Button>
            </div>
            <br />
            <hr style={{ border: '1px solid #ccc' }} />
            <br />
            <br />
            <p>
              <label htmlFor="fname">Class Section</label>
            </p>
            <input
              type="text"
              id="fname"
              name="name"
              placeholder="Programming"
              className="create-profile-input"
              defaultValue={section}
              onChange={(e) => setSection(e.target.value)}
            ></input>
            <br /> <br />
            {/*  Description*/}
            <p>
              <label htmlFor="w3review">Description Rating</label>
            </p>
            <textarea
              className="create-profile-input"
              type="text"
              id="bio"
              name="comment"
              rows="4"
              cols="50"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <p style={{ textAlign: 'right', fontSize: '11px' }}>
              <label htmlFor="w3review">0/300</label>
            </p>
            <br />
            {/*quality*/}
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
            {/*dificulty*/}
            <p>
              <label htmlFor="fname">Difficulty</label>
            </p>
            <TextField
              fullWidth
              name="quality"
              select
              variant="outlined"
              onChange={(e) => setDificulty(e.target.value)}
              defaultValue={dificulty}
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
            {/*Rating*/}
            <p>
              <label htmlFor="fname">Overall Rating</label>
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
              <MenuItem value="😎 AWESOME">Awesome 5</MenuItem>
              <MenuItem value="😎 Great 4">Great 4</MenuItem>
              <MenuItem value="👍 Good 3">Good 3</MenuItem>
              <MenuItem value="😏 Ok 2">Ok 2</MenuItem>
              <MenuItem value="😐 1">Awful 1</MenuItem>
            </TextField>
            <br />
            <br />
            {/*  Tags*/}
            <p>
              <label htmlFor="tags">Enter tags separated by comma</label>
            </p>
            <textarea
              className="create-profile-input"
              type="text"
              id="bio"
              name="tags"
              rows="1"
              cols="50"
              placeholder="Caring, Participation matters, Helpful"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            ></textarea>
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
                onClick={addNewComment}
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

export default PostComment
