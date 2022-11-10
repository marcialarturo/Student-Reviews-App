import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router'
import { Container, Box, Grid, Button, Chip, Card } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import LinearProgress from '@mui/material/LinearProgress'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags'
import './Profile.css'
import donation from '../../../images/list.png'
import classImage from '../../../images/classImage.png'
import Overview from './Overview'
import Updates from './Updates'
import SingleDistributionBar from './SingleDistributionBar'
import ClassNotes from './ClassNotes'
import AddMaterials from './AddMaterials'
import MaterialDetails from './MaterialDetails'
import { Popup } from './Popup'
const secret =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJFOGY5MWZENTJmMGI4MTRGN2ZFNjdkNzcyQTJDRjE0RjkyNTU0ODgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODAzMTMwNjIwMCwibmFtZSI6InN0dWRlbnQtcmV2aWV3cy1tYXRlcmlhbHMifQ.H0g2NZp087990mAKBGNf8CDhTr93-5r2FQHeIRNDunI'

const dataUpdates = [
  {
    created: 'August 23, 2022',
    author: 'Annie Loizzi',
    update:
      'Cooper is making some positive progress this week. Following is an update from the Roberts family:  This week, we are happy to report that Cooper IV and PICC lines have been removed. He no longer requires IV pain medicine and antibiotics.',
  },
  {
    created: 'August 23, 2022',
    author: 'Annie Loizzi',
    update:
      'Cooper is making some positive progress this week. Following is an update from the Roberts family:  This week, we are happy to report that Cooper IV and PICC lines have been removed. He no longer requires IV pain medicine and antibiotics.',
  },
]

