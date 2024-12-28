package com.apple.howmuch.global.jwt;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AccessTokenRequest {
    String email;
    String password;
}
