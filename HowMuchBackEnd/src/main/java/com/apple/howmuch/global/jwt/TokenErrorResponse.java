package com.apple.howmuch.global.jwt;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class TokenErrorResponse {
    public String errorMessage;
}
