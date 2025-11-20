package com.tianshu.www;

import java.util.Calendar;

public class date2 {
    public static void main(String[] args) {
        Calendar c = Calendar.getInstance();
        System.out.println(c);
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH) + 1; // Months are 0-based
        int day = c.get(Calendar.DAY_OF_MONTH);
        System.out.println("Current date: " + year + "-" + month + "-" + day);
    }
}
