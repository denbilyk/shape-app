package com.company.web;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author denbilyk
 *         Created: 6/7/16
 */
@EqualsAndHashCode(callSuper = true)
public class RectParameters extends ShapeParameters {

    @Getter
    @Setter
    private Integer width;

    @Getter
    @Setter
    private Integer height;


}
