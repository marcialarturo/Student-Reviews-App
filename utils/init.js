const { ethers } = require('ethers')

const { abi } = require('./MetaPhase.json')

const { alchemy, privateKey } = require('./config.json')

const phase_address = '0xd7606503462d66daae54884ad684e5a7e17148d9'

//" 0x3941a9347346cf4a4e395496d6a51b66584b7c73  0xd7606503462d66daae54884ad684e5a7e17148d9"

const provider = new ethers.providers.JsonRpcProvider(alchemy)
export const signer = new ethers.Wallet(privateKey, provider)
export const phase = new ethers.Contract(phase_address, abi, signer)

// exports.phase = phase
// exports.signer = signer
