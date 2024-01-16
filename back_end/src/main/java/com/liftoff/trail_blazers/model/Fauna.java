package com.liftoff.trail_blazers.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Fauna extends AbstractEntity{

    private String scientificName;
    private String commonName;
    private String currentDistribution;
    private String family;
    private String status;
    private String image;
    private String photoCredit;

    @ManyToMany (mappedBy = "fauna")
    @JsonBackReference
    private List<Trips> trips = new ArrayList<>();

    public Fauna (){}

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

    public String getPhotoCredit() {
        return photoCredit;
    }

    public void setPhotoCredit(String photoCredit) {
        this.photoCredit = photoCredit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Fauna fauna)) return false;
        return getId() == fauna.getId();
    }

    public List<Trips> getTrips() {
        return trips;
    }

    @Override
    public String toString() { return commonName; }
}
