package com.apple.howmuch.domain.trip;


import com.apple.howmuch.domain.user.HowMuchUser;
import com.apple.howmuch.domain.user.UserSignUpResponseDto;
import lombok.Builder;
import lombok.Getter;


import java.util.List;

@Getter
@Builder
public class TripPlanResponse {

    private boolean status;

    private List<DayPlan> dayPlans;

    private int totalExpense;

    private String place;

    private String thema;

    private String peopleCount;

    private boolean favorite;

    public static TripPlanResponse from(TripPlan tripPlan, boolean status) {
        return TripPlanResponse.builder()
                .status(status)
                .dayPlans(tripPlan.getDayPlans())
                .totalExpense(tripPlan.getTotalExpense())
                .place(tripPlan.getPlace())
                .thema(tripPlan.getThema())
                .favorite(tripPlan.isFavorite())
                .build();
    }
}
