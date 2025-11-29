package com.tianshu.www;

public class waitAndNotify {
    public static void main(String[] args) {
        InnerWaitAndNotify inner = new InnerWaitAndNotify();
        Thread thread1 = new Thread(inner, "线程1");
        Thread thread2 = new Thread(inner, "线程2");

        thread1.start();
        thread2.start();
    }

    static class InnerWaitAndNotify implements Runnable {
        public static int tickets = 100;
        private final Object lock = new Object();

        @Override
        public void run() {
            try {
                method1();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        public void method1() throws InterruptedException {
            while (true) {
                synchronized (lock) {
                    // 检查是否还有票
                    if (tickets <= 0) {
                        System.out.println("票已售完");
                        break;
                    }
                    // 模拟一些操作
                    Thread.sleep(100);
                    // 打印售票信息
                    System.out.println(Thread.currentThread().getName() + "买到了第" + tickets + "张票");
                    tickets = tickets - 1;
                    // 唤醒可能正在等待的线程
                    lock.notify();
                    if (tickets > 0) {
                        // 当前线程等待，让其他线程有机会执行
                        lock.wait();
                    }
                }
            }
        }
    }
}