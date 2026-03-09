package com.tianshu.www;

public class wanghong {
    public void main(String[] args) {
        int[] nums = {0,0,0,1, 2, 3, 4, 5};
        solution(nums);
    }
    public void solution(int[] nums) {
        int n = nums.length;
        int i = 0;
        boolean hasZero = false;
        int count = 0;
        while (i < n) {
            hasZero = false;
            if (nums[i] == 0) {
                for (int j = i; j < n - 1; j++) {
                    nums[j] = nums[j + 1];
                }
                nums[n-1] = 0;
                hasZero = true;
            }
            if (hasZero) {
                
            }else {
                i++;
            }
            count++;
            if(count > n) {
                break;
            }
        }
        System.out.println(java.util.Arrays.toString(nums));
    }
}
