package com.company.dao;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author denbilyk
 *         Created: 6/6/16
 */
@Entity
@Table(name = "statistics")
@EqualsAndHashCode(exclude = "id")
public class ShapeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private Long id;
    @Getter
    @Setter
    private Integer calculated;
    @Getter
    @Setter
    private String type;


    public ShapeEntity() {
    }


    public ShapeEntity(String type, Integer calculated) {
        this.type = type;
        this.calculated = calculated;
    }


}
