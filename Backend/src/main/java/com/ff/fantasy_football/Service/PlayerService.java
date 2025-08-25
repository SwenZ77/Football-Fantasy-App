package com.ff.fantasy_football.Service;


import com.ff.fantasy_football.Entities.Player;
import com.ff.fantasy_football.Repository.PlayerRepo;
import jakarta.transaction.Transactional;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {
    @Autowired
    public PlayerRepo playerRepo;


    // get all players
    public List<Player> getAllPlayers(){
        return playerRepo.findAll();
    }

    // get all players by team
    public List<Player> getPlayersByTeam(String teamName){
        return playerRepo.findAll().stream()
                .filter(player -> player.getTeam().toLowerCase().contains(teamName.toLowerCase()))
                .collect(Collectors.toList());
    }

    // get all players by name
    public List<Player> getPlayersByName(String playerName){
        return playerRepo.findAll().stream()
                .filter(player -> player.getName().toLowerCase().contains(playerName.toLowerCase()))
                .collect(Collectors.toList());
    }

    // get all players by position
    public List<Player> getPlayersByPosi(String posi){
        return playerRepo.findAll().stream()
                .filter(player -> player.getPosition().toLowerCase().contains(posi.toLowerCase()))
                .collect(Collectors.toList());
    }

    // get all players by nation
    public List<Player> getPlayersByNation(String nation){
        return playerRepo.findAll().stream()
                .filter(player -> player.getNation().toLowerCase().contains(nation.toLowerCase()))
                .collect(Collectors.toList());
    }

    // get all players by age
    public List<Player> getPlayersByAge(Integer age){
        return playerRepo.findAll().stream()
                .filter(player -> player.getAge().equals(age))
                .collect(Collectors.toList());
    }

    // get all players by team and posi
    public List<Player> getPlayersByTeamAndPosi(String team, String posi){
        return playerRepo.findAll().stream()
                .filter(player -> player.getTeam().toLowerCase().contains(team.toLowerCase()) && player.getPosition().toLowerCase().contains(posi.toLowerCase()))
                .collect(Collectors.toList());
    }

    // get all players by nation and posi
    public List<Player> getPlayersByNationAndPosi(String nation, String posi){
        return playerRepo.findAll().stream()
                .filter(player -> player.getNation().toLowerCase().contains(nation.toLowerCase()) && player.getPosition().toLowerCase().contains(posi.toLowerCase()))
                .collect(Collectors.toList());
    }

    // adding a new player
    public Player addPlayer(Player player){
        return playerRepo.save(player);
    }

    // update a player
    public Player updatePlayer(Player newPlayer){
        Optional<Player> p = playerRepo.findByName(newPlayer.getName());
        if(p.isPresent()){
            Player player = p.get();
            playerRepo.delete(player);
            return playerRepo.save(newPlayer);
        }
        return null;
    }

    // delete a player
    @Transactional
    public Player deletePlayer(String playerName){
        return playerRepo.deleteByName(playerName);
    }
}
