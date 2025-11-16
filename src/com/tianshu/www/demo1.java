package com.tianshu.www;
import java.util.*;//导入java.util包下的所有类
//import com.tianshu.www.demo2;;//导入www.tianshu.com包下的所有类
public class demo1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);//创建Scanner对象以获取用户输入
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
        scanner.close();
        Random random = new Random();
        int randomNumber = random.nextInt(100)+11; // 生成11到110之间的随机数
        System.out.println("Random number: " + randomNumber);
        switch (randomNumber) {
            case 11:
                System.out.println("wcnm");
                break;
            default:
            System.out.println("其他情况");
                break;
        }
        if (name.equals("hong")) {
            System.err.println("你是红老师");
        }
        int a = 0;
        while (true) {
            if (a==3) {
                break;
            };
            a++;
        }
        int[][] array = {{1,2,3},{4,5,6},{7,8,9}};
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                System.out.print(array[i][j] + " ");
            }
        }
        System.out.println();
        new demo2().xxx();
        System.out.println(new demo2().item);
    }
}
class Innerdemo1 {
    public int displayMessage() {
        System.out.println("This is an inner class example.");
        return 0;
    }
}
class BinarySearch {
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // 等价于 (left + right)/2，避免溢出
            if (nums[mid] == target) {
                return mid; // 找到目标，返回索引
            } else if (nums[mid] < target) {
                left = mid + 1; // 目标在右半区间
            } else {
                right = mid - 1; // 目标在左半区间
            }
        }
        return -1; // 未找到目标
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9};
        System.out.println(search(nums, 5)); // 输出：2（元素 5 的索引）
        System.out.println(search(nums, 2)); // 输出：-1（目标不存在）
    }
}