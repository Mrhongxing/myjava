package com.tianshu.www;

import java.util.ArrayList;
import java.util.Arrays;

public class yvshui {
    public static void isYvshui(int[] height) {
        int left = 0;
        int position = 0;
        ArrayList<Integer> middle = new ArrayList<>();
        int right;
        int shui=0;
        boolean hasleft = false;
        int max = 0 ;
        int maxPosition = 0;
        for(int i =0;i<height.length;i++){
            if(height[i]>max){
                max = height[i];
                maxPosition = i;
            }
        }
        for (int i = 0; i <= maxPosition; i++) {
            if (hasleft && left<= height[i]) {
                right = height[i];
                for (int j = 0; j < middle.size(); j++) {
                    if (middle.get(j) < left) {
                        shui += left - middle.get(j);
                    }
                }
                middle.clear();
                left = height[i];
                position = i;
            } else if (left <= height[i]) {
                left = height[i];
                position = i;
            } else {
                middle.add(height[i]);
                hasleft = true;
            }
        }
        hasleft = false;
         left = 0;
         position = 0;
        for (int i = height.length - 1; i >= maxPosition; i--) {
            if (hasleft && left<= height[i]) {
                right = height[i];
                for (int j = 0; j < middle.size(); j++) {
                    if (middle.get(j) < left) {
                        shui += left - middle.get(j);
                    }
                }
                middle.clear();
                left = height[i];
                position = i;
            } else if (left <= height[i]) {
                left = height[i];
                position = i;
            }else {
                middle.add(height[i]);
                hasleft = true;
            }
            
        }
        System.out.println(shui);
    }

    public static void main(String[] args) {
        int[] numbers = {0,1,0,2,1,0,1,3,2,1,2,1};
        int[] numbers2 = {4,2,0,3,2,5};
        isYvshui(numbers);
        isYvshui(numbers2);
    }
}
