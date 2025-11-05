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
    }
}
class Innerdemo1 {
    public int displayMessage() {
        System.out.println("This is an inner class example.");
        return 0;
    }
}
