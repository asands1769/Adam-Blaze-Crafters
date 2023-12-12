package com.liftoff.trail_blazers.models.data;

import com.liftoff.trail_blazers.models.Fauna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaunaRepository extends JpaRepository<Fauna, String> {
}
