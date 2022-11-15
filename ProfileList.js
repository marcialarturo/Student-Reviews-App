import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './ProfileList.css'
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'

import CircularStatic from '../../../commons/CircularProgressWithLabel'

function ProfileList({ account, contract, setSelectedProfile }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(false)
  console.log('** data', data)
  const history = useHistory()
  const [profiles, setProfiles] = useState([
    {
      image:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/08/learn-coding-online-for-free.png',
      className: 'Introduction to Programming',
      professorName: 'Joe Boulet',
      rating: '72',
    },

    {
      image:
        'https://www.potential.com/wp-content/uploads/2020/11/Online-teaching.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpwOgnI7iNkeJbKTVXpNdmLEpbpD3l_SdqIQtxAdm43-rbzW-GRWbDdXiVyeNXi0S0G0&usqp=CAU',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://poorvucenter.yale.edu/sites/default/files/images/TeachingOnlineatYale%282%29.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        ' https://plus.unsplash.com/premium_photo-1661685456957-3f93db2916ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1665037001/0xd9393c16f1aaf829a4e2358d44ed939514c0c3cd/633c8e696089f1d077c1b97d/blueprintCover/scarelords_title_xulpm7.png',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1665037001/0xd9393c16f1aaf829a4e2358d44ed939514c0c3cd/633c8e696089f1d077c1b97d/blueprintCover/scarelords_title_xulpm7.png',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1665037001/0xd9393c16f1aaf829a4e2358d44ed939514c0c3cd/633c8e696089f1d077c1b97d/blueprintCover/scarelords_title_xulpm7.png',
      className: 'Solidity Smart Contracts',
      professorName: 'Joe Boulet',
      rating: '72',
    },
    {
      image:
        'https://asynchronous-art-inc-res.cloudinary.com/image/upload/w_400,f_auto,c_thumb/v1645603121/blueprints/61fb3e9ccf78577707f0e686.png',
      className: 'Introduction Worldcoin',
      professorName: 'Joe Boulet',
      rating: '72',
    },
  ])

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

      const ipfs_cid = nftStorageURL.substring(33, 92)
      const data = await fetch(`https://ipfs.io/ipfs/${ipfs_cid}/metadata.json`)

      obj.fundraiserId = fundraiserId
      obj.organizer = organizer
      obj.totalDonations = totalDonations
      obj.classDificulty = data.classDificulty
      obj.className = data.className
      obj.image = getImage(data.image)
      obj.created = data.created
      obj.department = data.department
      obj.instructorName = data.instructorName
      obj.position = data.position
      obj.cid = ipfs_cid
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

  const details = (profile) => {
    console.log('click details', profile)
    localStorage.removeItem('selectedProfile')
    localStorage.setItem('selectedProfile', profile)
    setSelectedProfile(profile)
    history.push(`/profile/details/${profile.cid}`)
  }

  return (
    <div style={{ minHeight: '60vh', borderRadius: '24px' }}>
      {contract ? (
        ''
      ) : (
        <center>
          {' '}
          <h2>Please log in to continue...</h2>
        </center>
      )}

      {contract && !loading ? (
        <div>
          <Grid container spacing={24}>
            {data.length ? (
              data.map((profile, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  spacing={1}
                  className="swap-card"
                  key={index}
                >
                  <Card sx={{ maxWidth: 200 }} onClick={() => details(profile)}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={profile.image}
                      alt="Profile"
                    />
                    <CardContent style={{ padding: '10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingBottom: '5px',
                        }}
                      >
                        <p className="gallery-name"> {profile.className}</p>
                      </div>

                      <p className="gallery-professor">
                        {profile.instructorName}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No Professors Yet...</h2>
            )}
          </Grid>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ProfileList
