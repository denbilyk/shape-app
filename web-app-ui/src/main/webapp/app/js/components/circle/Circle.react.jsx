import React from "react";
import {render} from "react-dom";
import tpl from "./Circle.jsx";
import "./Circle.scss";
import ShapesStore from "../../store/ShapesStore.jsx";
import ShapesApi from "../../actions/ShapesApi.jsx";


export default class Circle extends React.Component {

    constructor(props) {
        super(props);
        String.prototype.isNumber = function () {
            return /^\d+$/.test(this);
        };

        this.stat = {};
        this.stat.diameter = 0;
        this.stat.square = 0;
        this.stat.calculated = 0;
    }


    componentWillMount() {
        this.dataUpdateListener = this.onDataUpdate.bind(this);
        ShapesStore.addDataReloadListener(this.dataUpdateListener);
    }

    componentWillUnmount() {
        ShapesStore.removeDataReloadListener(this.dataUpdateListener);
    }

    componentDidMount() {
        this.drawCircle();
    }

    onDataUpdate() {
        let data = ShapesStore.getCircleData();
        this.stat.square = data.square ? data.square.toFixed(3) : data.square;
        this.stat.calculated = data.calculated;
        this.setState({stat: this.stat});
    }

    drawCircle() {
        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(75, 75, 75, 0, 360);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    onCircleSubmit() {
        if (this.stat.diameter < 1) return;
        let data = {};
        data.diameter = this.stat.diameter;
        data.type = "circle".toUpperCase();
        ShapesApi.calculateCircle(data);
    }

    onInputChange(e) {
        if (e.target.value.isNumber()) {
            this.stat.diameter = parseInt(e.target.value);
        } else {
            alert("Only digits!");
            e.target.value = "";
        }
    }

    render() {
        return tpl(this);
    }


}