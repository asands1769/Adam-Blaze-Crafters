package com.liftoff.trail_blazers.controllers;
import com.liftoff.trail_blazers.data.UserRepository;
import com.liftoff.trail_blazers.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userRepository.save(user);
        return ResponseEntity.ok(newUser);
    }
}

