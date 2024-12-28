package com.apple.howmuch.global.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // Status 400
    INVALID_REQUEST_ERROR(HttpStatus.BAD_REQUEST, "잘못된 요청값"),

    // Status 401
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰값"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "틀린 비밀번호"),

    // Status 403
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "접근 권한 없음!"),

    // Status 404
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저를 찾을 수 없음"),

    // Status 409
    DUPLICATED_EMAIL(HttpStatus.CONFLICT, "이미 사용중인 아이디"),

    // Status 500
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    ErrorCode(HttpStatus httpStatus, String errorMessage) {
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }
}
