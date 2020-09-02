package com.aj.cq.pojo;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
public class ACCUser implements UserDetails {
    private Integer id;
    private String userName;
    private String password;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;
    private Date lastLogin;
    private String realName;
    private Collection<GrantedAuthority> authorities;
    private Collection<ACCPermission> permissions;
    private Collection<ACCRole> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (authorities!=null)return authorities;
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (ACCPermission permission : getPermissions()) {
            authorities.add(new SimpleGrantedAuthority(permission.getPerTag()));
        }
        setAuthorities(authorities);
        return authorities;
    }

    public void setAuthorities(Collection<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


    @Override
    public String toString() {
        return "CQUser{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", accountNonExpired=" + accountNonExpired +
                ", accountNonLocked=" + accountNonLocked +
                ", credentialsNonExpired=" + credentialsNonExpired +
                ", enabled=" + enabled +
                ", lastLogin=" + lastLogin +
                ", realName='" + realName + '\'' +
                ", authorities=" + authorities +
                ", roles=" + roles +
                '}';
    }
}
