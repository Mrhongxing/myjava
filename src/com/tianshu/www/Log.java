package com.tianshu.www;

import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.Arrays;

// ① 定义注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
    String value() default "";       // 描述
    boolean printArgs() default true; // 是否打印参数
    boolean printTime() default true; // 是否打印耗时
}