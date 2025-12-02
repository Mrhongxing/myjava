package com.tianshu.www.Lock1;

public class mei implements Runnable {
        private int tickets;
         Object obj = new Object();
        public  mei(int ticket) {
            this.tickets = ticket;
        }
        @Override
        public void run() {
            while (tickets>0) {
                tickets=Tickets(tickets);
                //System.out.println("剩余票数：" + tickets);
            }
            
        }
        public synchronized int Tickets(int tickets) {
            System.out.println("剩余票数：" + tickets);
            return tickets-1;
        }
    }
