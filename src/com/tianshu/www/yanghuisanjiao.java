package com.tianshu.www;
import java.util.ArrayList;
import java.util.List;

public class yanghuisanjiao {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();
        if (numRows == 0) {
            return triangle;
        }
        triangle.add(new ArrayList<>());
        triangle.get(0).add(0, 1);
        for (int i = 1; i < numRows; i++) {
            triangle.add(new ArrayList<>());
            triangle.get(i).add(0, 1);
            for (int j = 1; j < i; j++) {
                triangle.get(i).add(j, triangle.get(i - 1).get(j - 1) + triangle.get(i - 1).get(j));
            }
            triangle.get(i).add(i, 1);
        }
        return triangle;
    }
    public static void main(String[] args) {
        yanghuisanjiao yanghuisanjiao = new yanghuisanjiao();
        List<List<Integer>> generate = yanghuisanjiao.generate(5);
        for (List<Integer> list : generate) {
            System.out.println(list);
        }
    }
}