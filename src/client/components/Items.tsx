import * as React from 'react';

export interface ItemsPorps {
    children: Array<string>;
}

export class ListItems extends React.Component<ItemsPorps, {}> {

    constructor(props: ItemsPorps) {
        super(props);
    }

    render() {

        let _items = this.props.children.map((elt, index) => {
            return <li key={index}>{elt}</li>;
        });

        return <ul>{_items}</ul>;
    }
}