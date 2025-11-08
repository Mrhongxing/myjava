package com.tianshu.www;
import java.util.*;//导入java.util包下的所有类

public class demo2 {
    String item="This is a demo2 class item.";
    int age;
     public void xxx(){
        System.out.println("This is a method in demo2 class.");
     }
    public static void main(String[] args) {
        List<String> itemList = new ArrayList<>();
        itemList.add("Apple");
        itemList.add("Banana");
        itemList.add("Cherry");

        System.out.println("Item List:");
        for (String item : itemList) {
            System.out.println(item);
        }

        Map<String, Integer> itemPrices = new HashMap<>();
        itemPrices.put("Apple", 3);
        itemPrices.put("Banana", 2);
        itemPrices.put("Cherry", 5);

        System.out.println("\nItem Prices:");
        for (Map.Entry<String, Integer> entry : itemPrices.entrySet()) {
            System.out.println(entry.getKey() + ": $" + entry.getValue());
        }
    }
}