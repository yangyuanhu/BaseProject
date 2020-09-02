package com.aj.cq.security;

import com.aj.cq.pojo.AjaxBack;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class SpringSecurityConf extends WebSecurityConfigurerAdapter {
    @Autowired
    MyUserDetailService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        // 加入自定义的安全认证
        auth.userDetailsService(new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

                return null;
            }
        }).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {


        // 去掉 CSRF
        http.csrf().disable()
                .authorizeRequests().antMatchers("/login", "/static/**").permitAll()
                .and().authorizeRequests().antMatchers("/public/**").authenticated()

                //权限验证
                .and()
                .authorizeRequests()
                .anyRequest()
                .access("@RABCService.hasPermission(request,authentication)") // RBAC 动态 url 认证

                .and()
                .formLogin()
                .loginPage("/static/login.html")
                .loginProcessingUrl("/login")
                //登录成功
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                        JSONObject jsonObject = new JSONObject();
                        jsonObject.put("result", "success");
                        httpServletResponse.setContentType("application/json");
                        httpServletResponse.getWriter().println(jsonObject.toJSONString());
                    }
                })
                //登录失败
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                        JSONObject jsonObject = new JSONObject();
                        jsonObject.put("result", "error");
                        jsonObject.put("errorMessage", "用户名或密码不正确!");
                        httpServletResponse.setContentType("application/json");
                        httpServletResponse.getWriter().println(jsonObject.toJSONString());
                    }
                });
        // 记住我
        http.rememberMe().rememberMeParameter("remember-me")
                .userDetailsService(userDetailsService).tokenValiditySeconds(300);

        // 无权访问 JSON 格式的数据
        http.exceptionHandling().accessDeniedHandler(new AccessDeniedHandler() {
            @Override
            public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
                httpServletResponse.setContentType("application/json");
                AjaxBack result = AjaxBack.error().code(403).error("您没有该权限");
                httpServletResponse.getWriter().println(JSON.toJSON(result));
            }
        });
    }
}


