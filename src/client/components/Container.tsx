import * as React from 'react';
import { ListItems } from './Items';
import * as SocketIO from 'socket.io-client';

export interface Event {
    submit: React.FormEvent<HTMLFormElement>;
    change: React.ChangeEvent<HTMLInputElement>;
}

export interface TodoStates {
    things: Array<{id?: string, value?: string}>;
    text: string;
}


const io = SocketIO('http://localhost:5000/');

io.on('connect', () => console.log('connected... '))

export class ListContainer extends React.Component<any, TodoStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            things: [],
            text: ''
        };
   
        io.once('init-list-items', this.setData);
        io.on('add-list-item-client', this.setData);

        io.on('delete-list-item-client', (id:string) => {
            this.setState(prevState => ({
                things: prevState.things.filter(ele => ele.id !== id);            
            }));
        });
    }

    setData = (data: object) => {
        this.setState(prevState => ({
            things: prevState.things.concat(data)
        }));
    }


    submitFunc = (event: Event['submit']) => {
        event.preventDefault();
        io.emit('add-list-item', this.state.text);
        this.setState({ text: '' });
    }

    childCallback = (dataFromChild: any) => {
        console.log('parent callback (listcontainer)');
        io.emit('delete-list-item', dataFromChild)
    }

    updateValue = (event: Event['change']) => {
        this.setState({ text: event.target.value });
    }

    render() {
        return (

            <div>
                <h1>{this.props.children}</h1>


                <ListItems pcb={this.childCallback}>{this.state.things}</ListItems>
                
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
