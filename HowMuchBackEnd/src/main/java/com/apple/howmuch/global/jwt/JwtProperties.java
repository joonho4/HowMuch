package com.apple.howmuch.global.jwt;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter @Setter
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {

    private String issuer;

    private String secretKey;

    private int duration;

    private int refreshDuration;

}
