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

    @GetMapping("/all")
    public List<Trips> displayAllTrips() {
        return tripsRepository.findAll();
    }

    @PostMapping("/add")
    public String addTrip(@RequestBody TripsFPDTO tripsFP){
        Trips trips = new Trips();
        trips.setDate(tripsFP.getDate());
        trips.setLocation(tripsFP.getLocation());
        trips.setTripName(tripsFP.getTripName());
        trips.setPlants(tripsFP.getPlants());
        trips.setNotes(tripsFP.getNotes());
        trips.setFauna(tripsFP.getFauna());
        tripsRepository.save(trips);
        return "redirect:/trip";
    }

//    @PostMapping("/add-plant")
//    public String processAddPlantForm(TripsFPDTO tripsFP, Errors errors){
//        if(!errors.hasErrors()){
//            Trips trips = tripsFP.getTrips();
//            Plants plants = tripsFP.getPlants();
//            if(!trips.getPlants().contains(plants)){
//                trips.setPlants(List<Plants> plants);
//                tripsRepository.save(trips);
//            }
//        }
//        return "redirect:/all";
//    }


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


    @PostMapping("/trips_plants")
    public String addPlants(@RequestBody Trips newTrip){
        tripsFPRepository.save(newTrip);
        return "redirect:/trip";
    }

}
