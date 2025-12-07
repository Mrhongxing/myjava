package com.tianshu.www;

public class Fanxingnew {
    public static void main(String[] args) {
        Fanxing<String> f1 = new Fanxing<>("tianshu");
        System.out.println(f1.getE());

        Fanxing<Integer> f2 = new Fanxing<>(100);
        System.out.println(f2.getE());
    }
    
}