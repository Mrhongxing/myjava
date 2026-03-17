package com.tianshu.www;

import java.lang.reflect.Array;
import java.util.Arrays;

public class shanchuchongfuxiang {
    public void qvchong(int[] arr){
        /* int[] distinctIntArray = Arrays.stream(arr)
                               .distinct()
                               .toArray(); */
        int i =0;
        for (int j = 1; j < arr.length; j++) {
            if (arr[i] != arr[j]) {
                i++;
                arr[i] = arr[j];
            }
            System.out.println(Arrays.toString(arr));
        }
    
        System.out.println("去重后的数组: " + Arrays.toString(arr) + ", 长度: " + arr.length);
    }
    public static void main(String[] args) {
        int[] arr = {0,1,2,2,4,2,4,5};
        new shanchuchongfuxiang().qvchong(arr);
    }
}
