package com.myapp.chatapp.controller;

import com.myapp.chatapp.controller.dto.AddParticipantRequest;
import com.myapp.chatapp.controller.dto.ChangeRoleRequest;
import com.myapp.chatapp.controller.dto.CreateGroupChatRequest;
import com.myapp.chatapp.controller.dto.UpdateGroupRequest;
import com.myapp.chatapp.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/groups")
    public ResponseEntity<Long> createGroupChat(@Valid @RequestBody CreateGroupChatRequest request) {
        Long creatorId = SecurityUtil.getCurrentUserId();
        Long chatId = chatService.createGroupChat(
                creatorId,
                request.groupName(),
                request.description(),
                request.initialMemberIds()
        );
        return chatId != null
                ? ResponseEntity.status(HttpStatus.CREATED).body(chatId)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<ChatService.ChatData> getChatById(@PathVariable Long chatId) {
        return chatService.getChatById(chatId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ChatService.ChatData>> getMyChats() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(chatService.getChatsForUser(userId));
    }

    @GetMapping("/direct/{userId}")
    public ResponseEntity<ChatService.ChatData> getDirectChat(@PathVariable Long userId) {
        Long currentUserId = SecurityUtil.getCurrentUserId();
        return chatService.getDirectChat(currentUserId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{chatId}/participants")
    public ResponseEntity<Void> addParticipant(
            @PathVariable Long chatId,
            @Valid @RequestBody AddParticipantRequest request) {
        Long addedByUserId = SecurityUtil.getCurrentUserId();
        boolean added = chatService.addParticipantToGroup(chatId, request.userId(), addedByUserId);
        return added ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/{chatId}/participants/{userId}")
    public ResponseEntity<Void> removeParticipant(
            @PathVariable Long chatId,
            @PathVariable Long userId) {
        Long removedByUserId = SecurityUtil.getCurrentUserId();
        boolean removed = chatService.removeParticipantFromGroup(chatId, userId, removedByUserId);
        return removed ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping("/{chatId}/group")
    public ResponseEntity<Void> updateGroupInfo(
            @PathVariable Long chatId,
            @Valid @RequestBody UpdateGroupRequest request) {
        Long updatedByUserId = SecurityUtil.getCurrentUserId();
        boolean updated = chatService.updateGroupInfo(
                chatId,
                request.groupName(),
                request.description(),
                updatedByUserId
        );
        return updated ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping("/{chatId}/participants/role")
    public ResponseEntity<Void> changeParticipantRole(
            @PathVariable Long chatId,
            @Valid @RequestBody ChangeRoleRequest request) {
        Long changedByUserId = SecurityUtil.getCurrentUserId();
        boolean changed = chatService.changeParticipantRole(
                chatId,
                request.userId(),
                request.role(),
                changedByUserId
        );
        return changed ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/{chatId}/leave")
    public ResponseEntity<Void> leaveGroupChat(@PathVariable Long chatId) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean left = chatService.leaveGroupChat(chatId, userId);
        return left ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/{chatId}/participants")
    public ResponseEntity<List<ChatService.ParticipantData>> getParticipants(@PathVariable Long chatId) {
        return ResponseEntity.ok(chatService.getChatParticipants(chatId));
    }

    @GetMapping("/{chatId}/participants/active")
    public ResponseEntity<List<ChatService.ParticipantData>> getActiveParticipants(@PathVariable Long chatId) {
        return ResponseEntity.ok(chatService.getActiveChatParticipants(chatId));
    }
}

