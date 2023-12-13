package com.liftoff.trail_blazers.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Fauna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String scientificName;
    private String commonName;
    private String currentDistribution;
    private String family;
    private String status;

    public Fauna(String scientificName, String commonName, String currentDistribution, String family, String status) {
        this.scientificName = scientificName;
        this.commonName = commonName;
        this.currentDistribution = currentDistribution;
        this.family = family;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getCurrentDistribution() {
        return currentDistribution;
    }

    public void setCurrentDistribution(String currentDistribution) {
        this.currentDistribution = currentDistribution;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Fauna fauna)) return false;
        return getId() == fauna.getId();
    }

    @Override
    public int hashCode() { return Objects.hash(getId()); }

    @Override
    public String toString() { return commonName; }
}
