package com.liftoff.trail_blazers.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Plants extends AbstractEntity {

    private String scientificName;
    private String commonName;
    private String currentDistribution;
    private String family;
    private String federalListingStatus;
    private String image;
    private String photoCredit;

    @ManyToMany(mappedBy = "plants")
    @JsonBackReference
    private List<Trips> trips = new ArrayList<>();

    public Plants(){}

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

    public String getImage() {
        return image;
    }

    public String getPhotoCredit(){
        return photoCredit;
    }

    public List<Trips> getTrips() {
        return trips;
    }

    @Override
    public String toString() {
        return commonName;
    }
}
