package com.company.service;

import com.company.config.Shapes;
import com.company.dao.ShapeEntity;
import com.company.dao.ShapeRepository;
import com.company.web.CircleParameters;
import com.company.web.RectParameters;
import com.google.common.collect.Collections2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

/**
 * @author denbilyk
 *         Created: 6/6/16
 */
@Service
public class ShapeService {

    @Autowired
    private ShapeRepository repository;

    public Collection<ShapeDto> getStatistics() {
        List<ShapeEntity> entityList = repository.findAll();
        return Collections2.transform(entityList, shapeEntity -> new ShapeDto(0D, shapeEntity.getType(), shapeEntity.getCalculated()));
    }

    public ShapeDto processCircle(CircleParameters params) {
        Integer diameter = params.getDiameter();
        Double square = Math.PI * Math.pow(diameter, 2) / 4;
        String type = Shapes.CIRCLE.name();
        return processEntity(square, type);
    }


    public ShapeDto processRect(RectParameters params) {
        Integer width = params.getWidth();
        Integer height = params.getHeight();
        Double square = (double) (width * height);
        String type = Shapes.RECT.name();
        return processEntity(square, type);
    }

    private ShapeDto processEntity(Double square, String type) {
        ShapeEntity shapeEntity = repository.findByType(type);
        if (shapeEntity == null) {
            ShapeEntity newEntity = new ShapeEntity(type, 1);
            repository.save(newEntity);
            return new ShapeDto(square, type, 1);
        }
        Integer calculated = shapeEntity.getCalculated() + 1;
        shapeEntity.setCalculated(calculated);
        repository.save(shapeEntity);
        return new ShapeDto(square, type, calculated);
    }
}
