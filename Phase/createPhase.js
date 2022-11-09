const { phase } = require('./utils/init.js')
const { ethers } = require('ethers')
const base64 = require('base-64')

/// TEST ARGS
let username = 'Rite'
let avatar =
  'https://64.media.tumblr.com/6b422dc93e53d8d54939021650e3c117/tumblr_pwiyi4VAM21qaxphpo1_1280.jpg'
let banner =
  'https://ih1.redbubble.net/image.382904608.9559/flat,1000x1000,075,f.u1.jpg'
let bio = 'Blockchain Dev'
let links = [
  ['Website', 'http://autocrat.xyz'],
  ['GitHub', 'https://github.com/ryansea'],
]

/// @param links e.g. [ [ 'Twitter', 'https://twitter.com/enndsz' ],[ 'GitHub', 'https://github.com/ryansea' ] ]
export async function createPhase(address, username, avatar, banner, bio, links) {
  try {
    // Get address of phase for user (should be zero address)
    // let profile_address = await phase.phase(address)

    // //  Require profile_address == zero address
    // if (profile_address !== ethers.constants.AddressZero) {
    //     return "Phase Already Made!"
    // }

    let metadata = {
      address: address,
      username: username,
      avatar: avatar,
      banner: banner,
      bio: bio,
      links: links,
    }

    let uri =
      'data:application/json;base64,' + base64.encode(JSON.stringify(metadata))

    console.log(uri)

    // // Create profile
    let tx = await phase.createProfile(
      address,
      username,
      avatar,
      banner,
      bio,
      links,
    )

    await tx.wait()

    tx = await phase.follow(address, address, uri)

    return tx
  } catch (error) {
    console.log(error)
  }
}

/// TEST CALL
//createPhase("0x9ecFca6B5dBE01772177F1b4fB660a063D17a7De", username, avatar, banner, bio, links)

// exports.createPhase = createPhase
