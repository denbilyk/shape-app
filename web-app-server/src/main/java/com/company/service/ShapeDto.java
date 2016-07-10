package com.company.service;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.io.Serializable;

/**
 * @author denbilyk
 *         Created: 6/7/16
 */
@EqualsAndHashCode
public class ShapeDto implements Serializable {
    @Getter
    private final Double square;
    @Getter
    private final Integer calculated;
    @Getter
    private final String type;

    public ShapeDto(Double square, String type, Integer calculated) {
        this.square = square;
        this.type = type;
        this.calculated = calculated;
    }
}
