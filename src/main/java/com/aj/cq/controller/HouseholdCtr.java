package com.aj.cq.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HouseholdCtr {

    @RequestMapping("/addHousehold")
    public String addHousehold(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        return "addHousehold";
    }


    @RequestMapping("/deleteHousehold")
    public String deleteHousehold(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        return "deleteHousehold";
    }




}
