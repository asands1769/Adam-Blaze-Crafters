package com.liftoff.trail_blazers.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Trips extends AbstractEntity {

    private String tripName;
    private String location;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    private String notes;
    private String userName;

    @ManyToMany
    private List<Plants> plants = new ArrayList<>();

    @ManyToMany
    private List<Fauna> fauna = new ArrayList<>();

    public Trips(String tripName, String location, Date date, String notes, List<Plants> plants, List<Fauna> fauna, String userName) {
        this.tripName = tripName;
        this.location = location;
        this.date = date;
        this.notes = notes;
        this.plants = plants;
        this.fauna = fauna;
        this.userName = userName;
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

    public List<Plants> getPlants() {return plants;}

    public void setPlants(List<Plants> plants) {
        this.plants = plants;
    }

    public List<Fauna> getFauna() {
        return fauna;
    }

    public void setFauna(List<Fauna> fauna) {
        this.fauna = fauna;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return tripName;
    }

}
