package com.aj.cq.security;


import com.aj.cq.mapper.LoginUserMapper;
import com.aj.cq.pojo.ACCUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private LoginUserMapper loginUserMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ACCUser user = loginUserMapper.getUserByUserName(username);
        if (user != null) {
            return user;
        }
        throw new UsernameNotFoundException("username:" + username + " not found!");
    }

}


