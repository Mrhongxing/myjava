package com.tianshu.www;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class kaitou {
    public void qukaitou(String[] lists) {
        ArrayList<Character> arrayList = new ArrayList<>();
        boolean hasdifferent = true;
        int y= 0;
        for (String list : lists) {
            if (arrayList.size()==0) {
                    for (int i = 0; i < list.length(); i++) {
                        arrayList.add(list.charAt(i));
                    }
                }else {
            if (list.length()<arrayList.size()) {
                for (int j = list.length(); j < arrayList.size(); j++) {
                    arrayList.remove(j);
                }
            }
            for(int i = 0; i < list.length(); i++) {
                hasdifferent = false;
                y++;
                System.out.println(list.charAt(i) + " " + arrayList.get(i));
                    if (list.charAt(i) == arrayList.get(i)) {
                        if (hasdifferent) {
                            arrayList.remove(i);
                        }

                    }else {
                        hasdifferent = true;
                        break;
                        
                    }
                
            }
            arrayList.subList(y, arrayList.size()).clear();
        }
            
        }
        String str1 = arrayList.stream()
                      .map(String::valueOf)
                      .collect(Collectors.joining());
System.out.println(str1); // Hello
    }
    public static void main(String[] args) {
        String[] lists = {"goge", "goae", "goae"};
        kaitou kaitou = new kaitou();
        kaitou.qukaitou(lists);
    }
}
