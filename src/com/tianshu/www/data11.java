package com.tianshu.www;
public class data11 extends data1 {
    private String description;
    public data11(int id, String name, double value, String description) {
        super(id, name, value);
        this.description = description;
    }
    public String getDescription() {
        getName();
        return description;
    }   
    @Override 
    public String getName() {
        return "ID: " + getId() + ", Name: " + super.getName() + ", Value: " + getValue() + ", Description: " + description;
    }
}