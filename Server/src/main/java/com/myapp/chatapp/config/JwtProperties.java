package com.myapp.chatapp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
        private String secret;
        private long expirationMs;

        public JwtProperties() {
        }

        public JwtProperties(String secret, long expirationMs) {
                this.secret = secret;
                this.expirationMs = expirationMs;
        }

        public String getSecret() {
                return secret;
        }

        public void setSecret(String secret) {
                this.secret = secret;
        }

        public long getExpirationMs() {
                return expirationMs;
        }

        public void setExpirationMs(long expirationMs) {
                this.expirationMs = expirationMs;
        }

        public String secret() {
                return secret;
        }

        public long expirationMs() {
                return expirationMs;
        }
}