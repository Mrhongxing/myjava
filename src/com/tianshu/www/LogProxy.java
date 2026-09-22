package com.tianshu.www;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.Arrays;

// 通过反射 + 动态代理实现
// ③ 动态代理:拦截并处理注解
public class LogProxy implements InvocationHandler {
    private Object target;

    public LogProxy(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 没注解 → 直接执行
        System.out.println(">>> invoke: " + method.getName()
        + ", @Log存在: " + method.isAnnotationPresent(Log.class));   // ← 加这行
        System.out.println(">>> invoke: " + method.getName()
    + ", 所有注解: " + java.util.Arrays.toString(method.getAnnotations()));
        if (!method.isAnnotationPresent(Log.class)) {
            return method.invoke(target, args);
        }

        // 有注解 → 记录日志
        Log log = method.getAnnotation(Log.class);

        System.out.println("=== 日志开始 ===");
        if (!log.value().isEmpty()) {
            System.out.println("描述: " + log.value());
        }
        System.out.println("方法: " + method.getName());

        if (log.printArgs()) {
            System.out.println("参数: " + Arrays.toString(args));
        }

        long start = System.currentTimeMillis();
        Object result = method.invoke(target, args);   // 真正执行
        long cost = System.currentTimeMillis() - start;

        if (log.printTime()) {
            System.out.println("耗时: " + cost + "ms");
        }
        System.out.println("返回: " + result);
        System.out.println("=== 日志结束 ===\n");

        return result;
    }
}