package com.company.web;

import com.company.service.ShapeDto;
import com.company.service.ShapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * @author denbilyk
 *         Created: 6/6/16
 */
@RestController
@RequestMapping("/")
public class WebAppController {

    @Autowired
    private ShapeService service;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Collection<ShapeDto> getStatistics() {
        return service.getStatistics();
    }

    @RequestMapping(path = "/circle", method = RequestMethod.POST)
    @ResponseBody
    public ShapeDto calculateCircle(@RequestBody CircleParameters params) {
        return service.processCircle(params);
    }

    @RequestMapping(path = "/rect", method = RequestMethod.POST)
    @ResponseBody
    public ShapeDto calculateRect(@RequestBody RectParameters params) {
        return service.processRect(params);
    }

}
