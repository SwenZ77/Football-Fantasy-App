package com.ff.fantasy_football.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "standing")
public class Team {

    @Column(name = "Rk")
    private Integer rk;

    @Id
    @Column(name = "Squad", columnDefinition = "text")
    private String name;

    @Column(name = "MP")
    private Integer mp;

    @Column(name = "W")
    private Integer w;

    @Column(name = "D")
    private Integer d;

    @Column(name = "L")
    private Integer l;

    @Column(name = "GF")
    private Integer gf;

    @Column(name = "GA")
    private Integer ga;

    @Column(name = "GD", columnDefinition = "text")
    private String gd;

    @Column(name = "Pts")
    private Integer pts;

    @Column(name = "xG")
    private Double xg;

    @Column(name = "xGA")
    private Double xga;

    @Column(name = "xGD", columnDefinition = "text")
    private String xgd;

    @Column(name = "xGD/90", columnDefinition = "text")
    private String xgdPer90;
}
