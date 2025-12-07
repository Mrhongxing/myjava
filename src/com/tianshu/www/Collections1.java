package com.tianshu.www;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public record Collections1() {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        List<String> list2 = Arrays.asList("w");
        System.out.println(list2);
        Collections.addAll(list, "A", "B", "C", "D", "E");
        System.out.println("Original list: " + list);
        Collections.reverse(list);
        System.out.println("Reversed list: " + list);
        Collections.shuffle(list);
        System.out.println("Shuffled list: " + list);
        Comparator<String> comparator = new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return o2.compareTo(o1);
            }
        };
        Collections.sort(list, comparator);
        System.out.println("Sorted list with comparator: " + list);
        Collections.sort(list);
        System.out.println("Sorted list: " + list);

    }
    public class student implements Comparable<String> {
        private int Id;
        private String name;
        private int age;
        public student(int id, String name, int age) {
            Id = id;
            this.name = name;
            this.age = age;
        }
        @Override
        public int compareTo(String o) {
            return this.name.compareTo(o);
        }
        
    }
}
