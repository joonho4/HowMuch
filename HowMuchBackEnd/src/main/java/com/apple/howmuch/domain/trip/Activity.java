package com.apple.howmuch.domain.trip;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    private String activityName;

    private String description;

    private String imageURL;

    private String websiteURL;
}