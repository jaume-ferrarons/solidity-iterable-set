module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  },
  networks: {
    parity: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      from: '0x00bE89BAFC475ECBDbf0A9F4b516AE263e927ad4',
      gas: 500000,
    }
  }
};
