package com.tianshu.www;

public class wang {
    public String convertToBase7(int num) {
        int s = 0;
        if (num == 0) {
            return "0";
        } else if (num < 0) {
            num = -num;
            s = 1;
        }
        int y = 7;
        StringBuilder a = new StringBuilder();
        int x = 1;
        while (num >= y) {
            y = y * 7;
            x++;
        }
        y = y / 7;
        x--;
        for (int i = x; i > 0; i--) {
            if (num >= y) {
                a.append(num / y);
                num = num - (num / y) * y;
            } else {
                a.append(0);
            }
            y = y / 7;
        }
        a.append(num);
        System.out.println(a.toString());
        if (s == 1) {
            return "-" + a.toString();
        }
        return a.toString();
    }

    public String getSmallestString(int n, int k) {
        StringBuilder sb = new StringBuilder();
        while (k > 0) {
            if(k>=26+n-1){
                sb.append('z');
                k-=26;
                n--;
            }else if(n>1){
                sb.append((char)('a' + (k-n)));
                for(int i=0;i<n-1;i++){
                    sb.append('a');
                }
                k=0;
            }else{
                sb.append((char)('a' + (k-1)));
                k=0;
            }
        }
        //char x=(char)('a' + (k-1));
        //System.out.println(x);
        String a = sb.toString();
        a.toCharArray();
        sb.setLength(0);
        for(int i=a.length()-1;i>=0;i--){
            sb.append(a.charAt(i));
        }
        return sb.toString();
    }

    static public void main(String[] args) {
        /* wang w = new wang();
        w.convertToBase7(100); */
        wang w = new wang();
        System.out.println(w.getSmallestString(3, 29));
    }
}
