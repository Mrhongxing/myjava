package com.tianshu.www;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class exception {
    public static void main(String[] args) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = "2024-06-01 12:00:00";
        try {
            Date date = sdf.parse(time);
            System.out.println(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
