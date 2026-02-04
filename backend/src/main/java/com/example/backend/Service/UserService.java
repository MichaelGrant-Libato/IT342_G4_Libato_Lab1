package com.example.backend.Service;

// --- FIXED IMPORTS (Matching your Capitalized Folders) ---
import com.example.backend.DTO.LoginRequest;
import com.example.backend.DTO.RegisterRequest;
import com.example.backend.Entity.UserEntity;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register Logic
    public UserEntity registerUser(RegisterRequest request) {
        // 1. Check if username exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        // 2. Create and Populate User
        UserEntity newUser = new UserEntity();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword()); // Plain text
        newUser.setEmail(request.getEmail());

        // 3. Save to DB
        return userRepository.save(newUser);
    }

    // Login Logic
    public UserEntity loginUser(LoginRequest request) {
        // 1. Find the user
        UserEntity user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check Password
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }
}