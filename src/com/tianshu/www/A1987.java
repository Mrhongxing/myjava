package com.tianshu.www;

import java.util.Arrays;
import java.util.HashSet;

public class A1987 {
    public int numberOfUniqueGoodSubsequences(String binary) {
        char[] a =binary.toCharArray();
        /* int[] b=new int[a.length];
        for(int i=0;i<a.length;i++){
            b[i]=(int)(a[i]-'0');
        }
        int[] dp=new int[a.length+1];
        HashSet<String> str=new HashSet<>();
        
        for(int bb=0;bb<b.length;bb++){
            if(b[bb]==1){
                int count=0;
                for(int bbb=bb+1;bbb<b.length;bbb++){
                    if(b[bbb]==1){
                        str.add(Arrays.copyOfRange(b, bb, bbb).toString());

                        count=0;
                    }else{
                        count++;
                        str.add(Arrays.copyOfRange(b, bb, bbb).toString());
                    }
                }
            }
        } */
       int MOD=1000000007;
       long dp0=0;
        long dp1=0;
       for(char c:a){
            if(c=='0'){
                dp0=(1+dp1+Math.max(dp0-1, 0))%MOD;
            }else{
                dp1=(Math.max(dp0-1, 0)+dp1+1)%MOD;
            }
        }
        return (int)((dp0+dp1+MOD)%MOD);
    }
    public static void main(String[] args) {
        A1987 a1987 =new A1987();
        System.out.println(a1987.numberOfUniqueGoodSubsequences("1110001"));
    }
}
