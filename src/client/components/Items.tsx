import * as React from 'react';

export interface ItemsPorps {
    items: Array<string>;
}

export class ListItems extends React.Component<ItemsPorps, {}> {

    constructor(props: ItemsPorps) {
        super(props);
    }

    render() {

        let _items = [];

        for (let i of this.props.items) {
            _items.push(<li key={i}>{i}</li>);
        }

        return <ul>{_items}</ul>;
    }
}