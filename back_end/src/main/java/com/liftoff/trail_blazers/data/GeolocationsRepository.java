package com.liftoff.trail_blazers.data;

import com.liftoff.trail_blazers.model.Geolocations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeolocationsRepository extends JpaRepository<Geolocations, Integer> {

}
