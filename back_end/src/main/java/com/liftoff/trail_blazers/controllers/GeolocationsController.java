package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.GeolocationsRepository;
import com.liftoff.trail_blazers.model.Geolocations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class GeolocationsController {

    @Autowired
    private GeolocationsRepository geolocationsRepository;

    @GetMapping("/parks")
    List<Geolocations> displayAllParks(){
        return geolocationsRepository.findAll();
    }

}
