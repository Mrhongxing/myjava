package com.tianshu.www.Lock1;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;



public class mei implements Runnable {
        private int tickets;
         Object obj = new Object();
         Lock Lock1 = new ReentrantLock();
        public  mei(int ticket) {
            this.tickets = ticket;
        }
        @Override
        public void run() {
            while (tickets>0) {
                Lock1.lock();
                try {
                    tickets=Tickets(tickets);
                } finally {
                    Lock1.unlock();
                }
                //System.out.println("剩余票数：" + tickets);
            }
            
        }
        public synchronized int Tickets(int tickets) {
            System.out.println("剩余票数：" + tickets);
            return tickets-1;
        }
    }
