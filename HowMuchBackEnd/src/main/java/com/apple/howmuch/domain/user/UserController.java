package com.apple.howmuch.domain.user;


import com.apple.howmuch.global.exception.ErrorCode;
import com.apple.howmuch.global.exception.Exceptions;
import com.apple.howmuch.global.jwt.AccessTokenResponse;
import com.apple.howmuch.global.jwt.CreateAccessTokenByRefreshToken;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "user", description = "회원관리 API")
@RequestMapping(value = "/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @PostMapping(value = "/join")
    @Operation(summary = "join", description = "회원가입")
    public ResponseEntity<UserSignUpResponseDto> joinUser(
            @RequestBody UserSignUpDto userSignUpDto
    ) {

        return ResponseEntity.ok(userService.join(userSignUpDto));
    }

    @PostMapping(value = "/login")
    @Operation(summary = "login", description = "로그인")
    public ResponseEntity<UserLoginResponseDto> loginUser(
            @RequestBody UserLoginDto userLoginDto
    ) {

        return ResponseEntity.ok(userService.userLogin(userLoginDto));
    }

    @PostMapping(value = "/login/token")
    @Operation(summary = "JwtLogin", description = "로그인")
    public ResponseEntity<AccessTokenResponse> tokenLogin(
            @RequestBody CreateAccessTokenByRefreshToken refreshToken
    ) {

        return ResponseEntity.ok(userService.refreshAccessToken(refreshToken));
    }


    @GetMapping(value = "/profile")
    @Operation(summary = "Profile", description = "회원정보")
    public ResponseEntity<UserResponse> getProfile(
            @AuthenticationPrincipal User user
    ) {
        if (user == null) {
            throw new Exceptions(ErrorCode.USER_NOT_FOUND);
        }
        return ResponseEntity.ok(userService.getProfile(user.getUsername()));
    }


}
