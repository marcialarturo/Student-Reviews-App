const { phase } = require('./utils/init.js')
const { displayPhase } = require('./displayPhase.js')

// Takes user address and returns an array of metadata of everyone they're following
export async function displayFollowing(address) {
    let allUsers = await phase.viewPhases()

    let total = allUsers.length

    let follows, user, metadata, followers = []
    for(let i = 0; i < total; i++) {
        user = allUsers[i]

        if (user !== address) {
            follows = await phase.isFollowing( address, user )

            if (follows) {
                metadata = await displayPhase(user)

                followers.push(metadata)
            }

        }

    }

    return followers

}

// exports.displayFollowing = displayFollowing
