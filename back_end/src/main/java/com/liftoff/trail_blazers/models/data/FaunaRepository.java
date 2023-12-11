package com.liftoff.trail_blazers.models.data;

import com.liftoff.trail_blazers.models.Fauna;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaunaRepository extends CrudRepository<Fauna, String> {
}
