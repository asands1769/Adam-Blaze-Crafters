package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.model.Fauna;
import com.liftoff.trail_blazers.data.FaunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping
public class FaunaListController {

    @Autowired
    private FaunaRepository faunaRepository;

    @GetMapping
    public List<Fauna> getAllFauna() {
        return faunaRepository.findAll();
    }

}

