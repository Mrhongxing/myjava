package com.tianshu.www;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Arrays;;

public class date4 {
    public static void main(String[] args) {
        long time = System.currentTimeMillis();
        System.out.println(time);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime ld = LocalDateTime.now();
        String s1 = dtf.format(ld);
        System.out.println(s1);
        String s = "2024-06-12 12:12:12";
        TemporalAccessor ta = dtf.parse(s);
        LocalDateTime ldt = LocalDateTime.from(ta);
        System.out.println(ldt);
        long time2 = System.currentTimeMillis();
        System.out.println(time2);
        int[] arr = new int[10];
        int[] a= {1,2,3,4,5,6,7,8,9,10};
        System.arraycopy(a,0,arr,0,10);
        String o = a.toString();
        System.out.println(o);
        System.out.println(arr);
        Arrays.sort(a);
        int sss = Arrays.binarySearch(a,5);
        System.out.println(sss);
        int[] b =Arrays.copyOf(a, 11);
        b[10]= 11;
        for (int i : b) {
            System.out.println(i);  
        }
    }
}