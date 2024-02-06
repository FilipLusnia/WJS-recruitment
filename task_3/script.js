import { BASIC_COMMANDS } from './basic-cmds.js'
import { CUSTOM_COMMANDS } from './custom-cmds.js'

export const cmdInput = document.querySelector('.cmd_input')
export const cmdContainer = document.querySelector('.cmd_window_container')
export const cmdWindow = document.querySelector('.cmd_window')
export const cmdSuggestions = document.querySelector('.cmd_suggestions')
export const cmdSuggestionsList = document.querySelector('.cmd_suggestions_list')

export const availableCommands = { ...BASIC_COMMANDS, ...CUSTOM_COMMANDS };
let history = [];
let commandNumber = 0;

const browseCommandHistory = (dir) => {
	if (history.length > 0) {
		if ((dir === 'up') && (commandNumber > 0)) {
			commandNumber --
			cmdInput.value = history[commandNumber]
			suggestCommand(cmdInput.value)
		}
		if ((dir === 'down') && (commandNumber < history.length)) {
			commandNumber ++
			cmdInput.value = history[commandNumber] ?? ''
			suggestCommand(cmdInput.value)
		}
	}
}

const showSuggestions = (show) => {
	show ?
		cmdSuggestions.style.display = 'block'
	:
		cmdSuggestions.style.display = 'none'
}

const parseCommand = (string) => {
	const words = string.toLowerCase().split(" ");
	const command = words[0];
	const args = words.slice(1).filter(arg => arg !== '');

	return {
		command: command,
		args: args
	}
}

const suggestCommand = (string) => {

	if (string.length > 0) {
		showSuggestions(true)
		let possibleComms = [];
		const { command } = parseCommand(string);
		
		for (const c of Object.keys(availableCommands)) {
			if (command === c.substring(0, string.length)){
				possibleComms = [...possibleComms, availableCommands[c].name]
			}
		}

		if (possibleComms.length > 0) {
			let listItems = [];
			for (const cName of possibleComms) {
				const li = document.createElement('li')
				li.innerText = cName;
				listItems = [...listItems, li]
			}
			cmdSuggestionsList.replaceChildren(...listItems)
		} else {
			showSuggestions(false)
		}
	} else {
		showSuggestions(false)
	}
}

export const outputNewLine = (text, type) => {
	const newLine = document.createElement('li')

	if (type === 'user') {
		newLine.classList.add('-user')
		newLine.innerText = "> " + text;
	} else if (type === 'error') {
		newLine.classList.add('-error')
		newLine.innerText = "Error: " + text;
	} else {
		newLine.innerText = text;
	}
	
	cmdWindow.appendChild(newLine)
	cmdContainer.scrollTop = cmdContainer.scrollHeight;
}

cmdInput.focus();
//forces cmd input to be always in focus
// cmdInput.addEventListener('blur', () => cmdInput.focus())

cmdInput.addEventListener('keyup', e => {
	const val = e.target.value;

	if (e.key === 'ArrowUp' || e.keyCode === 38) {
        cmdInput.setSelectionRange(val.length, val.length);
		browseCommandHistory('up')
	} else if (e.key === 'ArrowDown' || e.keyCode === 40) {
		browseCommandHistory('down')
	} else {
		
		suggestCommand(val)

		if (e.key === 'Enter' || e.keyCode === 13) {
			showSuggestions(false)
	
			if (val.length > 0) {
				outputNewLine(val.toLowerCase(), 'user');
				history = [...history, val];
				commandNumber = history.length;
	
				const { command, args } = parseCommand(val);
	
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
	}
})