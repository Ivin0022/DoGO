import * as React from 'react';
import { ListItems } from './Items';
import * as SocketIO from 'socket.io-client';

export interface Event {
    submit: React.FormEvent<HTMLFormElement>;
    change: React.ChangeEvent<HTMLInputElement>;
}

export interface TodoStates {
    things: Array<string>;
    text: string;
}


const IO = SocketIO('http://localhost:5000/');

IO.on('connect', () => console.log('connected... '))

export class ListContainer extends React.Component<any, TodoStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            things: [],
            text: ''
        };
   
        IO.on('take it', this.setData);
        IO.once('init-items-list', this.setData);
    }

    setData = (data: string) => {
        console.log(data);
        this.setState(prevState => ({
            things: prevState.things.concat(data)
        }));
    }


    submitFunc = (event: Event['submit']) => {
        event.preventDefault();
        IO.emit('myevent', this.state.text);
        this.setState({ text: '' });
    }

    updateValue = (event: Event['change']) => {
        this.setState({ text: event.target.value });
    }

    render() {
        return (

            <div>
                <h1>{this.props.children}</h1>


                <ListItems>{this.state.things}</ListItems>
                
                <form onSubmit={this.submitFunc}>
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
