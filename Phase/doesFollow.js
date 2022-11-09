const { phase } = require('./utils/init.js')
const { ethers } = require('ethers')

export async function doesFollow(follower, following) {

    if(ethers.utils.isAddress(follower) && ethers.utils.isAddress(following)) {
        let follows =  await phase.isFollowing(follower, following)

        return follows

    } else {
        return "Please enter adresses as args"
    }
}

// exports.doesFollow = doesFollow


