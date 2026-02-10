package com.example.backend.Repository;

import com.example.backend.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // The "Smart Login" Query: Checks if input matches EITHER username OR email
    @Query("SELECT u FROM UserEntity u WHERE u.username = :input OR u.email = :input")
    Optional<UserEntity> findByUsernameOrEmail(@Param("input") String input);

    // Checks for Registration to prevent duplicates
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}