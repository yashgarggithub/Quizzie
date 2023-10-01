package com.exam.model;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority {

    // authority = role name
    private String authority;

    public Authority(String authority) { // passing authority in constructor
        this.authority = authority;
    }

    @Override
    public String getAuthority() { // fetching authority
        return this.authority;
    }
}
