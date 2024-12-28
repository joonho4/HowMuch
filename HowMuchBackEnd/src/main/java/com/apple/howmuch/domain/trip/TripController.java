package com.apple.howmuch.domain.trip;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/trip")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping(value = "/save-trip")
    public ResponseEntity<TripPlanResponse> saveTrip(
            @AuthenticationPrincipal User user,
            @RequestBody TripPlanDto request
    ) {
        
        return ResponseEntity.ok(tripService.saveTripPlan(request, user.getUsername()));
    }

    @PostMapping(value = "/favorite-true")
    public ResponseEntity<TripPlanResponse> favoriteTrue(
            @RequestParam("planId") Long id
    ) {

        return ResponseEntity.ok(tripService.favoritePlan(id));
    }

    @PostMapping(value = "/favorite-false")
    public ResponseEntity<TripPlanResponse> favoriteFalse(
            @RequestParam("planId") Long id
    ) {

        return ResponseEntity.ok(tripService.favoritePlanFalse(id));
    }
}
