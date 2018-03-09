import * as React from 'react';


export interface Event {
    mouse: React.MouseEvent<HTMLButtonElement>;
}

export interface ItemsPorps {
    children: Array<{id: string, value: string}>;
    onItemDelete: Function;
    onItemEdit?: Function;
}

export interface ItemsState {

}

export interface OptionButtonProps {
    onDelete: (event: Event['mouse']) => void;
    onEdit?: (event: Event['mouse']) => void;
    className?: string;
}

export class ListItems extends React.Component<ItemsPorps, ItemsState> {

    private btn:  { [index: string]: HTMLDivElement | null};
    private label:  { [index: string]: HTMLLabelElement | null};

    constructor(props: ItemsPorps) {
        super(props);

        this.btn = {};
        this.label = {};
    }
    

    render() {
        let _items = this.props.children.map(elt => {
            return (
                <li 
                key={elt.id} 
                className="list-group-item list-group-item-ac"
                onMouseOver={event => this.btn[elt.id].className = "btn-show"}
                onMouseOut={event => this.btn[elt.id].className = "btn-hide"}
                >

                    <div className="d-flex justify-content-between">
                        <div>
                            <input 
                            className="" 
                            type="checkbox" 
                            id={"todo-item-checkbox" + elt.id} 
                            onChange={e => this.label[elt.id].className = e.target.checked ? "m-0 py-2 strike" : "m-0 py-2"}
                            />
                            <label 
                            className="m-0 py-2" 
                            style={{fontSize: 18}}
                            ref={r => this.label[elt.id] = r}
                            htmlFor={"todo-item-checkbox" + elt.id}>
                                {elt.value}
                            </label>
                        </div>
                        <div className="btn-hide" ref={r => this.btn[elt.id] = r } >
                            <OptionButton 
                                onDelete={() => this.props.onItemDelete(elt.id)}
                            />
                        </div>
                    </div>
                </li>
            );
        });

        return <u className="list-group list-group-flush">{_items}</u>;
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
