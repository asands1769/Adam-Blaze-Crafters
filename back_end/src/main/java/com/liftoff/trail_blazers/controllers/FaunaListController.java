package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.models.Fauna;
import com.liftoff.trail_blazers.models.data.FaunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping
public class FaunaListController {

    @Autowired
    private FaunaRepository faunaRepository;

    static HashMap<String, String> columnChoices = new HashMap<>();

    public FaunaListController () {

        columnChoices.put("scientificName", "Scientific Name");
        columnChoices.put("commonName", "Common Name");
        columnChoices.put("currentDistribution", "Lives In");
        columnChoices.put("family", "Family");
        columnChoices.put("fedListStatus", "Status");

    }

    /**
     * Returns all of the fauna data from database.
     * @return Finds all the database entries.
     */
    @GetMapping
    public List<Fauna> getAllFauna() {
        return faunaRepository.findAll();
    }







}

