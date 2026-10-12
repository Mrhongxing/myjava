package com.tianshu.www;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class A940 {
    public int distinctSubseqII(String s) {
        char[] a = s.toCharArray();
        /* int[][] b =new int[a.length+1][a.length+1];
        for(int i=1;i<=a.length;i++){
            b[i-1][0]=1;
        }
        for(int i=1;i<=a.length;i++){
            for(int j=1;j<=a.length;j++){
            if(a[i-1]==a[j-1]){
                b[i][j]=b[i-1][j-1]+b[i][j-1];
            }
            else{
                b[i][j]=b[i][j-1];
            }
        }
        } */
       long[] b =new long[a.length+1];
       List<Long> c =new ArrayList<>();
       HashMap<Character,List<Long>> temp =new HashMap<>();
       /* for(int y=0;y<a.length;y++){
            if(temp.containsKey(a[y])){
                temp.get(a[y]).add(y);
            }else{
                List<Integer> tt=new ArrayList<>();
                temp.put(a[y], tt);
            }
       } */
       b[0]=0L;
       b[1]=1L;
       List<Long> aaa =new ArrayList<>();
       aaa.add(0L);
       temp.put(a[0], aaa);
       for(int i=2;i<=a.length;i++){
        Long yy=0L;
            for(int j=1;j<i;j++){
                yy+=b[j];
            }
            if(temp.containsKey(a[i-1])){
                for(int x=0;x<temp.get(a[i-1]).size();x++){
                    //if(x==temp.get(a[i-1]).size()-1){
                        yy-=b[(int)(temp.get(a[i-1]).get(x)+1)];
                    //}
                    /* else{
                        yy--;
                    } */
                }
                temp.get(a[i-1]).add((long)(i-1));
                c.add((long)(i-1));
            }else{
                List<Long> bbb =new ArrayList<>();
                bbb.add((long)(i-1));
                temp.put(a[i-1], bbb);
            }
            b[i]=1+yy;
       }
        int count=0;
        for( long xxxxx:b){
            count=(count+(int)xxxxx)%1000000007;
        }
        return count;
    }

    public static void main(String[] args) {
        A940 a = new A940();
        System.out.println(a.distinctSubseqII("zchmliaqdgvwncfatcfivphddpzjkgyygueikthqzyeeiebczqbqhdytkoawkehkbizdmcnilcjjlpoeoqqoqpswtqdpvszfaksn"));
    }
}
