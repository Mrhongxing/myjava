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
        int[] count = new int[m];
        int num = 1;
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        Arrays.sort(a);
        for (int j = 0; j < m; j++) {
            




            

            int x = sc.nextInt();
                int y = sc.nextInt();
                int z = sc.nextInt();
                int min = Arrays.binarySearch(a, x);
                int max= Arrays.binarySearch(a, y);
                for(int s = min ; s < max+1; s++){
                    num = 1;
                    for(int t = 0; t < z; t++){
                        num=num*a[s];
                    }
                    count[j] = count[j] + num;
                }
            
        }
        for(int i = 0; i < m; i++){
            System.out.println(count[i]);
        }
    }

}
