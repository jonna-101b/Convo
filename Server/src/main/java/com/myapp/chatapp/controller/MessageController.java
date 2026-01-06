package com.myapp.chatapp.controller;

import com.myapp.chatapp.controller.dto.EditMessageRequest;
import com.myapp.chatapp.controller.dto.SendFileMessageRequest;
import com.myapp.chatapp.controller.dto.SendMessageRequest;
import com.myapp.chatapp.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<Long> sendMessage(@Valid @RequestBody SendMessageRequest request) {
        Long senderId = SecurityUtil.getCurrentUserId();
        Long messageId = messageService.sendTextMessage(request.chatId(), senderId, request.content());

        return messageId != null
                ? ResponseEntity.status(HttpStatus.CREATED).body(messageId)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/file")
    public ResponseEntity<Long> sendFileMessage(@Valid @RequestBody SendFileMessageRequest request) {
        Long senderId = SecurityUtil.getCurrentUserId();
        Long messageId = messageService.sendFileMessage(
                request.chatId(),
                senderId,
                request.content(),
                request.messageType(),
                request.fileMetadataId()
        );

        return messageId != null
                ? ResponseEntity.status(HttpStatus.CREATED).body(messageId)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<MessageService.MessageData> getMessageById(@PathVariable Long messageId) {
        Long userId = SecurityUtil.getCurrentUserId();
        return messageService.getMessageById(messageId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<MessageService.MessageData>> getMessagesForChat(
            @PathVariable Long chatId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(messageService.getMessagesForChat(chatId, userId, page, size));
    }

    @GetMapping("/chat/{chatId}/active")
    public ResponseEntity<List<MessageService.MessageData>> getActiveMessagesForChat(
            @PathVariable Long chatId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(messageService.getActiveMessagesForChat(chatId, userId, page, size));
    }

    @GetMapping("/chat/{chatId}/recent")
    public ResponseEntity<List<MessageService.MessageData>> getRecentMessages(
            @PathVariable Long chatId,
            @RequestParam(defaultValue = "20") int limit) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(messageService.getRecentMessages(chatId, userId, limit));
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<Void> editMessage(
            @PathVariable Long messageId,
            @Valid @RequestBody EditMessageRequest request) {
        Long senderId = SecurityUtil.getCurrentUserId();
        boolean edited = messageService.editMessage(messageId, senderId, request.content());
        return edited ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean deleted = messageService.deleteMessage(messageId, userId);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/sent")
    public ResponseEntity<List<MessageService.MessageData>> getMySentMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Long senderId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(messageService.getMessagesBySender(senderId, page, size));
    }
}

