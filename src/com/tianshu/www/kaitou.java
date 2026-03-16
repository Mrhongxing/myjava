package com.tianshu.www;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class kaitou {
    public void qukaitou(String[] lists) {
        ArrayList<Character> arrayList = new ArrayList<>();
        boolean hasdifferent = true;
        int y= 0;
        for (String list : lists) {
            y = 0;
            if (arrayList.size()==0) {
                    for (int i = 0; i < list.length(); i++) {
                        arrayList.add(list.charAt(i));
                    }
                }else {
            if (list.length()<arrayList.size()) {
                arrayList.subList(list.length(), arrayList.size()).clear();
            }
            for(int i = 0; i < arrayList.size(); i++) {
                hasdifferent = false;
                
                System.out.println(list.charAt(i) + " " + arrayList.get(i));
                    if (list.charAt(i) == arrayList.get(i)) {
                        if (hasdifferent) {
                            arrayList.remove(i);
                        }
                        y++;
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
        String[] lists = {"goaesss", "goaesss", "goaesa"};
        kaitou kaitou = new kaitou();
        kaitou.qukaitou(lists);
    }
}
