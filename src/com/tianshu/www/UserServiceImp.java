package com.tianshu.www;

public interface UserServiceImp {
    @Log("查询用户")
    User getUser(Long id);
    @Log(value = "删除用户", printArgs = false)
    void deleteUser(Long id);
    void internalMethod();
}
