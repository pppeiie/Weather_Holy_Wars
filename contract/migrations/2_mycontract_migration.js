const MyContract = artifacts.require('MyContract')

module.exports = deployer => {
  deployer.deploy(MyContract,'0x882906a758207FeA9F21e0bb7d2f24E561bd0981')
}
