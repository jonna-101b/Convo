package com.myapp.chatapp.repository;

import com.myapp.chatapp.domain.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    List<ChatParticipant> findByUser_Id(Long userId);

    List<ChatParticipant> findByChat_Id(Long chatId);

    Optional<ChatParticipant> findByUser_IdAndChat_Id(Long userId, Long chatId);

    List<ChatParticipant> findByChat_IdAndIsActive(Long chatId, Boolean isActive);

    List<ChatParticipant> findByChat_IdAndIsActiveTrue(Long chatId);
}

