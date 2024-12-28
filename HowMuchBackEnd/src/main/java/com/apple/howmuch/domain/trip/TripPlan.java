package com.apple.howmuch.domain.trip;

import com.apple.howmuch.domain.user.HowMuchUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class TripPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayPlan> dayPlans = new ArrayList<>();

    private int totalExpense;

    @Builder.Default()
    private boolean favorite = false;

    @ManyToOne
    @JoinColumn(name = "email", nullable = false)
    private HowMuchUser user;
}
