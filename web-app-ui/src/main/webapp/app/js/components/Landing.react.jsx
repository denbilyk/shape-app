import React from "react";
import {render} from "react-dom";
import Circle from "./circle/Circle.react.jsx";
import Rect from "./rect/Rect.react.jsx";
import ShapesApi from "../actions/ShapesApi.jsx";


export default class Landing extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ShapesApi.getShapesData();
    }

    render() {
        return (
            <div className="main">
                <Circle/>
                <Rect/>
            </div>
        );
    }
}


