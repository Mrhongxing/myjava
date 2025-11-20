package com.tianshu.www;

import java.math.*;;


public class math1 {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        String math = "2123123123123123123123213123123123123123123123123123123123123123";
        double c =2.5;
        BigDecimal bigDec = new BigDecimal("1.101");
        BigDecimal bigDec2 = BigDecimal.valueOf(c);
        BigDecimal resultDec = bigDec.divide(bigDec2, 10, RoundingMode.HALF_UP);
        System.out.println("BigDecimal Result: " + resultDec.toString());
        BigInteger bigInt = new BigInteger(math);
        bigInt.longValue();
        BigInteger bigInt2 = BigInteger.valueOf(a);
        BigInteger bigInt3 = BigInteger.valueOf(b);
        BigInteger result = bigInt.add(bigInt2).multiply(bigInt3);
        System.out.println("Result: " + result.toString());
    }
}