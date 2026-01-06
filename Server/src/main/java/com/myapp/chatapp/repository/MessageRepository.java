package com.myapp.chatapp.repository;

import com.myapp.chatapp.domain.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByChat_Id(Long chatId);

    Page<Message> findByChat_Id(Long chatId, Pageable pageable);

    List<Message> findBySender_Id(Long senderId);

    List<Message> findByChat_IdOrderByCreatedAtDesc(Long chatId);

    Page<Message> findByChat_IdOrderByCreatedAtDesc(Long chatId, Pageable pageable);

    List<Message> findByChat_IdAndIsDeletedFalseOrderByCreatedAtDesc(Long chatId);

    Page<Message> findByChat_IdAndIsDeletedFalseOrderByCreatedAtDesc(Long chatId, Pageable pageable);
}

