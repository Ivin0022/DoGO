import * as React from 'react';
import { ListItems } from './Items';
import * as SocketIO from 'socket.io-client';

export interface Event {
    submit: React.FormEvent<HTMLFormElement>;
    change: React.ChangeEvent<HTMLInputElement>;
}

export interface TodoStates {
    things: Array<{id: string, value: string}>;
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
                things: prevState.things.filter(ele => ele.id !== id)            
            }));
        });
    }

    setData = (data: {id: string, value: string}) => {
        this.setState(prevState => ({
            things: prevState.things.concat(data)
        }));
    }


    submitFunc = (event: Event['submit']) => {
        event.preventDefault();
        if (this.state.text !== '') {
            io.emit('add-list-item', this.state.text);
            this.setState({ text: '' });
        }
    }

    deleteItem = (dataFromChild: string) => {
        console.log('parent callback (listcontainer)');
        io.emit('delete-list-item', dataFromChild)
    }

    updateValue = (event: Event['change']) => {
        this.setState({ text: event.target.value });
    }

    render() {
        return (

            <div className="container-fluid">
                <div className="card ">
                    <div className="card-header bg-primary rounded-top">
                        <h3 className="text-center">{this.props.children}</h3>
                    </div>

                    <ListItems 
                    onItemDelete={this.deleteItem}
                    >
                        {this.state.things}
                    </ListItems>
                    
                    <form onSubmit={this.submitFunc}>
                        <div className="form-group clearfix px-3">
                            <input
                                className="form-control form-control-lg"
                                onChange={this.updateValue}
                                value={this.state.text}
                                type="text"
                            />
                            <small className="form-text text-muted float-right mt-2 mr-2">
                                <i>Press Enter to add items</i>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}