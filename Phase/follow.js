const { phase } = require('./utils/init.js')
const { ethers } = require('ethers')
const base64 = require('base-64');

const { displayPhase } = require('./displayPhase')

const user1 = "0x9ecFca6B5dBE01772177F1b4fB660a063D17a7De"
const user2 = "0x6EE6D1DF5E2DccD784f7a4bf8eCE5Dbc1babBD45"

/// @param follower is address initiating the follow
/// @param following is the person to be followed
export async function follow(follower, following) {
    console.log(" follower, following", follower, following)
    try {
        // Get address of Phase Profile
        let profileAddress = await phase.phase(following)

        // If Phase Profile is Zero Address (i.e. doesn't exist) return
        if (profileAddress === ethers.constants.AddressZero) {
            return "That user doesn't have a profile"
        }

        // Build metadata
        let metadata = await displayPhase(following)

        // Stringify metadata
        metadata = JSON.stringify(metadata)

        // Create inline URI
        // TEMP: Will integrate NFT.Storage
        metadata = "data:application/json;base64," + base64.encode(metadata)

        let tx = await phase.follow(follower, following, metadata)

        return tx

    } catch (error) {
        console.log(error)
    }

}

// exports.follow = follow
