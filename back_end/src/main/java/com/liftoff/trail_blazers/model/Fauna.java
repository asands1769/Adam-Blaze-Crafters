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
    private String commonName;
    private String currentDistribution;
    private String family;
    private String scientificName;
    private String status;
    private String image;

    public Fauna (){}

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
