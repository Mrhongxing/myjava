package com.tianshu.www;
import java.util.*;

public class shu3 {


    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);

        int n = nums.length;

        for (int i = 0; i < n - 2; i++) {
            // 第一个数去重
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }

            int left = i + 1;
            int right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));

                    // 去重
                    while (left < right && nums[left] == nums[left + 1]) {
                        left++;
                    }
                    while (left < right && nums[right] == nums[right - 1]) {
                        right--;
                    }

                    left++;
                    right--;
                }
            }
        }

        return res;
    }
    public void main(String[] args) {
        int[] nums = {-2,-1, 0, 1, 2, -1, -4};
        List<List<Integer>> result = threeSum(nums);
        System.out.println(result);
    }
}

