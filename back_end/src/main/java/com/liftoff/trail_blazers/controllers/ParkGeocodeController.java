package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.ParkGeocodeRepository;
import com.liftoff.trail_blazers.model.ParkGeocode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ParkGeocodeController {

    @Autowired
    private ParkGeocodeRepository parkGeocodeRepository;

    @GetMapping("/parks")
    List<ParkGeocode> displayAllParks(){
        return parkGeocodeRepository.findAll();
    }

}
