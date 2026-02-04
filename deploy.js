import HDWalletProvider from '@truffle/hdwallet-provider'
import { Web3 } from 'web3'
import compile from './compile.js'
import dotenv from 'dotenv'

dotenv.config()

const provider = new HDWalletProvider(
	process.env.MNEMONIC,
	`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
)

const web3 = new Web3(provider)

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log('Attempting to deploy from account', accounts[0])

	const result = await new web3.eth.Contract(compile.abi)
		.deploy({ data: compile.evm.bytecode.object })
		.send({ from: accounts[0], gas: '1000000' })

	console.log('interface:', JSON.stringify(compile.abi))
	console.log('Contract deployed to', result.options.address)

	provider.engine.stop()
}

deploy()
