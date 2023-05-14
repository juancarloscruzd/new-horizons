package com.newhorizons.term.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String start_date;

    @Column(nullable = false)
    private String end_date;

    @Column(nullable = false)
    private String non_working_days;

    @Column(nullable = false)
    private String status;

}
