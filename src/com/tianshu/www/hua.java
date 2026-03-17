package com.tianshu.www;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.io.*;
import java.lang.*;

public class hua {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] a = new int[n];
        int price = 0;
        int num = 0;
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        Arrays.sort(a);
        for (int i = 0; i < n; i++) {
            if (price + a[i] < m) {
                price += a[i];
                num++;
            } else {
                if(price+a[i]/2<m){
                    num++;
                }
                break;
                
            }
        }
        System.out.println(num);
    }
}