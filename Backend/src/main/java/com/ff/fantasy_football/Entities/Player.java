package com.ff.fantasy_football.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
@Entity
@Table(name = "all_teams_ucl")
public class Player {

    @Id
    @Column(name = "Index")
    private Integer index;

    @Column(name = "Player")
    private String name;

    @Column(name = "Nation")
    private String nation;

    @Column(name = "Pos")
    private String position;

    @Column(name = "Age")
    private Integer age;

    @Column(name = "MP")
    private Integer mp;

    @Column(name = "Starts")
    private Integer starts;

    @Column(name = "Min")
    private Integer min;

    @Column(name = "90s")
    private Float nineties;

    @Column(name = "Gls")
    private Integer goals;

    @Column(name = "Ast")
    private Integer assists;

    @Column(name = "G+A")
    private Integer gPlusA;

    @Column(name = "G-PK")
    private Integer gMinusPk;

    @Column(name = "PK")
    private Integer pk;

    @Column(name = "PKatt")
    private Integer pkatt;

    @Column(name = "CrdY")
    private Integer crdY;

    @Column(name = "CrdR")
    private Integer crdR;

    @Column(name = "xG")
    private Float xg;

    @Column(name = "npxG")
    private Float npxg;

    @Column(name = "xAG")
    private Float xag;

    @Column(name = "npxG+xAG")
    private Float npxgPlusXag;

    @Column(name = "PrgC")
    private Float prgC;

    @Column(name = "PrgP")
    private Float prgP;

    @Column(name = "PrgR")
    private Float prgR;

    @Column(name = "Team", length = 100)
    private String team;

}