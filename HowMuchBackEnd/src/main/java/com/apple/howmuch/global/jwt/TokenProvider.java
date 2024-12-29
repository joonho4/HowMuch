package com.apple.howmuch.global.jwt;


import com.apple.howmuch.domain.user.HowMuchUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TokenProvider {
    private final JwtProperties jwtProperties;

    private final SecretKey key;

    private final JwtParser parser;

    public TokenProvider(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
        key = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(jwtProperties.getSecretKey()));
        parser = Jwts.parser().verifyWith(key).build();
    }

    public String generateToken(HowMuchUser user, Duration expiredAt, boolean isAccessToken) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expiredAt.toMillis());

        return Jwts.builder()
                .header().add("typ", "JWT").add("alg", "HS256").and()
                .claims()
                    .issuer(jwtProperties.getIssuer())
                    .issuedAt(now)
                    .expiration(expiry)
                    .subject(user.getEmail())
                    .add("type", isAccessToken? "Access" : "Refresh")
                    .add("id", user.getId())
                    .and()
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);

        String type = claims.get("type").toString();
        if (type == null || !claims.get("type").equals("Access"))  {
            throw new IllegalArgumentException("");
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("user"));

        UserDetails userDetails = User
                .withUsername(claims.getSubject())
                .password("")
                .authorities(authorities)
                .build();

        return new UsernamePasswordAuthenticationToken(userDetails, token, authorities);
    }

    public Claims getClaims(String token) {
        Jws<Claims> jws = parser.parseSignedClaims(token);
        return jws.getPayload();
    }
}
