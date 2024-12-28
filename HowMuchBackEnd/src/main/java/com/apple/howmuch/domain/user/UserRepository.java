package com.apple.howmuch.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<HowMuchUser, Long> {
    boolean existsByEmail(String email);

    Optional<HowMuchUser> findByEmail(String email);
}
