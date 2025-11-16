package com.tianshu.www;

public class abstracta1 extends abstractb1 {
    private String title;
    private String description;
    public abstracta1(String title, String description) {
        this.title = title;
        this.description = description;
    }
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    @Override
    public void print() {
        System.out.println("Title: " + title);
        System.out.println("Description: " + description);
    }
    @Override
    public void display() {
        System.out.println("Displaying AbstractA1");
    }
}