function Profile({
  account,
  currentAccount,
  selectedProfile,
  setDonateNfts,
  setDonateStream,
  wallet
}) {
  const history = useHistory()
  const [section, setSection] = useState('StudentRatings')
  const [reviews, setReviews] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [allNotes, setAllNotes] = useState([])
  const [notes, setNotes] = useState([
    {
      image:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/08/learn-coding-online-for-free.png',
      title: 'Introduction to Programming',
      description:
        'Here are my notes for the mid term on the last two labs. I hope it helps you =)',
      creator: '0xjhfs2435',
    },
    {
      image:
        'https://www.potential.com/wp-content/uploads/2020/11/Online-teaching.png',
      title: 'Introduction to Programming',
      description:
        'Here are my notes for the mid term on the last two labs. I hope it helps you =)',
      creator: '0xjhfs2435',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpwOgnI7iNkeJbKTVXpNdmLEpbpD3l_SdqIQtxAdm43-rbzW-GRWbDdXiVyeNXi0S0G0&usqp=CAU',
      title: 'Introduction to Programming',
      description:
        'Here are my notes for the mid term on the last two labs. I hope it helps you =)',
      creator: '0xjhfs2435',
    },
    {
      image:
        'https://poorvucenter.yale.edu/sites/default/files/images/TeachingOnlineatYale%282%29.png',
      title: 'Introduction to Programming',
      description:
        'Here are my notes for the mid term on the last two labs. I hope it helps you =)',
      creator: '0xjhfs2435',
    },
  ])

  const details = (note) => {
    console.log('click details', note)
    setSelectedMaterial(note)
    setOpen(true)
  }

  useEffect(() => {
    const getAllClassMaterials = async () => {
      try {
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        console.log('🚀  cids', cids)

        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            // formats the imageURL
            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }

            data = await data.json()
            const materialTemp = JSON.parse(data.description)
            let currentMaterial = {}
            currentMaterial.image = await getImage(data.image)
            currentMaterial.description = materialTemp.description
            currentMaterial.title = materialTemp.title
            currentMaterial.creator = materialTemp.creator
            temp.push(currentMaterial)
          }
        }
        setAllNotes(temp)
      } catch (error) {
        console.log(error)
      }
    }
    getAllClassMaterials()
  }, [])


  const getAllReviews = async () => {
    try {
      const temp = []
      const reviewsArray = selectedProfile.reviews
      for (let i = 0; i < reviewsArray.length; i++) {
        let currentReview = reviewsArray[i]
        let getNFTStorageData = await fetch(currentReview)
        let res = await getNFTStorageData.json()
        const data = JSON.parse(res.description)
        let tagsArray = data.tags.split(',')
        data.tags = tagsArray
        temp.push(data)
      }
      setReviews(temp)
    } catch (error) {
      console.log(error)
    }
  }

  const goToDashboard = () => {
    history.push('/')
  }

  useEffect(() => {
    if (selectedProfile && selectedProfile.reviews.length > 0) {
      getAllReviews()
    }
  }, [selectedProfile])

  const goTodonate = async (e) => {
    history.push(`/donate`)
  }
  const donateStream = async (e) => {
    setDonateStream(true)
    history.push(`/donate`)
  }

  const donateNFTs = async (e) => {
    setDonateNfts(true)
    history.push(`/donate`)
  }

  const visitSite = (site) => {
    const link = site.value
    if (link) {
      window.open(link, '_blank')
    } else {
      window.open(site, '_blank')
    }
  }

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const show = (
    <Container
      style={{
        minHeight: '70vh',
        paddingBottom: '1rem',
        paddingTop: '4rem',
      }}
    >
      <p className="title">Ratings for {selectedProfile.className} Class</p>
      <br />
      <br />
      <section style={{ display: 'flex', justifyItems: 'center' }}>
        <div
          style={{
            width: '100%',
          }}
        >
          <img
            src={selectedProfile.image}
            alt="classImage"
            style={{
              width: '60%',
            }}
          />
          <p className="position">
            By{' '}
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                paddingBottom: '0.5rem',
              }}
            >
              {selectedProfile.instructorName}
            </span>
          </p>
          <p className="position"> {selectedProfile.position}</p>

          <div style={{ display: 'flex', justifyContent: 'normal' }}>
            <div style={{ width: '150px' }}>
              <p className="class-dificulty">90%</p>
              <p className="position">Would Take Again</p>
            </div>

            <div style={{ width: '150px' }}>
              <p className="class-dificulty">
                {selectedProfile.classDificulty}
              </p>
              <p className="position">Level of Difficulty </p>
            </div>
          </div>
          <br />
          <p className="position">Class id: {selectedProfile.fundraiserId}</p>
        </div>
        <div
          style={{
            width: '100%',
            color: 'black',
            textAlign: 'end',
          }}
        >
          <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            $
            {selectedProfile.totalDonations === '0'
              ? '0.00'
              : selectedProfile.totalDonations}
            <span
              style={{
                fontSize: '.94rem',
                color: 'rgb(90 87 87)',
                paddingLeft: '0.3rem',
              }}
            >
              raised up to now.
            </span>
          </p>
          <br />
          <LinearProgress variant="determinate" value={50} />

          <p style={{ fontSize: '.9rem', color: 'rgb(90 87 87)' }}>
            30.3K suppoters
          </p>
          <br />
          <br />

          <div
            style={{
              display: 'flex',
            }}
          >
            <Button
              style={{
                width: '50%',
                background: 'linear-gradient(180deg,#ffde9e 50%,#fcb957)',
                color: 'black',
              }}
              onClick={goTodonate}
            >
              Tip Now
            </Button>

            <br />
            <br />
            <Button
              style={{
                width: '50%',
                background: 'rgb(0, 85, 253)',
                color: 'white',
              }}
              component={Link}
              to="/post-comment"
            >
              Rate this class
            </Button>
          </div>

          <Card
            style={{
              padding: '2rem',
            }}
          >
            <div className="page-wallet-address">
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  paddingBottom: '0.8rem',
                }}
              >
                Rating Distribution
              </p>

              {selectedProfile?.rating
                ? selectedProfile.rating.map((ele, index) => (
                    <SingleDistributionBar ele={ele} key={index} />
                  ))
                : ''}
            </div>
          </Card>
        </div>
      </section>

      <section id="comments">
        <br />

        <div
          style={{
            paddingTop: '2.5rem',
            paddingBottom: '1rem',
          }}
        >
          <Button
            variant={section === 'StudentRatings' ? 'contained' : ''}
            onClick={() => setSection('StudentRatings')}
          >
            Student Ratings
          </Button>
          <Button
            variant={section === 'ClassNotes' ? 'contained' : ''}
            onClick={() => setSection('ClassNotes')}
          >
            Class Notes
          </Button>

          <Button
            variant={section === 'AddMaterials' ? 'contained' : ''}
            onClick={() => setSection('AddMaterials')}
          >
            Add Materials
          </Button>

          <Button
            variant={section === 'Chat' ? 'contained' : ''}
            onClick={() => setSection('Chat')}
            // component={Link}
            // to="/donate"
          >
            Group Chat
          </Button>
        </div>

        <hr style={{ border: '1px solid #c8c8c8' }} />
        <br />

        {/* check which component to display */}
        {section === `ClassNotes` && (
          <ClassNotes
            notes={notes}
            allNotes={allNotes}
            setSelectedMaterial={setSelectedMaterial}
            setOpen={setOpen}
          />
        )}
        {section === `Chat` && <h2>Coming soon....</h2>}
        {section === `AddMaterials` && <AddMaterials wallet={wallet} />}
        {section === `MaterialDetails` && (
          <MaterialDetails selectedMaterial={selectedMaterial} />
        )}

        {open ? (
          <Popup
            text="Hello there!"
            selectedMaterial={selectedMaterial}
            closePopup={() => setOpen(false)}
          />
        ) : null}

        {section === `StudentRatings` &&
          reviews.map((review, index) => (
            <Card
              style={{
                padding: '2rem',
                backgroundColor: 'rgba(241, 241, 241, 0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
              >
                <div
                  style={{
                    flex: '10%',
                    textAlign: 'center',
                  }}
                >
                  <p className="quality">QUALITY</p>

                  <p className="quality-bg">{review.quality}.0</p>
                  <br />
                  <br />
                  <p className="quality">DIFFICULTY</p>

                  <p
                    className="quality-bg"
                    style={{
                      background: 'rgb(228, 228, 228)',
                    }}
                  >
                    {review.dificulty}.0
                  </p>
                </div>

                <div
                  style={{
                    flex: '90%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p className="class-section">
                      Class section: {review.section}
                    </p>
                    <p className="awesome">{review.rating}</p>
                    <p className="date"> {review.created} </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: '.8rem',
                    }}
                  >
                    <p>
                      For Credit: <span className="bold">Yes</span>
                    </p>
                    <p>
                      Attendance: <span className="bold">Mandatory</span>{' '}
                    </p>
                    <p>
                      Would Take Again: <span className="bold">Maybe</span>
                    </p>
                    <p>
                      Grade: <span className="bold">N/A</span>
                    </p>
                    <p>
                      Textbook: <span className="bold">No Require</span>
                    </p>
                  </div>
                  <br />
                  <br />
                  <br />
                  <p className="review-text ">{review.comment}</p>

                  {review.tags
                    ? review.tags.map((tag, index) => (
                        <Chip
                          label={tag}
                          key={index}
                          style={{ marginRight: '.3rem' }}
                        />
                      ))
                    : ''}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: '2rem',
                    }}
                  >
                    <div>
                      <ThumbUpOffAltIcon />
                      <span
                        style={{
                          paddingRight: '1.5rem',
                        }}
                      >
                        0
                      </span>
                      <ThumbDownOffAltIcon />
                      <span>0</span>
                    </div>
                    <EmojiFlagsIcon />
                  </div>
                </div>
              </div>
            </Card>
          ))}

        <br />
        <br />
        <br />
      </section>
    </Container>
  )

  return (
    <>
      {!selectedProfile ? (
        <Container
          style={{
            minHeight: '70vh',
            paddingBottom: '1rem',
            paddingTop: '4rem',
            textAlign: 'center',
          }}
        >
          <h2>Something went wrong...</h2> <br />
          <br />
          <Button variant="contained" color="primary" onClick={goToDashboard}>
            Please go back
          </Button>
        </Container>
      ) : (
        show
      )}
    </>
  )
}

export default Profile
