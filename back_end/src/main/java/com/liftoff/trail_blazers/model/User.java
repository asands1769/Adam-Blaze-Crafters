//package com.liftoff.trail_blazers.model;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.OneToMany;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//public class User extends AbstractEntity {
//    private String userId;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonBackReference
//    private List<Trips> trips = new ArrayList<>();
//
//    public List<Trips> getTrips() {
//        return trips;
//    }
//
//    public String getUserId() {
//        return userId;
//    }
//
//    public void setUserId(String userId) {
//        this.userId = userId;
//    }
//
//    @Override
//    public String toString() {
//        return userId;
//    }
//}
