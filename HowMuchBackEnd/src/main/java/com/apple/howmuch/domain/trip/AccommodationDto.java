package com.apple.howmuch.domain.trip;

import lombok.Data;

@Data
public class AccommodationDto {

    private String name;

    private String description;

    private String imageURL;

    private String websiteURL;
}