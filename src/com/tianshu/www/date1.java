package com.tianshu.www;

import java.util.Date;

public class date1 {
    public static void main(String[] args) {
        Date date1 = new Date();
        date1.setTime(1000L * 60 * 60);
        System.out.println(date1.getTime());
        System.out.println(date1);
    }
}
