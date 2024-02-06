import { outputNewLine } from "./script.js"

export const CUSTOM_COMMANDS = {
	hello: {
		name: 'hello',
		desc: 'Prints a welcoming',
		callback: callbackHello
	},
	movies: {
		name: 'movies',
		desc: 'Prints a list of movies',
		callback: callbackMovies
	},
}

function callbackHello() {
	outputNewLine('Hello :)')
}

function callbackMovies() {
	fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
	.then(resp => resp.json())
	.then(data => {
		outputNewLine('Movies list:')
		data.forEach(movie => {
			outputNewLine(`- ${movie.Title} (${movie.Year})`)
		});
	})
	.catch(err => outputNewLine(err, 'error'))
}