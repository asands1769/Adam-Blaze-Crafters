package com.liftoff.trail_blazers.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.util.Objects;

@Entity
public class Geolocations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private double longitude;
    private double latitude;
    private String park_type;
    private String url;
    private String short_name;

    public Geolocations(){}

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public String getPark_type() {
        return park_type;
    }

    public String getUrl() {
        return url;
    }

    public String getShort_name() {
        return short_name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Geolocations geolocations)) return false;
        return id == geolocations.id && Double.compare(longitude, geolocations.longitude) == 0 && Double.compare(latitude, geolocations.latitude) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, longitude, latitude);
    }

    @Override
    public String toString() {
        return name;
    }
}
