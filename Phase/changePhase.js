const { phase } = require('./utils/init.js')
const { ethers } = require('ethers')

/// @param links e.g. [ [ 'Twitter', 'https://twitter.com/enndsz' ],[ 'GitHub', 'https://github.com/ryansea' ] ]
export async function changePhase(address, username, avatar, banner, bio, links) {
  try {
    // Create profile
    let tx = await phase.changeProfile(
      address,
      username,
      avatar,
      banner,
      bio,
      links,
    )

    return tx
  } catch (error) {
    console.log(error)
  }
}

/// TEST CALL
//createProfile("0x9ecFca6B5dBE01772177F1b4fB660a063D17a7De", username, avatar, banner, bio, links)

// exports.changePhase = changePhase

