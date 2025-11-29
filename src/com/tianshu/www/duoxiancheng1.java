package com.tianshu.www;

public class duoxiancheng1{
    public static void main(String[] args) {
        MyThread1 t1 = new MyThread1("线程A");
        MyThread1 t2 = new MyThread1("线程B");
        MyThread1 t3 = new MyThread1("线程C");
        t1.setName("dwadad");
        t2.setName("sdsdsds");
        t3.setName("sdsdsdddd");
        t1.setPriority(9);
        t1.start();
        t2.start();
        t3.start();
        try {
            t1.join();;
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        String name = t1.getName();
        System.out.println(name);
        System.out.println(Thread.currentThread().getName());
    }
    public static class MyThread1 extends Thread{
        private static final long serialVersionUID = 1L;
        public MyThread1(String name){
            super(name);//第二种设置名称方法
        }
        public void print(){
            System.out.println(serialVersionUID);
        }
        @Override
        public void run() {
            for (int i = 0; i < 5; i++) {
                System.out.println(getName() + "正在执行" + i);
                print();
                Thread.yield();
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
