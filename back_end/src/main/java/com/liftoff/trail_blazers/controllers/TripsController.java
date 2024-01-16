package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.TripsFPRepository;
import com.liftoff.trail_blazers.data.TripsRepository;
import com.liftoff.trail_blazers.model.Trips;
import com.liftoff.trail_blazers.model.dto.TripsFPDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/trips")
public class TripsController {

    @Autowired
    private TripsRepository tripsRepository;
    @Autowired
    private TripsFPRepository tripsFPRepository;

    @GetMapping("/all/{userName}")
    public List<Trips> displayAllTrips(@PathVariable String userName) {
        return tripsRepository.findByUserName(userName);
    }

    @PostMapping("/add")
    public String addTrip(@RequestBody TripsFPDTO tripsFP){
        Trips trips = new Trips();
        trips.setDate(tripsFP.getDate());
        trips.setLocation(tripsFP.getLocation());
        trips.setTripName(tripsFP.getTripName());
        trips.setPlants(tripsFP.getPlants());
        trips.setNotes(tripsFP.getNotes());
        trips.setUserName((tripsFP.getUserName()));
        trips.setFauna(tripsFP.getFauna());
        tripsRepository.save(trips);
        return "redirect:/trip";
    }

    @PutMapping("/update/{id}")
    public Trips updateTrip(@PathVariable int id, @RequestBody Trips newTrips) {
       return tripsRepository.findById(id)
        .map(trip -> {
            trip.setTripName(newTrips.getTripName());
            trip.setLocation(newTrips.getLocation());
            trip.setDate(newTrips.getDate());
            if(newTrips.getNotes().isEmpty()){
                trip.setNotes(null);
            } else {
                trip.setNotes(newTrips.getNotes());
            }
            trip.setPlants(newTrips.getPlants());
            trip.setFauna(newTrips.getFauna());

            return tripsRepository.save(trip);
        }).orElseThrow(()-> new Error("trip not found"));
    }

    @DeleteMapping("/delete/{id}")
    public String processDeleteTrip(@PathVariable int id){
        if (!tripsRepository.existsById(id)) {
            throw new Error("Trip not found.");
        }
        tripsRepository.deleteById(id);
        return "redirect:/all";
    }

}
