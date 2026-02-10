package com.example.backend.Service;

import com.example.backend.DTO.LoginRequest;
import com.example.backend.Entity.UserEntity;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity registerUser(UserEntity userEntity) {
        if (userRepository.existsByEmail(userEntity.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.existsByUsername(userEntity.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        return userRepository.save(userEntity);
    }

    public UserEntity loginUser(LoginRequest loginRequest) {
        // Uses the Smart Query
        Optional<UserEntity> userOpt = userRepository.findByUsernameOrEmail(loginRequest.getIdentifier());

        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return user;
            }
        }
        return null;
    }
}