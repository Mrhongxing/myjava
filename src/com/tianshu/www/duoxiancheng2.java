package com.tianshu.www;

public class duoxiancheng2{
    public static void main(String[] args) {
        Thread t1 = new Thread(new MyThread2(),"线程A");
        Thread t2 = new Thread(new MyThread2(),"线程B");
        Thread t3 = new Thread(new MyThread2(),"线程C");
        t1.start();
        t2.start();
        t3.start();
        
        synchronized (duoxiancheng2.class) {
            System.out.println("主线程获得锁");
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
                    System.out.println(Thread.currentThread().getName() + "正在执行" + i);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }, "匿名线程").start(); // 添加分号并启动线程
    }
    public static class MyThread2 implements Runnable{
        @Override
        public void run() {
            for (int i = 0; i < 5; i++) {
                System.out.println(Thread.currentThread().getName() + "正在执行" + i);
                try {
                    
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
}
