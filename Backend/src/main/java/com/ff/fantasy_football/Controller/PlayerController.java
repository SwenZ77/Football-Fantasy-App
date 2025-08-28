package com.ff.fantasy_football.Controller;

import com.ff.fantasy_football.Entities.Player;
import com.ff.fantasy_football.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "${cors.allowed-origins}")
@RestController
@RequestMapping("api/v1/players")
public class PlayerController {
    @Autowired
    private PlayerService service;

    @GetMapping
    private List<Player> getPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String nation,
            @RequestParam(required = false) String position
    ){
        if(team!=null && position!= null)
            return service.getPlayersByTeamAndPosi(team,position);
        if(nation!=null && position!= null)
            return service.getPlayersByNationAndPosi(nation,position);
        else if (name!= null)
            return service.getPlayersByName(name);
        else if (team!= null)
            return service.getPlayersByTeam(team);
        else if (nation!= null)
            return service.getPlayersByNation(nation);
        else if (position!= null)
            return service.getPlayersByPosi(position);
        return service.getAllPlayers();
    }

//    @PostMapping
//    private ResponseEntity<Player> addNewPlayer(
//            @RequestParam Player player
//    ){
//        return new ResponseEntity<>(service.addPlayer(player), HttpStatus.CREATED);
//    }
//
//    @PutMapping
//    private ResponseEntity<Player> updatePlayer(
//            @RequestParam(required = true) Player player
//    ){
//        return new ResponseEntity<>(service.updatePlayer(player), HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{playerName}")
//    private ResponseEntity<Player> deletePlayer(
//            @RequestParam String playerName
//    ){
//        return new ResponseEntity<>(service.deletePlayer(playerName),HttpStatus.OK);
//    }
}
