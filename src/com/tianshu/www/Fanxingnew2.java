package com.tianshu.www;

public class Fanxingnew2 {
    public static void main(String[] args) {
        Fanxing2 fx2 = new Fanxing2();
        
        Integer[] intArray = {1, 2, 3, 4, 5};
        System.out.println("Integer Array:");
        fx2.printArray(intArray);
        
        String[] strArray = {"Hello", "World", "Generics"};
        System.out.println("String Array:");
        fx2.printArray(strArray);
    }
}