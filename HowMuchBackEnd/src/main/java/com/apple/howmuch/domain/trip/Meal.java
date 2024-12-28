package com.apple.howmuch.domain.trip;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mealId;

    private String place;

    private String description;

    private Integer averagePrice;

    private String imageURL;

    private String websiteURL;
}