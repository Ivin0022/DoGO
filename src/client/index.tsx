import * as React from "react";
import * as ReactDOM from "react-dom";

interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>hi {this.props.compiler} and {this.props.framework}!</h1>;
    }
}



ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);