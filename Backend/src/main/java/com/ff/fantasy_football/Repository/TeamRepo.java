package com.ff.fantasy_football.Repository;

import com.ff.fantasy_football.Entities.Player;
import com.ff.fantasy_football.Entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface TeamRepo extends JpaRepository<Team,String> {
}
