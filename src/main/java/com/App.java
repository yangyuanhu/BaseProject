package com;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@MapperScan(basePackages = {"com.aa.mapper","com.aj.cq.mapper"})
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class,args);
    }
}