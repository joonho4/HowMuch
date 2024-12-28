package com.apple.howmuch.global.exception;


import lombok.Getter;

@Getter
public class Exceptions extends RuntimeException {

    private final ErrorCode errorCode;


    public Exceptions(ErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
