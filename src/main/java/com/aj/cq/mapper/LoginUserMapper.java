package com.aj.cq.mapper;


import com.aj.cq.pojo.ACCPermission;
import com.aj.cq.pojo.ACCRole;
import com.aj.cq.pojo.ACCUser;
import org.apache.ibatis.annotations.*;

import java.util.List;


public interface LoginUserMapper {

    //根据用户名查询用户信息,同时获取其权限和角色
    @Select("select * from user where username = #{username}")
    @Results(value = {
            @Result(id = true, column = "id"),
            @Result(column = "id", property = "permissions",
                    many = @Many(select = "com.aj.cq.mapper.LoginUserMapper.getUserPermissionByID")),
            @Result(column = "id",property = "roles",
                    many = @Many(select = "com.aj.cq.mapper.LoginUserMapper.getUserRolesBuID"))
    })
    public ACCUser getUserByUserName(String userName);


    //根据用户,关联的角色查询其拥有的权限,以及用户直接拥有的权限
    @Select("select * from permission where id  in(select permission_id from role_permissions where role_id in (select role_id from user_role where user_id = #{userId}) union select permission_id from  user_permission where user_id = #{userId})")
    @ResultType(ACCPermission.class)
    public List<ACCPermission> getUserPermissionByID(Integer userId);


    @Select("select * from role where id in(select role_id from user_role where user_id = #{userId})")
    @ResultType(ACCRole.class)
    public List<ACCRole> getUserRolesBuID(Integer userId);

}
