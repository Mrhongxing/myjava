package com.tianshu.www;

import java.util.*;

public class LCR108 {
    class Solution {
        public int numDistinct(String s, String t) {
            char[] x = s.toCharArray();
            char[] y = t.toCharArray();
            int[][] a = new int[y.length+1][x.length+1];
            for(int i=0;i<x.length+1;i++){
                a[0][i]=1;
            }
            for(int i=0;i<x.length+1;i++){
                a[0][i]=1;
            }
            for(int i=1;i<y.length+1;i++){
                for(int j=1;j<x.length+1;j++){
                    if(y[i-1]==x[j-1]){
                        a[i][j]=a[i-1][j-1]+a[i][j-1];
                    }else{
                        a[i][j]=a[i][j-1];
                    }
                }
            }
            return a[y.length][x.length];
            /* HashSet<Integer> p = new HashSet<>();
            List<List<Integer>> a = new ArrayList<>();
            for (int i = 0; i < y.length; i++) {

                List<Integer> temp = new ArrayList<>();
                for (int k = 0; k < x.length; k++) {
                    if (y[i] == x[k]) {
                        temp.add(k);
                    }
                }
                a.add(temp);

            }
            int iii = 0;
            List<Integer> as = new ArrayList<>();
            for (int j : a.get(0)) {
                as.add(j);
            }

            while (iii < y.length-1) {
                // for(List<Integer>i:a){
                iii++;
                List<Integer> ass = new ArrayList<>();
                for (int j : as) {
                    
                    for (int jj : a.get(iii)) {
                        if (jj > j) {
                            ass.add(jj);
                            
                        }
                    }
                }
                as = ass;
            }
            return as.size(); */
        }

    }

    public static void main(String[] args) {
        Solution solution = new LCR108().new Solution();
        String s = "rabbbit";
        String t = "rabbit";
        int result = solution.numDistinct(s, t);
        System.out.println(result);
    }
}
