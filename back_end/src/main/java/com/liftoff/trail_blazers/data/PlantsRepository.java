package com.liftoff.trail_blazers.data;

import com.liftoff.trail_blazers.model.Plants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantsRepository extends JpaRepository<Plants, Integer> {

}
