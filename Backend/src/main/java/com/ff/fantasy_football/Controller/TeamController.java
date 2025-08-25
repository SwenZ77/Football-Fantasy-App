package com.ff.fantasy_football.Controller;


import com.ff.fantasy_football.Entities.Team;
import com.ff.fantasy_football.Service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;


    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/team/{teamName}")
    public List<Team> getTeamByName(@PathVariable String teamName) {
        return teamService.getTeamByName(teamName);
    }

    @GetMapping("/rank/{teamRank}")
    public List<Team> getTeamByRank(@PathVariable Integer teamRank) {
        return teamService.getTeamByRank(teamRank);
    }

    @GetMapping("/pts/{pts}")
    public List<Team> getTeamByPts(@PathVariable Integer pts) {
        return teamService.getTeamByPts(pts);
    }
}
