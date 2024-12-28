package com.apple.howmuch.domain.trip;

import lombok.Data;

@Data
public class MealDto {

    private String place;

    private String description;

    private Integer averagePrice;

    private String imageURL;

    private String websiteURL;
}

