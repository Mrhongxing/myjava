package com.tianshu.www;

import java.util.Calendar;
import java.util.Scanner;


public class date2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入年份：");
        int year = sc.nextInt();
        System.out.print("请输入月份：");
        int month = sc.nextInt();
        System.out.print("请输入日期：");
        int day = sc.nextInt();
        Calendar c = Calendar.getInstance();
        System.out.println(c);
        int year1 = c.get(Calendar.YEAR);//年份
        int month1 = c.get(Calendar.MONTH) + 1; // Months are 0-based月份
        int day1 = c.get(Calendar.DAY_OF_MONTH);//日
        int hour_half = c.get(Calendar.HOUR);//12小时制
        int hour = c.get(Calendar.HOUR_OF_DAY);//24小时制
        int minute = c.get(Calendar.MINUTE);//分
        int second = c.get(Calendar.SECOND);//秒
        int week = c.get(Calendar.DAY_OF_WEEK);//星期
        c.set(year, month - 1, day);//设置日期
        System.out.println("Current date: " + year1 + "-" + month1 + "-" + day1);
        System.out.println("Current time: " + hour + ":" + minute + ":" + second);
        System.out.println("Current week: " + week);
        if(sc != null){
            sc.close();
        }
    }
}
