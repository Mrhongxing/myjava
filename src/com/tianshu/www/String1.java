package com.tianshu.www;



public class String1 {
    public static void main(String[] args) {
        char[] argss = {'s', 't', 'r', 'i', 'n', 'g'};
        String s = new String(argss, 0, 6);
        byte[] bytes = {65, 66, 67, 68, 69, 70};
        String s2 = new String(bytes, 0, 6);
        String1 s1 = new String1();
        s1.stringMethods();
        s.equalsIgnoreCase(s2);
    }

    public void stringMethods() {
        String str = "Hello, World!";
        System.out.println("Length: " + str.length());
        System.out.println("Uppercase: " + str.toUpperCase());
        System.out.println("Lowercase: " + str.toLowerCase());
        System.out.println("Substring (0,5): " + str.substring(0, 5));
    }
}