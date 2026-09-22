package com.tianshu.www;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class String1 {
    public static void main(String[] args) {
        UserService target = new UserService();

        // ② 生成代理对象
        UserServiceImp proxy = (UserServiceImp) Proxy.newProxyInstance(
            UserService.class.getClassLoader(),      // 类加载器
            new Class<?>[]{UserServiceImp.class},
            //UserService.class.getInterfaces(),       // 接口(⚠️ 见下方)
            new LogProxy(target)                     // 调用处理器
        );
        System.out.println("proxy 实际类型: " + proxy.getClass().getName()); 
        for (Method m : UserServiceImp.class.getDeclaredMethods()) {
        System.out.println("方法: " + m.getName()
        + ", 注解数: " + m.getDeclaredAnnotations().length
        + ", 注解: " + java.util.Arrays.toString(m.getDeclaredAnnotations()));
}
        // ③ 调用代理对象(不是原始对象!)
        proxy.getUser(1L);
        proxy.deleteUser(2L);
        proxy.internalMethod();
    }

    public void stringMethods() {
        String str = "Hello, World!";
        System.out.println("Length: " + str.length());
        System.out.println("Uppercase: " + str.toUpperCase());
        System.out.println("Lowercase: " + str.toLowerCase());
        System.out.println("Substring (0,5): " + str.substring(0, 5));
    }
}