package com.example.backend.DTO;

public class LoginRequest {
    private String username;
    private String password;

    // Getters and Setters...
    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getPassword() { return password; }
    public void setPassword(String p) { this.password = p; }
}