package com.liftoff.trail_blazers.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class User extends AbstractEntity {
    private String userId;

    @OneToMany(mappedBy = "user")
    private List<Trips> trips;

    public List<Trips> getTrips() {
        return trips;
    }

    public void setTrips(List<Trips> trips) {
        this.trips = trips;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
