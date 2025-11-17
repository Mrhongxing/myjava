package com.tianshu.www;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class exception {
    public static void main(String[] args) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = "2024-06-01 12:00:00";
        try {
            Date date = sdf.parse(time);
            System.out.println(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            System.out.println("Execution completed.");
            System.exit(0);
        }
    }
}
