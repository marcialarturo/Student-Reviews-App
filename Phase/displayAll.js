const { phase } = require('./utils/init.js')
const { displayPhase } = require('./displayPhase.js')


export async function displayAll() {

    try {
        let addresses = await phase.viewPhases()

        let profiles = []

        let length, metadata
        length = addresses.length

        for (let i = 0; i < length; i++) {
            metadata = await displayPhase(addresses[i])
            profiles.push(metadata)
        }

        return profiles

    } catch (error) {
        console.log(error)
    }

}

// exports.displayAll  = displayAll
