package com.tianshu.www;

// ② 业务类:贴注解
public class UserService implements UserServiceImp {
    @Override 
    //@Log("查询用户")
    public User getUser(Long id) {
        System.out.println("  执行 getUser");
        return new User(id, "Tom");
    }
   
    @Override
    //@Log("删除用户")
    public void deleteUser(Long id) {
        System.out.println("  执行 deleteUser");
    }
    @Override 
    // 没贴注解,不记录
    public void internalMethod() {
        System.out.println("  执行 internalMethod");
    }
    
}