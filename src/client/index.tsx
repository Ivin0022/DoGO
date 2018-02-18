import * as React from "react"
import * as ReactDOM from "react-dom"

interface Event {
	from: React.FormEvent<HTMLFormElement>;
	change: React.ChangeEvent<HTMLInputElement>;
}

interface TodoStates {
	things: Array<string>;
	text: string;
}

class Todo extends React.Component<any, TodoStates> {
	constructor(props: any) {
		super(props)
		this.state = {
			things: [],
			text: ''
		};
		this.updateValue = this.updateValue.bind(this);
		this.func = this.func.bind(this);
	}


	func(event: Event['from']) {
		event.preventDefault();
		this.setState(prevState => ({
			things: prevState.things.concat(this.state.text),
			text: ''
		}));
		console.log(this.state);
	}

	updateValue(event: Event['change']) {
		this.setState({text: event.target.value});
	}

	render() {

		let row = []
		for (let i of this.state.things) {
			row.push(<li key={i}>{i}</li>);
		}

		return (

			<div>
				<h1>{this.props.children}</h1>

				<ul>{row}</ul>

				<form onSubmit={this.func}>
					<input 
						onChange={this.updateValue} 
						value={this.state.text}
						type="text"
					/>
					<button>click me</button>
				</form>
			</div>
		);
	}
}


ReactDOM.render(<Todo>TO DO</Todo>, document.getElementById('root'));