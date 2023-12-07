package com.liftoff.trail_blazers.data;

import com.liftoff.trail_blazers.model.Parks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParksRepository extends JpaRepository<Parks, Integer> {
}
