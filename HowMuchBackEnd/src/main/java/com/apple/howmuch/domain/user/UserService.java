package com.apple.howmuch.domain.user;


import com.apple.howmuch.domain.trip.TripPlanResponse;
import com.apple.howmuch.global.exception.ErrorCode;
import com.apple.howmuch.global.exception.Exceptions;
import com.apple.howmuch.global.jwt.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProperties jwtProperties;
    private final TokenProvider tokenProvider;
    private final JwtRepository jwtRepository;


    public UserResponse getProfile(String email) {
        HowMuchUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exceptions(ErrorCode.USER_NOT_FOUND));

        return UserResponse.from(user.getEmail(), user.getName(), user.getTripPlans());

    }

    public HowMuchUser getUser(String email) {
        HowMuchUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exceptions(ErrorCode.USER_NOT_FOUND));

        return user;
    }

    @Transactional
    public UserSignUpResponseDto join(UserSignUpDto signUpDto) {

        if(userRepository.existsByEmail(signUpDto.getEmail())){
            throw new Exceptions(ErrorCode.DUPLICATED_EMAIL);
        }


        HowMuchUser howMuchUser = HowMuchUser.builder()
                .email(signUpDto.getEmail())
                .password(passwordEncoder.encode(signUpDto.getPassword()))
                .name(signUpDto.getName())
                .build();

        HowMuchUser save = userRepository.save(howMuchUser);
        return UserSignUpResponseDto.from(save);
    }


    @Transactional
    public UserLoginResponseDto userLogin(UserLoginDto loginDto) {
        HowMuchUser howMuchUser = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new Exceptions(ErrorCode.USER_NOT_FOUND));

        if(!passwordEncoder.matches(loginDto.getPassword(), howMuchUser.getPassword())) {

            throw new Exceptions(ErrorCode.INVALID_PASSWORD);
        }

        AccessTokenResponse jwtToken = createAccessToken(howMuchUser, null);

        return UserLoginResponseDto.from(howMuchUser, jwtToken);
    }

    private AccessTokenResponse createAccessToken(HowMuchUser user, String refreshToken){
        Duration tokenDuration = Duration.ofMinutes(jwtProperties.getDuration());
        Duration refreshDuration = Duration.ofMinutes(jwtProperties.getRefreshDuration());

        RefreshToken savedRefreshToken = jwtRepository.findByUserEmail(user.getEmail()).orElse(null);

        if(savedRefreshToken !=null && refreshToken != null){
            if(!savedRefreshToken.getRefreshToken().equals(refreshToken))
                return new AccessTokenResponse("Invalid token.", null, null);
        }

        String accessToken = tokenProvider.generateToken(user, tokenDuration, true);
        String newRefreshToken = tokenProvider.generateToken(user, refreshDuration, false);

        if(savedRefreshToken == null) {
            savedRefreshToken = new RefreshToken(user.getEmail(), newRefreshToken);
        } else {
            savedRefreshToken.setRefreshToken(newRefreshToken);
        }

        jwtRepository.save(savedRefreshToken);
        return new AccessTokenResponse("ok", accessToken, newRefreshToken);
    }




    public AccessTokenResponse refreshAccessToken(CreateAccessTokenByRefreshToken request){
        try {
            Claims claims = tokenProvider.getClaims(request.getRefreshToken());
            String type = claims.get("type").toString();
            if (type == null || !type.equals("Refresh")) {
                throw new Exception("Invalid token");
            }

            HowMuchUser user = getUser(claims.getSubject());
            return createAccessToken(user, request.getRefreshToken());

        } catch(ExpiredJwtException e){
            return new AccessTokenResponse("만료된 토큰", null, null);

        }catch (Exception e){
            System.out.println(e.getMessage());
            return new AccessTokenResponse(e.getMessage(), null, null);
        }
    }
}
