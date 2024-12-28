package com.apple.howmuch.domain.user;


import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class UserSignUpResponseDto {
    private Long userId;
    private String email;
    private String name;

    public static UserSignUpResponseDto from(HowMuchUser howMuchUser) {
        return UserSignUpResponseDto.builder()
                .userId(howMuchUser.getId())
                .email(howMuchUser.getEmail())
                .name(howMuchUser.getName())
                .build();
    }
}
