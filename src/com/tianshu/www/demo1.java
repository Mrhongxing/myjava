package com.tianshu.www;
import java.util.*;//导入java.util包下的所有类

public class demo1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
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
    }
}
