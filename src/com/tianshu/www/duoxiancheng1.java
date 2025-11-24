package com.tianshu.www;

public class duoxiancheng1{
    public static void main(String[] args) {
        MyThread1 t1 = new MyThread1("线程A");
        MyThread1 t2 = new MyThread1("线程B");
        MyThread1 t3 = new MyThread1("线程C");

        t1.start();
        t2.start();
        t3.start();
    }
    public static class MyThread1 extends Thread{
        private static final long serialVersionUID = 1L;
        public MyThread1(String name){
            super(name);
        }
        public void print(){
            System.out.println(serialVersionUID);
        }
        @Override
        public void run() {
            for (int i = 0; i < 5; i++) {
                System.out.println(getName() + "正在执行" + i);
                print();
            }
        }
    }
}
