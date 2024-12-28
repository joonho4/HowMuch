package com.apple.howmuch.domain.user;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class UserSignUpDto {
    @NotNull(message = "Email is null")
    @Email(message = "Invalid email format")
    private String email;

    private String name;

    private String password;

}
