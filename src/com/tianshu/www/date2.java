package com.tianshu.www;

import java.util.Calendar;

public class date2 {
    public static void main(String[] args) {
        Calendar c = Calendar.getInstance();
        System.out.println(c);
        int year = c.get(Calendar.YEAR);//年份
        int month = c.get(Calendar.MONTH) + 1; // Months are 0-based月份
        int day = c.get(Calendar.DAY_OF_MONTH);//日
        int hour_half = c.get(Calendar.HOUR);//12小时制
        int hour = c.get(Calendar.HOUR_OF_DAY);//24小时制
        int minute = c.get(Calendar.MINUTE);//分
        int second = c.get(Calendar.SECOND);//秒
        int week = c.get(Calendar.DAY_OF_WEEK);//星期
        System.out.println("Current date: " + year + "-" + month + "-" + day);
        System.out.println("Current time: " + hour + ":" + minute + ":" + second);
        System.out.println("Current week: " + week);
    }
}
