package com.myapp.chatapp.controller;

import com.myapp.chatapp.controller.dto.SendFriendRequestRequest;
import com.myapp.chatapp.service.FriendRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendController {

    private final FriendRequestService friendRequestService;

    public FriendController(FriendRequestService friendRequestService) {
        this.friendRequestService = friendRequestService;
    }

    @PostMapping("/requests")
    public ResponseEntity<FriendRequestService.FriendRequestData> sendFriendRequest(
            @Valid @RequestBody SendFriendRequestRequest request) {
        Long senderId = SecurityUtil.getCurrentUserId();
        Long requestId = friendRequestService.sendFriendRequest(senderId, request.receiverId());

        if (requestId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        FriendRequestService.FriendRequestData friendRequest = friendRequestService.getFriendRequestById(requestId);
        return friendRequest != null
                ? ResponseEntity.status(HttpStatus.CREATED).body(friendRequest)
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping("/requests/{requestId}/accept")
    public ResponseEntity<Long> acceptFriendRequest(@PathVariable Long requestId) {
        Long receiverId = SecurityUtil.getCurrentUserId();
        Long chatId = friendRequestService.acceptFriendRequestAndCreateChat(requestId, receiverId);

        return chatId != null
                ? ResponseEntity.ok(chatId)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/requests/{requestId}/reject")
    public ResponseEntity<Void> rejectFriendRequest(@PathVariable Long requestId) {
        Long receiverId = SecurityUtil.getCurrentUserId();
        boolean rejected = friendRequestService.rejectFriendRequest(requestId, receiverId);
        return rejected ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/requests/{requestId}")
    public ResponseEntity<Void> cancelFriendRequest(@PathVariable Long requestId) {
        Long senderId = SecurityUtil.getCurrentUserId();
        boolean cancelled = friendRequestService.cancelFriendRequest(requestId, senderId);
        return cancelled ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/requests/pending/received")
    public ResponseEntity<List<FriendRequestService.FriendRequestData>> getPendingRequestsReceived() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(friendRequestService.getPendingRequestsReceived(userId));
    }

    @GetMapping("/requests/pending/sent")
    public ResponseEntity<List<FriendRequestService.FriendRequestData>> getPendingRequestsSent() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(friendRequestService.getPendingRequestsSent(userId));
    }

    @GetMapping("/requests")
    public ResponseEntity<List<FriendRequestService.FriendRequestData>> getAllRequests() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(friendRequestService.getAllRequestsForUser(userId));
    }

    @GetMapping("/requests/{requestId}")
    public ResponseEntity<FriendRequestService.FriendRequestData> getFriendRequestById(@PathVariable Long requestId) {
        FriendRequestService.FriendRequestData friendRequest = friendRequestService.getFriendRequestById(requestId);
        return friendRequest != null
                ? ResponseEntity.ok(friendRequest)
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<Long>> getFriendsList() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(friendRequestService.getFriendsList(userId));
    }
}

