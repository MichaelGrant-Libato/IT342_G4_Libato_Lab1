package com.example.backend.Service;

import com.example.backend.Entity.UserEntity;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity registerUser(UserEntity userEntity){
        if(userRepository.findByEmail(userEntity.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        if(userRepository.findByUsername(userEntity.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }
            return userRepository.save(userEntity);
        }

    public UserEntity loginUser(String identifier, String password){
        Optional<UserEntity> userEmail = userRepository.findByEmail(identifier);
        Optional<UserEntity> userName = userRepository.findByUsername(identifier);

        UserEntity user = null;

        if(userEmail.isPresent()){
            user = userEmail.get();
        }else if(userName.isPresent()){
            user=userName.get();
        }

        if(user!=null){
            if(user.getPassword().equals(password)){
                return user;
            }
        }
            return null;
    }
}