package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.PlantsRepository;
import com.liftoff.trail_blazers.data.TripsPlantsRepository;
import com.liftoff.trail_blazers.data.TripsRepository;
import com.liftoff.trail_blazers.model.Plants;
import com.liftoff.trail_blazers.model.Trips;
import com.liftoff.trail_blazers.model.dto.TripsPlantsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
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

    @Autowired
    private TripsPlantsRepository tripsPlantsRepository;
    @Autowired
    private PlantsRepository plantsRepository;

    @GetMapping("/all")
    public List<Trips> displayAllTrips() {
        return tripsRepository.findAll();
    }

    @PostMapping("/add")
    public String addTrip(@RequestBody TripsPlantsDTO tripsPlants){
        Trips trips = new Trips();
        trips.setDate(tripsPlants.getDate());
        trips.setLocation(tripsPlants.getLocation());
        trips.setTripName(tripsPlants.getTripName());
        trips.setPlants(tripsPlants.getPlants());
        trips.setNotes(tripsPlants.getNotes());
        tripsRepository.save(trips);
        return "redirect:/trip";
    }

//    @PostMapping("/add-plant")
//    public String processAddPlantForm(TripsPlantsDTO tripsPlants, Errors errors){
//        if(!errors.hasErrors()){
//            Trips trips = tripsPlants.getTrips();
//            Plants plants = tripsPlants.getPlants();
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
            trip.setNotes(newTrips.getNotes());
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
        tripsPlantsRepository.save(newTrip);
        return "redirect:/trip";
    }

}
