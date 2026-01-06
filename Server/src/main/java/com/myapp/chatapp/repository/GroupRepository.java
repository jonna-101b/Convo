package com.myapp.chatapp.repository;

import com.myapp.chatapp.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    Optional<Group> findByChat_Id(Long chatId);

    List<Group> findByName(String name);
}

