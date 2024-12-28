package com.apple.howmuch.domain.user;


import com.apple.howmuch.domain.trip.TripPlan;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Getter
@Builder
public class UserResponse {

    private String email;
    private String name;
    private List<TripPlan> tripPlans;

    public static UserResponse from(String email, String name, List<TripPlan> tripPlans) {

        return UserResponse.builder()
                .email(email)
                .name(name)
                .tripPlans(tripPlans)
                .build();
    }
}
