package com.apple.howmuch.domain.trip;

import lombok.Data;

@Data
public class DayPlanDto {
    private ActivityDto morningActivity;
    private MealDto lunch;
    private ActivityDto afternoonActivity;
    private MealDto dinner;
    private AccommodationDto accommodation;
}
