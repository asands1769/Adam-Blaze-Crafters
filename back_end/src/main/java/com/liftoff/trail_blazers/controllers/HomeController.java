package com.liftoff.trail_blazers.controllers;

import com.liftoff.trail_blazers.models.data.FaunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @Autowired
    private FaunaRepository faunaRepository;

    @RequestMapping("/")
    public String index(Model model){
        model.addAttribute("title", "Fauna");
        model.addAttribute("fauna", faunaRepository.findAll());

        return "index";
    }


}
