package com.liftoff.trail_blazers.model.dto;

import com.liftoff.trail_blazers.model.Plants;
import com.liftoff.trail_blazers.model.Trips;

public class TripsPlantsDTO {

    private Trips trips;
    private Plants plants;

    public TripsPlantsDTO(){}

    public Trips getTrips() {
        return trips;
    }

    public void setTrips(Trips trips) {
        this.trips = trips;
    }

    public Plants getPlants() {
        return plants;
    }

    public void setPlants(Plants plants) {
        this.plants = plants;
    }
}
