package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.data.PlantsRepository;
import com.liftoff.trail_blazers.model.Plants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class PlantsController {

    @Autowired
    private PlantsRepository plantsRepository;

    @GetMapping("/plants")
    List<Plants> displayAllPlants() {return plantsRepository.findAll();}
}
