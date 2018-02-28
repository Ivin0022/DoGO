import * as React from 'react';


export interface Event {
    click: React.MouseEvent<HTMLButtonElement>;
}

export interface ItemsPorps {
    children: Array<{id?: string, value?: string}>;
    pcb: Function;
}

export interface ItemsState {
    btnHide: string;
}

export class ListItems extends React.Component<ItemsPorps, ItemsState> {

    constructor(props: ItemsPorps) {
        super(props);
        this.state = {
            btnHide: ''
        }
    }

    clickHandler = (event: Event['click'], id?: string) => {
        this.props.pcb(id);
    }

    render() {

        let _items = this.props.children.map(elt => {
            return (
                <li key={elt.id} className="items">
                    {elt.value}
                  
                    <button
                    key={elt.id}
                    onClick={event => this.clickHandler(event, elt.id)}
                    >
                    Delete
                    </button>
                </li>
            );
        });

        return <ul className="items-contaneir">{_items}</ul>;
    }
}
