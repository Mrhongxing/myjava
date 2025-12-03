package com.tianshu.www;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.ListIterator;

public class Collection1 {
    static Collection<Integer> collection = new ArrayList<>();
    static Collection<Integer> collection2 = new ArrayList<>();
    public static void main(String[] args) {
        collection.add(1);
        collection.add(2);
        collection.add(3);
        collection2.add(4);
        collection2.addAll(collection);
        System.out.println(collection2);
        collection2.remove(2);
        System.out.println(collection2);
        System.out.println(collection2.contains(3));
        System.out.println(collection2.size());
        collection2.clear();
        System.out.println(collection2.isEmpty());  
        Integer[] arr = collection  .toArray(new Integer[0]);
        for (Integer i : arr) {
            System.out.println(i);
        }
        Iterator<Integer> xxx = collection.iterator();
        while (xxx.hasNext()) {
            String eleString = xxx.next().toString();
            System.out.println(eleString);
        }
        ListIterator<Integer> listIterator = ((ArrayList<Integer>) collection).listIterator();
        while (listIterator.hasNext()) {
            String eleString = listIterator.next().toString();
            if (eleString.equals("3")) {
                listIterator.add(6);
            }
            System.out.println(eleString);
        }
        System.out.println(collection);
    }
}
