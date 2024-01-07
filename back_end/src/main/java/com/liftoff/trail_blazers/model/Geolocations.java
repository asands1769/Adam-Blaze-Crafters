package com.liftoff.trail_blazers.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.util.Objects;

@Entity
public class Geolocations extends AbstractEntity {

    private String name;
    private double longitude;
    private double latitude;
    private String park_type;
    private String url;
    private String short_name;

    public Geolocations(){}

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
    public String toString() {
        return name;
    }
}
