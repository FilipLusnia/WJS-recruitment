import { availableCommands, cmdWindow, outputNewLine } from "./script.js"

export const BASIC_COMMANDS = {
	clear: {
		name: 'clear',
		desc: 'Clears the commandline window',
		callback: callbackClear
	},
	help: {
		name: 'help',
		desc: 'Shows all available commands (basic and custom)',
		callback: callbackHelp
	},
	quote: {
		name: 'quote',
		desc: 'Shows a random quote',
		callback: callbackQuote
	},
	double: {
		name: 'double {x}',
		desc: 'Multiplies given number (x) by 2',
		callback: callbackDouble
	},
}

function callbackClear() {
	while (cmdWindow.firstChild) {
        cmdWindow.removeChild(cmdWindow.firstChild);
    }
}

function callbackHelp() {
	outputNewLine('Available commands:')
	for (const command of Object.entries(availableCommands)) {
		const c = command[1]
		outputNewLine(`- ${c.name}: ${c.desc}`)
	}
}

function callbackQuote() {
	fetch('https://dummyjson.com/quotes/random')
	.then(resp => resp.json())
	.then(data => outputNewLine(`${data.quote} - ${data.author}`))
	.catch(err => outputNewLine(err, 'error'))
}

function callbackDouble(args) {
	if (args.length > 1) {
		outputNewLine('Too many arguments passed to the command - only one argument is required', 'error')
		return
	}

	if (args.length === 0) {
		outputNewLine('No arguments passed to the command - at least one argument is required', 'error')
		return
	}
	
	const x = args[0];
	if (!isNaN(parseInt(x))) {
		outputNewLine(`${x} * 2 = ${x*2}`)
	} else {
		outputNewLine('', 'error')
	}
}