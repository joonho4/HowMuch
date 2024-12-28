package com.apple.howmuch.domain.trip;

import lombok.Data;

@Data
public class ActivityDto {

    private String activityName;

    private String description;

    private String imageURL;

    private String websiteURL;
}