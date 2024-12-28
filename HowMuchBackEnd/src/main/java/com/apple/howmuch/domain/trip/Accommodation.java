package com.apple.howmuch.domain.trip;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accommodationId;

    private String name;
    private String description;
    private String imageURL;
    private String websiteURL;
}
