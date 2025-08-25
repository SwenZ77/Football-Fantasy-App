package com.ff.fantasy_football.Repository;

import com.ff.fantasy_football.Entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface PlayerRepo extends JpaRepository<Player,Integer> {
    Player deleteByName(String playerName);
    Optional<Player> findByName(String playerName);
    List<Player> findByTeam(String teamName);

}
