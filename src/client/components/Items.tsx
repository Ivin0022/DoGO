import * as React from 'react';


export interface Event {
    click: React.MouseEvent<HTMLLIElement>;
}

export interface ItemsPorps {
    children: Array<string>;
}

export class ListItems extends React.Component<ItemsPorps, {}> {

    constructor(props: ItemsPorps) {
        super(props);
    }

    clickHandler = (event: Event['click'], index: number) => {
        console.log(index);
        console.log(event.target);
    }

    render() {

        let _items = this.props.children.map((elt, index) => {
            return (
                <li key={index}
                    onClick={event => this.clickHandler(event, index)}
                    className="items"
                >
                    {elt}
                </li>
            );
        });

        return <ul className="items-contaneir">{_items}</ul>;
    }
}
