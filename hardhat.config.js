require('@nomiclabs/hardhat-waffle')

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.10',
  networks: {
    hardhat: {
      chainId: 0x2696efe5, //skale
      // chainId: 1337, //matic
    },
    matic: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [
        'YOUR KEYS
        ',
      ],
    },
    skale: {
      url: 'https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos',
      accounts: [
        'YOUR KEYS
        ',
      ],
    },
    optimistic: {
      url:
        'https://opt-kovan.g.alchemy.com/v2/cfv68qUqLuZipE8sXJYuG-KQ1eKiuPsl',
      accounts: [
        'YOUR KEYS
        ',
      ],
    },
    rinkeby: {
      url:
        'https://eth-rinkeby.gateway.pokt.network/v1/lb/62b8802d123e6f0039866020',
      accounts: [
        'YOUR KEYS
        ',
      ],
    },
  },
  paths: {
    artifacts: './src/artifacts',
    cache: './src/cache',
  },
  NODE_OPTIONS: '--openssl-legacy-provider',
}
