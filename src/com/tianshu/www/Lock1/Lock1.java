package com.tianshu.www.Lock1;

import java.util.Timer;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
//import java.util.concurrent.locks.Lock;

public class Lock1 {
    public static void main(String[] args) throws Exception {
        ExecutorService executorService = java.util.concurrent.Executors.newFixedThreadPool(2);
        hong hong1 = new hong(10);
        Future<Integer> future1 = executorService.submit(hong1);
        System.out.println("hong 线程执行结果：" + future1.get());
        mei mei1 = new mei(10);
        executorService.submit(mei1);
        Timer timer = new Timer();
        timer.schedule(new java.util.TimerTask() {
            @Override
            public void run() {
                executorService.shutdown();
                timer.cancel();
            }
        }, 1000);
        executorService.shutdown();
    }
}