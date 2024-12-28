package com.apple.howmuch.domain.user;


import com.apple.howmuch.global.jwt.AccessTokenResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLoginResponseDto {
    private Long Id;
    private String email;
    private String name;
    private AccessTokenResponse jwtAccessToken;

    public static UserLoginResponseDto from(HowMuchUser howMuchUser, AccessTokenResponse jwtToken) {
        return UserLoginResponseDto.builder()
                .Id(howMuchUser.getId())
                .email(howMuchUser.getEmail())
                .name(howMuchUser.getName())
                .jwtAccessToken(jwtToken)
                .build();
    }
}
