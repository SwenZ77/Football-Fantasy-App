package com.ff.fantasy_football.Service;


import com.ff.fantasy_football.Entities.Team;
import com.ff.fantasy_football.Repository.TeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {
    @Autowired
    private TeamRepo repo;

    // get all teams
    public List<Team> getAllTeams(){
        return repo.findAll();
    }

    // get all teams by name
    public List<Team> getTeamByName(String teamName){
        return repo.findAll().stream()
                .filter(team -> team.getName().toLowerCase().contains(teamName.toLowerCase()))
                .collect(Collectors.toList());
    }

    // get all teams by ranks
    public List<Team> getTeamByRank(Integer rank){
        return repo.findAll().stream()
                .filter(team -> team.getRk().equals(rank))
                .collect(Collectors.toList());
    }

    // get all teams by points
    public List<Team> getTeamByPts(Integer pts){
        return repo.findAll().stream()
                .filter(team -> team.getPts().equals(pts))
                .collect(Collectors.toList());
    }

}
