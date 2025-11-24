package com.tianshu.www;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;

public class date3 {
    public static void main(String[] args) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf.format(new java.util.Date()));
        LocalDateTime localdate = LocalDateTime.now();
        LocalDateTime localDate1 = LocalDateTime.of(2025, 1, 1, 0, 0);
        System.out.println(localdate);
        System.out.print(localDate1);
        int year = localdate.getYear();//获取年
        int month = localdate.getMonthValue();  //获取月
        int day = localdate.getDayOfMonth();//获取日
        int hour = localdate.getHour();//获取时
        int minute = localdate.getMinute();//获取分
        int second = localdate.getSecond();//获取秒
        System.out.println("年：" + year);
        System.out.println("月：" + month);
        System.out.println("日：" + day);
        System.out.println("时：" + hour);
        System.out.println("分：" + minute);
        System.out.println("秒：" + second);
        localdate = localdate.withYear(2020);//修改年
        localdate = localdate.withMonth(10);//修改月
        localdate = localdate.withDayOfMonth(6);//修改日
        localdate = localdate.withHour(20);//修改时
        localdate = localdate.withMinute(30);//修改分
        localdate = localdate.withSecond(50);//修改秒
        System.out.println("修改后时间：" + localdate);
        Period period = Period.between(LocalDateTime.now().toLocalDate(), localDate1.toLocalDate());
        System.out.println("距离2025年1月1日还有：" + period.getYears() + "年" + period.getMonths() + "月" + period.getDays() + "天");
        System.out.println(period);
        Duration duration = Duration.between(LocalDateTime.now(), localDate1);
        System.out.println("距离2025年1月1日还有：" + duration.toDays() + "天"+ duration.toHoursPart() + "小时" + duration.toMinutesPart() + "分" + duration.toSecondsPart() + "秒");
        System.out.println(duration);
    }
}