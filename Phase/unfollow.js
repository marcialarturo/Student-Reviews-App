const { phase } = require('./utils/init.js')
const { ethers } = require('ethers')

const user1 = '0x9ecFca6B5dBE01772177F1b4fB660a063D17a7De'
const user2 = '0x6EE6D1DF5E2DccD784f7a4bf8eCE5Dbc1babBD45'

/// @param follower is address initiating the follow
/// @param following is the person to be followed
export async function unfollow(unfollower, unfollowing) {
  try {
    // Get address of Phase Profile
    let profileAddress = await phase.phase(unfollowing)

    // If Phase Profile is Zero Address (i.e. doesn't exist) return
    if (profileAddress === ethers.constants.AddressZero) {
      console.log("That user doesn't have a profile")
      return
    }

    let tx = await phase.removeFollow(unfollower, unfollowing)
    return tx
  } catch (error) {
    console.log(error)
  }
}

// exports.unfollow = unfollow
