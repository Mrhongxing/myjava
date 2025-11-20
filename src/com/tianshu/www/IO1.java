package com.tianshu.www;

import java.io.File;
import java.io.FileWriter;

public class IO1 {
    public static void main(String[] args) {
        IO1 io1 = new IO1();
        io1.writeFile();
        
    }
    FileWriter fw = null;
    public void writeFile() {
        try {
            File file = new File("test.txt");
            fw = new FileWriter(file);
            fw.write("Hello, World!");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (fw != null) {
                    fw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
