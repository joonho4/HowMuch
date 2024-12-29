package com.apple.howmuch.domain.trip;

import com.apple.howmuch.domain.user.HowMuchUser;
import com.apple.howmuch.domain.user.UserRepository;
import com.apple.howmuch.global.exception.ErrorCode;
import com.apple.howmuch.global.exception.Exceptions;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(TripService.class);

    public TripPlanResponse favoritePlan(Long id) {
        TripPlan tripPlan = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("여행 계획없음!"));

        tripPlan.setFavorite(true);

        tripRepository.save(tripPlan);

        return TripPlanResponse.from(tripPlan, true);
    }

    public TripPlanResponse favoritePlanFalse(Long id) {
        TripPlan tripPlan = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("여행 계획없음!"));

        tripPlan.setFavorite(false);

        tripRepository.save(tripPlan);

        return TripPlanResponse.from(tripPlan, true);
    }

    public TripPlanResponse saveTripPlan(TripPlanDto request, String email) {
        HowMuchUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exceptions(ErrorCode.USER_NOT_FOUND));

        TripPlan tripPlan = new TripPlan();
        tripPlan.setTotalExpense(request.getTotalExpense());
        tripPlan.setThema(request.getThema());
        tripPlan.setPlace(request.getPlace());
        tripPlan.setUser(user);

        log.info("Email : {}", email);

        List<DayPlan> dayPlans = request.getDayPlans().stream()
                .map(dayPlanDto -> convertDayPlan(dayPlanDto, tripPlan))
                .toList();
        tripPlan.setDayPlans(dayPlans);

        tripRepository.save(tripPlan);

        return TripPlanResponse.from(tripPlan, true);
    }

    private DayPlan convertDayPlan(DayPlanDto request, TripPlan tripPlan) {
        DayPlan dayPlan = new DayPlan();
        dayPlan.setMorningActivity(convertActivity(request.getMorningActivity()));
        dayPlan.setAfternoonActivity(convertActivity(request.getAfternoonActivity()));
        dayPlan.setLunch(convertMeal(request.getLunch()));
        dayPlan.setDinner(convertMeal(request.getDinner()));
        dayPlan.setAccommodation(convertAccommodation(request.getAccommodation()));
        return dayPlan;
    }

    private Activity convertActivity(ActivityDto request) {
        Activity activity = new Activity();
        activity.setActivityName(request.getActivityName());
        activity.setDescription(request.getDescription());
        activity.setImageURL(request.getImageURL());
        activity.setWebsiteURL(request.getWebsiteURL());
        return activity;
    }

    private Meal convertMeal(MealDto request) {
        Meal meal = new Meal();
        meal.setPlace(request.getPlace());
        meal.setDescription(request.getDescription());
        meal.setAveragePrice(request.getAveragePrice());
        meal.setImageURL(request.getImageURL());
        meal.setWebsiteURL(request.getWebsiteURL());
        return meal;
    }

    private Accommodation convertAccommodation(AccommodationDto request) {
        Accommodation accommodation = new Accommodation();
        accommodation.setName(request.getName());
        accommodation.setDescription(request.getDescription());
        accommodation.setImageURL(request.getImageURL());
        accommodation.setWebsiteURL(request.getWebsiteURL());
        return accommodation;
    }
}