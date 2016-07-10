import React from "react";
import Panel from "react-bootstrap/lib/panel";
import Popover from "react-bootstrap/lib/popover";
import OverlayTrigger from "react-bootstrap/lib/overlaytrigger";
import Button from "react-bootstrap/lib/button";
import FormControl from "react-bootstrap/lib/formcontrol";
import Form from "react-bootstrap/lib/form";


export default (context) => {
    let self = context;
    var tooltip = (
        <Popover id="pop_rect">
            <Form>
                <strong>Width: </strong>
                <FormControl name="width" type="text" bsSize="small" onChange={self.onInputChange.bind(self)}/>
                <strong>Height: </strong>
                <FormControl name="height" type="text" bsSize="small" onChange={self.onInputChange.bind(self)}/>
                <Button onClick={self.onRectSubmit.bind(self)}>Submit</Button>
            </Form>
        </Popover>
    );
    return (
        <div>
            <div className="rect-container">
                <OverlayTrigger placement="right" overlay={tooltip} trigger="click" rootClose>
                    <canvas id="rect" width="170" height="150"></canvas>
                </OverlayTrigger>
            </div>
            <div className="stat-table">
                <ul>
                    <li>Width: {self.stat.width}</li>
                    <li>Height: {self.stat.height}</li>
                    <li>Square: {self.stat.square}</li>
                    <li>Calculated: {self.stat.calculated}</li>
                </ul>
            </div>
        </div>
    );
}