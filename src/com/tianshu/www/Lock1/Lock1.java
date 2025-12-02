package com.tianshu.www.Lock1;

public class Lock1 {
    public static void main(String[] args) {
        int ticket = 10;
        mei m = new mei(ticket);
        Thread t1 = new Thread(m);
        Thread t2 = new Thread(m);
        t1.start();
        t2.start();
    }
}
