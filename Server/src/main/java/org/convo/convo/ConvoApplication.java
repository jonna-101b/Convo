package org.convo.convo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "com.myapp.chatapp", "org.convo.convo" })
@EnableJpaRepositories(basePackages = "com.myapp.chatapp.repository")
@EntityScan(basePackages = "com.myapp.chatapp.domain")
@EnableConfigurationProperties
public class ConvoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConvoApplication.class, args);
    }

}
