const { phase } = require('./utils/init')
const { ethers } = require('ethers')

export async function hasPhase(address) {
  let phase_address = await phase.phase(address)

  let answer = phase_address !== ethers.constants.AddressZero

  return answer
}

// exports.hasPhase = hasPhase
