package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.ParksRepository;
import com.liftoff.trail_blazers.model.Parks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ParksController {

    @Autowired
    private ParksRepository parksRepository;

    @GetMapping("/parks")
    List<Parks> displayAllParks(){
        return parksRepository.findAll();
    }

}
