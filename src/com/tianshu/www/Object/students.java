package com.tianshu.www.Object;

public class students {
    private String name;
    private int age;

    public students(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        students student = (students) obj;

        if (age != student.age) return false;
        return name != null ? name.equals(student.name) : student.name == null;
    }
    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + age;
        return result;
    }

    @Override
    public String toString() {
        return "students{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
