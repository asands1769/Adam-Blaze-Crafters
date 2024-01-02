package com.liftoff.trail_blazers.data;

import com.liftoff.trail_blazers.model.Trips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripsRepository extends JpaRepository<Trips, Integer> {

}
