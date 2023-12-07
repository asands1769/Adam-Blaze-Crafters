package com.liftoff.trail_blazers.data;

import com.liftoff.trail_blazers.model.ParkGeocode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkGeocodeRepository extends JpaRepository<ParkGeocode, Integer> {
}
