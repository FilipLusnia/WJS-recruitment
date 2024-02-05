import { BASIC_COMMANDS } from './basic-cmds.js'
import { CUSTOM_COMMANDS } from './custom-cmds.js'

export const cmdInput = document.querySelector('.cmd_input')
export const cmdContainer = document.querySelector('.cmd_window_container')
export const cmdWindow = document.querySelector('.cmd_window')

export const availableCommands = { ...BASIC_COMMANDS, ...CUSTOM_COMMANDS };
let history = [];
let commandNumber = 0;

export const browseCommandHistory = (dir) => {
	if (history.length > 0) {
		if ((dir === 'up') && (commandNumber > 0)) {
			commandNumber --
			cmdInput.value = history[commandNumber]
			console.log(commandNumber)
		}
		if ((dir === 'down') && (commandNumber < history.length)) {
			commandNumber ++
			cmdInput.value = history[commandNumber] ?? ''
			console.log(commandNumber)
		}
	}
}

export const outputNewLine = (text, type) => {
	const newLine = document.createElement('li')
	type === 'user' && newLine.classList.add('-user')
	type === 'error' && newLine.classList.add('-error')

	if (type === 'user') {
		newLine.innerText = "> " + text;
	} else {
		newLine.innerText = text;
	}
	cmdWindow.appendChild(newLine)
	cmdContainer.scrollTop = cmdContainer.scrollHeight;
}

cmdInput.focus();
cmdInput.addEventListener('blur', () => cmdInput.focus())

cmdInput.addEventListener('keyup', e => {
	if (e.key === 'Enter' || e.keyCode === 13) {
		const val = e.target.value;

		if (val.length > 0) {
			outputNewLine(val.toLowerCase(), 'user');
			history = [...history, val];
			commandNumber = history.length;

			const words = val.toLowerCase().split(" ");
			const command = words[0];
			const args = words.slice(1).filter(arg => arg !== '');

			if (availableCommands.hasOwnProperty(command)) {
				try {
					availableCommands[command].callback(args)
				} catch (err) {
					outputNewLine(err, 'error')
				}
			} else {
				outputNewLine("Invalid command - type \"help\" for available commands", 'error')
			}
		}

		e.target.value = ''
	}

	if (e.key === 'ArrowUp' || e.keyCode === 38) {
		browseCommandHistory('up')
	}

	if (e.key === 'ArrowDown' || e.keyCode === 40) {
		browseCommandHistory('down')
	}
})