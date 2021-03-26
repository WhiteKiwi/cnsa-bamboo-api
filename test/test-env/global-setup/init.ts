import setup from './setup'

async function init() {
	await setup()

	process.exit(0)
}
init()
