package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.model.Fauna;
import com.liftoff.trail_blazers.data.FaunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class FaunaListController {

    @Autowired
    private FaunaRepository faunaRepository;

    @GetMapping("/animals")
    public List<Fauna> getAllFauna() {
        return faunaRepository.findAll();
    }

}

