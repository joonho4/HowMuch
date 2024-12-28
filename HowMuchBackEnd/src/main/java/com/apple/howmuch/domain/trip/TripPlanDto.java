package com.apple.howmuch.domain.trip;

import lombok.Data;

import java.util.List;

@Data
public class TripPlanDto {
    private List<DayPlanDto> dayPlans;
    private int totalExpense;
}

