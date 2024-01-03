package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.TripsRepository;
import com.liftoff.trail_blazers.model.Trips;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.AttributeNotFoundException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/trips")
public class TripsController {

    @Autowired
    private TripsRepository tripsRepository;

    @GetMapping("/all")
    List<Trips> displayAllTrips() {return tripsRepository.findAll();}

//    @GetMapping("/{id}")
//    Optional<Trips> getTripsById(@PathVariable Integer id){
//        return tripsRepository.findById(id);
//    }

    @PostMapping("/add")
    public String addTrip(@RequestBody Trips newTrip){
        tripsRepository.save(newTrip);
        return "redirect:/trip";
    }

    @PutMapping("/update/{id}")
    public Trips updateTrip(@PathVariable int id, @RequestBody Trips newTrips) {
       return tripsRepository.findById(id)
        .map(trip -> {
            trip.setTripName(newTrips.getTripName());
            trip.setLocation(newTrips.getLocation());
            trip.setDate(newTrips.getDate());
            trip.setNotes(newTrips.getNotes());
            return tripsRepository.save(trip);
        }).orElseThrow(()-> new Error("trip not found"));
    }

    @DeleteMapping("/delete/{id}")
    public String processDeleteTrip(@PathVariable int id){
        if (!tripsRepository.existsById(id)) {
            throw new RuntimeException();
        }
        tripsRepository.deleteById(id);
        return "redirect:/all";
    }


}
