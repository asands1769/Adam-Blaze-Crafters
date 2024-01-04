package com.liftoff.trail_blazers.data;

import com.liftoff.trail_blazers.model.Trips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripsPlantsRepository extends JpaRepository<Trips, Integer> {
}
