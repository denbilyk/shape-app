import React from "react";
import {render} from "react-dom";
import tpl from "./Rect.jsx";
import ShapesStore from "../../store/ShapesStore.jsx";
import ShapesApi from "../../actions/ShapesApi.jsx";
import "./Rect.scss";


export default class Rect extends React.Component {

    constructor(props) {
        super(props);
        String.prototype.isNumber = function () {
            return /^\d+$/.test(this);
        };

        this.stat = {};
        this.stat.width = 0;
        this.stat.height = 0;
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
        this.drawRect();
    }


    drawRect() {
        var c = document.getElementById("rect");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.rect(0, 0, 170, 150);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }


    onDataUpdate() {
        let data = ShapesStore.getRectData();
        this.stat.square = data.square ? data.square.toFixed(3) : data.square;
        this.stat.calculated = data.calculated;
        this.setState({stat: this.stat});
    }

    onRectSubmit() {
        if (this.stat.width < 1 || this.stat.height < 1) return;
        let data = {};
        data.width = this.stat.width;
        data.height = this.stat.height;
        data.type = "rect".toUpperCase();
        ShapesApi.calculateRect(data);
    }

    onInputChange(e) {
        if (e.target.value.isNumber()) {
            switch (e.target.name) {
                case 'width':
                    this.stat.width = parseInt(e.target.value);
                    break;
                case 'height':
                    this.stat.height = parseInt(e.target.value);
                    break;
            }
        } else {
            alert("Only digits!");
            e.target.value = "";
        }
    }

    render() {
        return tpl(this);
    }


}