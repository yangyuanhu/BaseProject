package com.aj.cq.pojo;

import lombok.Data;

@Data
public class ACCRole {
    private int id;
    private String name;

    @Override
    public String toString() {
        return "ACCRole{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
