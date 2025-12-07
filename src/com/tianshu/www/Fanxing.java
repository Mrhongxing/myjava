package com.tianshu.www;

public class Fanxing<E> {
    private E e;
    Object obj = new Object[10];
    int size;
    
    public Fanxing(E e) {
        this.e = e;
    }

    public E getE() {
        return e;
    }

    public void setE(E e) {
        this.e = e;
    }
    
}
