package com.tianshu.www;

import java.security.MessageDigest;
import java.util.Arrays;

public class message {
    
    /**
     * 生成企业微信签名
     */
    public static String generateSignature(String token, String timestamp, String nonce, String echostr) {
        try {
            String[] array = new String[]{token, timestamp, nonce, echostr};
            Arrays.sort(array);
            
            StringBuilder sb = new StringBuilder();
            for (String s : array) {
                sb.append(s);
            }
            String combined = sb.toString();
            
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] digest = md.digest(combined.getBytes("UTF-8"));
            
            StringBuilder hexStr = new StringBuilder();
            for (byte b : digest) {
                String shaHex = Integer.toHexString(b & 0xFF);
                if (shaHex.length() < 2) {
                    hexStr.append(0);
                }
                hexStr.append(shaHex);
            }
            return hexStr.toString();
            
        } catch (Exception e) {
            throw new RuntimeException("生成签名失败", e);
        }
    }
    
    public static void main(String[] args) {
        // 测试生成签名
        String token = "tt57AGVdfzsFKfpGtBUngD8c3";
        String timestamp = "13500001234";
        String nonce = "123412323"; 
        String echostr = "hello";
        
        String signature = generateSignature(token, timestamp, nonce, echostr);
        
        System.out.println("=== 企业微信签名测试 ===");
        System.out.println("Token: " + token);
        System.out.println("Timestamp: " + timestamp);
        System.out.println("Nonce: " + nonce);
        System.out.println("Echostr: " + echostr);
        System.out.println("生成的签名: " + signature);
        System.out.println("测试URL:");
        System.out.println("curl \"http://localhost:8080/?msg_signature=" + signature + 
                          "&timestamp=" + timestamp + "&nonce=" + nonce + "&echostr=" + echostr + "\"");
    }
}