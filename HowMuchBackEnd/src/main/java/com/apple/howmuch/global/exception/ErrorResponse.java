package com.apple.howmuch.global.exception;


import lombok.Getter;

@Getter
public class ErrorResponse {

    private final String message;
    private final int status;
    private final String errorMessage;

    public ErrorResponse(ErrorCode errorCode, String errorMessage) {
        this.message = errorCode.getErrorMessage();
        this.status = errorCode.getHttpStatus().value();
        this.errorMessage = errorMessage;
    }
}
