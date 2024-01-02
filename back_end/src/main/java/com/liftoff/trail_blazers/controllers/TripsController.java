package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.TripsRepository;
import com.liftoff.trail_blazers.model.Trips;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("trips")
public class TripsController {

    @Autowired
    private TripsRepository tripsRepository;

    @GetMapping("")
    List<Trips> displayAllTrips() {return tripsRepository.findAll();}

    @PostMapping("/add")
    public String addTrip(@RequestBody Trips newTrip){
        tripsRepository.save(newTrip);
        return "redirect:/trip";
    }

}
