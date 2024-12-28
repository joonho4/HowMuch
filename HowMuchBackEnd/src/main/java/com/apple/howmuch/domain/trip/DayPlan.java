package com.apple.howmuch.domain.trip;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DayPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description; // 중복된 description 필드

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "morning_activity_id")
    private Activity morningActivity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lunch_id")
    private Meal lunch;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "afternoon_activity_id")
    private Activity afternoonActivity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dinner_id")
    private Meal dinner;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;



}