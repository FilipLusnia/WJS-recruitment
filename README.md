# WJS recruitment tasks

All tasks are included in this repository

### Task 1
Simple header menu.\
Launch the index.html file to see it live.

### Task 1 Custom
Enhanced solution from task_1. It has a changed HTML to make styling easier, add missig elements and to include responsive mobile menu.\
Launch the index.html file to see it live.

### Task 2
Small searchbar. The search is engaged either by typing something into the input or by pressing "search" icon.\
Launch the index.html file to see it live.

### Task 3
CMD terminal with built-in commands and possibility to add custom commands through "custom-cmds.js" file, found at project's root.\
The custom command's format:

<pre>
CUSTOM_COMMANDS = {
	[command name]: {
 		name: [command's name in string format],
   		desc: [command's description in string format],
     		callback: [command's callback function, executing the desired code]
       	},
	...
}
</pre>

To submit a command, type it into the input field and press Enter key.\
Terminal has an option to search through previously called commands with up and down arrow keys. 

To see this task live, it is required to launch the index.html through some sort of live server, for example: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
