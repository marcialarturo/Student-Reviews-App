const { phase } = require('./utils/init.js')
const { displayPhase } = require('./displayPhase.js')
const { ethers } = require('ethers')

// Displays all people following address
export async function displayFollowers(address) {
    let totalTokens = Number(await phase.phaseID(address))

    if (totalTokens == 2) {
        return "No Followers!"
    }

    let followers = []

    let follower, metadata
    for(let i = 2; i < totalTokens; i++) {

        try {
            follower = await phase.ownerOf(address, i)

            metadata = await displayPhase(follower)

            followers.push(metadata)
        } catch {

        }

    }


    return followers
}

// exports.displayFollowers = displayFollowers
