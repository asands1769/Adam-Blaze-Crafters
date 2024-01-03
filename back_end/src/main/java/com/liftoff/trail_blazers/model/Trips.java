package com.liftoff.trail_blazers.model;

import jakarta.persistence.Entity;
//import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Trips extends AbstractEntity {

    private String tripName;
    private String location;
    private Date date;
    private String notes;


//    THIS PROPERTY WILL BE SET ONCE WE FETCH THE USERNAME FROM REACT SIDE
//    @ManyToOne
//    private User username;

//    @ManyToMany
//    private final List<Plants> plants = new ArrayList<>();

    public Trips(String tripName, String location, Date date, String notes) {
        this.tripName = tripName;
        this.location = location;
        this.date = date;
        this.notes = notes;
    }

    public Trips() {}

    public String getTripName() {
        return tripName;
    }

    public void setTripName(String tripName) {
        this.tripName = tripName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

//    public List<Plants> getPlants() {return plants;}
//
//    public void addPlant(Plants plant) {this.plants.add(plant);}

    @Override
    public String toString() {
        return tripName;
    }

}
