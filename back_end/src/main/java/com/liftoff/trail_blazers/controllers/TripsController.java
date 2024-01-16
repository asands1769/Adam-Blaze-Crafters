package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.PlantsRepository;
import com.liftoff.trail_blazers.data.TripsPlantsRepository;
import com.liftoff.trail_blazers.data.TripsRepository;
import com.liftoff.trail_blazers.model.Trips;
import com.liftoff.trail_blazers.model.dto.TripsPlantsDTO;
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
    private TripsPlantsRepository tripsPlantsRepository;
    @Autowired
    private PlantsRepository plantsRepository;

    @GetMapping("/all/{userName}")
    public List<Trips> displayAllTrips(@PathVariable String userName) {
        return tripsRepository.findByUserName(userName);
    }

    @PostMapping("/add")
    public String addTrip(@RequestBody TripsPlantsDTO tripsPlants){
        Trips trips = new Trips();
        trips.setDate(tripsPlants.getDate());
        trips.setLocation(tripsPlants.getLocation());
        trips.setTripName(tripsPlants.getTripName());
        trips.setPlants(tripsPlants.getPlants());
        trips.setNotes(tripsPlants.getNotes());
        trips.setUserName((tripsPlants.getUserName()));
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
            if(newTrips.getNotes().isEmpty()){
                trip.setNotes(null);
            } else {
                trip.setNotes(newTrips.getNotes());
            }
            trip.setPlants(newTrips.getPlants());
            trip.setUserName(newTrips.getUserName());

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
