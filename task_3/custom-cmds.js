import { outputNewLine } from "./script.js"

export const CUSTOM_COMMANDS = {
	hello: {
		name: 'hello',
		desc: 'Prints a welcoming',
		callback: callbackHello
	},
}

function callbackHello() {
	outputNewLine('Hello :)')
}