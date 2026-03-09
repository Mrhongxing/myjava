package com.tianshu.www;

public class yvshui {
    public static void isYvshui(int[] num) {
        int left = 0;
        int position = 0;
        int middle = -1;
        int right;
        int shui=0;
        boolean hasleft = false;
        for (int i = 0; i < num.length; i++) {
            if (hasleft && num[i] < left) {
                right = num[i];
                if (middle>0) {
                shui += (i-position - 1) *(Math.min(right,left)-middle);
                middle =-1;
                position=i;
                left = num[i];
                hasleft =true;
                }
            } else if (left <= num[i]) {
                left = num[i];
                position = i;
            } else {
                middle = num[i];
            }
        }
        System.out.println(shui);
    }

    public static void main(String[] args) {
        int[] numbers = {0,1,0,2,1,0,1,3,2,1,2,1};
        isYvshui(numbers);
    }
}
