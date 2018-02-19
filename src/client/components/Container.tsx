import * as React from 'react';
import {ListItems} from './Items';

export interface Event {
    submit: React.FormEvent<HTMLFormElement>;
    change: React.ChangeEvent<HTMLInputElement>;
}
export interface TodoStates {
    things: Array<string>;
    text: string;
}

export class ListContainer extends React.Component<any, TodoStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            things: [],
            text: ''
        };
    }


    submitFunc = (event: Event['submit']) => {
        event.preventDefault();

        this.setState(
            (prevState) => ({
                things: prevState.things.concat(this.state.text),
                text: '' //reset the value of the textbox
            }),
            () => {
                console.log(this.state);
            }
        );
    }

    updateValue = (event: Event['change']) => {
        this.setState({text: event.target.value});
    }

    render() {

        

        return (

            <div>
                <h1>{this.props.children}</h1>


                <ListItems items={this.state.things} />

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
