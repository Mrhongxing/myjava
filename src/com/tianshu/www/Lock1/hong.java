package com.tianshu.www.Lock1;

import java.util.concurrent.Callable;

public class hong implements Callable<Integer> {
    private int tickets;

    public hong(int ticket) {
        this.tickets = ticket;
    }

    @Override
    public Integer call() throws Exception {
        while (tickets > 0) {
            tickets = Tickets(tickets);
        }
        return tickets;
    }

    public synchronized int Tickets(int tickets) {
        System.out.println("剩余票数：" + tickets);
        return tickets - 1;
    }
    
}
