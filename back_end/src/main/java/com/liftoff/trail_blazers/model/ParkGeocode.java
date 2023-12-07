package com.liftoff.trail_blazers.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class ParkGeocode {

    @Id
    private int id;
    private String name;
    private double longitude;
    private double lat;
    private String park_type;

    public ParkGeocode(){}

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLat() {
        return lat;
    }

    public String getPark_type() {
        return park_type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ParkGeocode parkGeocode)) return false;
        return id == parkGeocode.id && Double.compare(longitude, parkGeocode.longitude) == 0 && Double.compare(lat, parkGeocode.lat) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, longitude, lat);
    }

    @Override
    public String toString() {
        return name;
    }
}
