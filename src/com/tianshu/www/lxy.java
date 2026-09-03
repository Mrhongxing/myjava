package com.tianshu.www;

public class lxy {
    private static int Find(int x,int[] p){
        if(p[x] == x){
            return x;
        }else{
            return p[x] = Find(p[x],p);
        }
    }
    public static void main(String[] args) {
        int[] a = {6, 3, 3, 3, 1,3,6,3,1};
        Find(4,a);
        System.out.println(java.util.Arrays.toString(a));
    }
}
