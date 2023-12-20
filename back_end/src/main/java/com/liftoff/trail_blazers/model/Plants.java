package com.liftoff.trail_blazers.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Plants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String scientificName;
    private String commonName;
    private String currentDistribution;
    private String family;
    private String federalListingStatus;

    public Plants(){}

    public int getId() {
        return id;
    }

    public String getScientificName() {
        return scientificName;
    }

    public String getCommonName() {
        return commonName;
    }

    public String getCurrentDistribution() {
        return currentDistribution;
    }

    public String getFamily() {
        return family;
    }

    public String getFederalListingStatus() {
        return federalListingStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Plants plants)) return false;
        return id == plants.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return commonName;
    }
}
