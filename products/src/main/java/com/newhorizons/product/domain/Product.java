package com.newhorizons.product.domain;


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
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String edition;

    @Column(nullable = false)
    private String code; // Autogenerado: type|mode|first_letter_name|edition

    @Column(nullable = false)
    private Float theoretical_hours; // Horas Cronologicas

    @Column(nullable = false)
    private Float practical_hours; // Horas Academicas

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String mode;

    @Column(nullable = false)
    private Float price;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Boolean available;

}
