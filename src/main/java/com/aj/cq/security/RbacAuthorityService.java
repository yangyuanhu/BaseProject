package com.aj.cq.security;

import com.aj.cq.mapper.LoginUserMapper;
import com.aj.cq.pojo.ACCPermission;
import com.aj.cq.pojo.ACCRole;
import com.aj.cq.pojo.ACCUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Component("RABCService")
public class RbacAuthorityService {
    @Autowired
    LoginUserMapper loginUserMapper;

    public boolean hasPermission(HttpServletRequest request, Authentication authentication) {
        if (authentication.getPrincipal() instanceof ACCUser) {
            ACCUser user = (ACCUser) authentication.getPrincipal();
            //检查是否是超级管理员
            for (ACCRole role: user.getRoles()){
                if (role.getName().equals("超级管理员"))return true;
            }

            AntPathMatcher antPathMatcher = new AntPathMatcher();
            for (ACCPermission permission : user.getPermissions()) {
                if (antPathMatcher.match(permission.getUrl(), request.getRequestURI())) {
                    return true;
                }
            }
        }

        return false;
    }
}


