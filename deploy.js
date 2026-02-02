import HDWalletProvider from '@truffle/hdwallet-provider'
import { Web3 } from 'web3'
import compile from './compile.js'

const provider = new HDWalletProvider(
	'subject tray poem alien law wedding item left tent return exile lizard',
	'https://sepolia.infura.io/v3/7a1f1ca08dfb4f2290fef4dec758e9bd'
)

const web3 = new Web3(provider)

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log('Attempting to deploy from account', accounts[0])

	const result = await new web3.eth.Contract(JSON.parse(compile.interface))
		.deploy({ data: compile.bytecode })
		.send({ from: accounts[0], gas: '1000000' })

	console.log('interface:', compile.interface)
	console.log('Contract deployed to', result.options.address)

	provider.engine.stop()
}

deploy()
