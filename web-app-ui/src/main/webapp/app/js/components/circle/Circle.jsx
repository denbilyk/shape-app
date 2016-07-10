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
        <Popover id="pop_circle">
            <strong>Diameter: </strong>
            <Form inline>
                <FormControl id="diameter-text" type="text" bsSize="small" onChange={self.onInputChange.bind(self)}/>
                <Button onClick={self.onCircleSubmit.bind(self)}>Submit</Button>
            </Form>
        </Popover>
    );
    return (
        <div>
            <div className="circle-container">
                <OverlayTrigger placement="right" overlay={tooltip} trigger="click" rootClose>
                    <canvas id="circle" width="150" height="150"></canvas>
                </OverlayTrigger>
            </div>
            <div className="stat-table">
                <ul>
                    <li>Diameter: {self.stat.diameter}</li>
                    <li>Square: {self.stat.square}</li>
                    <li>Calculated: {self.stat.calculated}</li>
                </ul>
            </div>
        </div>
    );
}