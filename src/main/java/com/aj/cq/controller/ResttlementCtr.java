package com.aj.cq.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResttlementCtr {

    @RequestMapping("/addResttlement")
    public String addHousehold(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        return "addResttlement";
    }

    @RequestMapping("/deleteResttlement")
    public String deleteHousehold(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        return "deleteResttlement";
    }

}
