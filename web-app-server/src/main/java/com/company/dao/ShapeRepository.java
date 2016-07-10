package com.company.dao;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author denbilyk
 *         Created: 6/6/16
 */
public interface ShapeRepository extends JpaRepository<ShapeEntity, Long> {

    ShapeEntity findByType(String type);

}
