import * as React from 'react';


export interface Event {
    mouse: React.MouseEvent<HTMLButtonElement>;
}

export interface ItemsPorps {
    children: Array<{id: string, value: string}>;
    pcb: Function;
}

export interface ItemsState {
    btnHide: boolean;
    id: string;
}

export interface OptionButtonProps {
    onDelete: (event: Event['mouse']) => void;
    onEdit?: (event: Event['mouse']) => void;
    className?: string;
}

export class ListItems extends React.Component<ItemsPorps, ItemsState> {

    private btn:  { [index: string]: HTMLDivElement | null};

    constructor(props: ItemsPorps) {
        super(props);

        this.btn = {};        
        this.state = {
            btnHide: true,
            id: ''
        }
    }

    clickHandler = (event: Event['mouse'], id: string) => {
        this.props.pcb(id);
    }
    

    render() {
        let _items = this.props.children.map(elt => {
            return (
                <div 
                key={elt.id} 
                className="list-group-item list-group-item-action"
                onMouseOver={event => this.btn[elt.id].className = "btn-show"}
                onMouseOut={event => this.btn[elt.id].className = "btn-hide"}
                >

                    <div className="d-flex justify-content-between">
                        <div>
                            <input className="" type="checkbox" id={"todo-item-checkbox" + elt.id} />
                            <label className="m-0 py-2" htmlFor={"todo-item-checkbox" + elt.id}>{elt.value}</label>
                        </div>
                        <div ref={r => this.btn[elt.id] = r } className="btn-hide">

                            <OptionButton 
                                onDelete={(event) => this.clickHandler(event, elt.id)}
                            />
                        </div>
                    </div>
                </div>
            );
        });

        return <div className="list-group">{_items}</div>;
    }
}


class OptionButton extends React.Component<OptionButtonProps, {}> {
    
    constructor(props: OptionButtonProps) {
        super(props)
    }

    render() {
        return (

            <div className={this.props.className}>
            
                <button key='edit'
                onClick={this.props.onEdit}
                className="btn btn-sm btn-outline-primary mr-1"
                >
                    <i className="material-icons">edit</i>
                </button>
            
                <button key='delete'
                onClick={this.props.onDelete}
                className="btn btn-sm btn-outline-danger mr-1"
                >
                    <i className="material-icons">delete</i>
                </button>
            
            </div>
        );
    }
}
