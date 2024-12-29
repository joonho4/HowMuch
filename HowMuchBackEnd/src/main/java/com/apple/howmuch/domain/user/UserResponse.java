package com.apple.howmuch.domain.user;


import com.apple.howmuch.domain.trip.TripPlan;
import com.apple.howmuch.domain.trip.TripPlanResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
@Builder
public class UserResponse {
    private String email;
    private String name;
    private List<TripPlanResponse> tripPlans;

    public static UserResponse from(String email, String name, List<TripPlan> tripPlans) {
        List<TripPlanResponse> tripPlanResponses = tripPlans.stream()
                .map(tripPlan -> TripPlanResponse.from(tripPlan, true))
                .collect(Collectors.toList());

        return UserResponse.builder()
                .email(email)
                .name(name)
                .tripPlans(tripPlanResponses)
                .build();
    }
}
