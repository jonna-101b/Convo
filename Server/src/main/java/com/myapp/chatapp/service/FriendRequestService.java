package com.myapp.chatapp.service;

import com.myapp.chatapp.domain.FriendRequest;
import com.myapp.chatapp.domain.User;
import com.myapp.chatapp.repository.FriendRequestRepository;
import com.myapp.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatService chatService;

    public Long sendFriendRequest(Long senderId, Long receiverId) {
        // Validate users exist
        Optional<User> senderOpt = userRepository.findById(senderId);
        Optional<User> receiverOpt = userRepository.findById(receiverId);
        if (senderOpt.isEmpty() || receiverOpt.isEmpty()) {
            return null;
        }

        // Cannot send request to self
        if (senderId.equals(receiverId)) {
            return null;
        }

        // Check if users are already friends
        if (areUsersFriends(senderId, receiverId)) {
            return null;
        }

        // Check if pending request already exists
        if (hasPendingRequest(senderId, receiverId)) {
            return null;
        }

        // Create friend request
        FriendRequest request = new FriendRequest();
        request.setSender(senderOpt.get());
        request.setReceiver(receiverOpt.get());
        request.setStatus(FriendRequest.FriendRequestStatus.PENDING);

        FriendRequest savedRequest = friendRequestRepository.save(request);
        return savedRequest.getId();
    }

    public Long acceptFriendRequestAndCreateChat(Long requestId, Long receiverId) {
        Optional<FriendRequest> requestOpt = friendRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            return null;
        }

        FriendRequest request = requestOpt.get();

        // Validate receiver is the actual receiver
        if (!request.getReceiver().getId().equals(receiverId)) {
            return null;
        }

        // Validate request is pending
        if (request.getStatus() != FriendRequest.FriendRequestStatus.PENDING) {
            return null;
        }

        // Update request status
        request.setStatus(FriendRequest.FriendRequestStatus.ACCEPTED);
        friendRequestRepository.save(request);

        // Create direct chat (this is the ONLY entry point for creating direct chats)
        Long chatId = chatService.createDirectChat(request.getSender().getId(), request.getReceiver().getId());
        return chatId;
    }

    public boolean rejectFriendRequest(Long requestId, Long receiverId) {
        Optional<FriendRequest> requestOpt = friendRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            return false;
        }

        FriendRequest request = requestOpt.get();

        // Validate receiver is the actual receiver
        if (!request.getReceiver().getId().equals(receiverId)) {
            return false;
        }

        // Validate request is pending
        if (request.getStatus() != FriendRequest.FriendRequestStatus.PENDING) {
            return false;
        }

        request.setStatus(FriendRequest.FriendRequestStatus.REJECTED);
        friendRequestRepository.save(request);
        return true;
    }

    public boolean cancelFriendRequest(Long requestId, Long senderId) {
        Optional<FriendRequest> requestOpt = friendRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            return false;
        }

        FriendRequest request = requestOpt.get();

        // Validate sender is the actual sender
        if (!request.getSender().getId().equals(senderId)) {
            return false;
        }

        // Validate request is pending
        if (request.getStatus() != FriendRequest.FriendRequestStatus.PENDING) {
            return false;
        }

        request.setStatus(FriendRequest.FriendRequestStatus.CANCELLED);
        friendRequestRepository.save(request);
        return true;
    }

    public List<FriendRequestData> getPendingRequestsReceived(Long userId) {
        return friendRequestRepository.findByReceiver_IdAndStatus(userId, FriendRequest.FriendRequestStatus.PENDING)
                .stream()
                .map(this::toFriendRequestData)
                .collect(Collectors.toList());
    }

    public List<FriendRequestData> getPendingRequestsSent(Long userId) {
        return friendRequestRepository.findBySender_IdAndStatus(userId, FriendRequest.FriendRequestStatus.PENDING)
                .stream()
                .map(this::toFriendRequestData)
                .collect(Collectors.toList());
    }

    public List<FriendRequestData> getAllRequestsForUser(Long userId) {
        List<FriendRequest> sent = friendRequestRepository.findBySender_Id(userId);
        List<FriendRequest> received = friendRequestRepository.findByReceiver_Id(userId);
        
        List<FriendRequest> all = new java.util.ArrayList<>();
        all.addAll(sent);
        all.addAll(received);
        
        return all.stream()
                .map(this::toFriendRequestData)
                .collect(Collectors.toList());
    }

    public FriendRequestData getFriendRequestById(Long requestId) {
        return friendRequestRepository.findById(requestId)
                .map(this::toFriendRequestData)
                .orElse(null);
    }

    public boolean friendRequestExists(Long userId1, Long userId2) {
        Optional<FriendRequest> request1 = friendRequestRepository.findBySender_IdAndReceiver_Id(userId1, userId2);
        Optional<FriendRequest> request2 = friendRequestRepository.findBySender_IdAndReceiver_Id(userId2, userId1);
        return request1.isPresent() || request2.isPresent();
    }

    public List<Long> getFriendsList(Long userId) {
        // Get all accepted requests where user is sender or receiver
        List<FriendRequest> acceptedAsSender = friendRequestRepository.findBySender_IdAndStatus(
                userId, FriendRequest.FriendRequestStatus.ACCEPTED);
        List<FriendRequest> acceptedAsReceiver = friendRequestRepository.findByReceiver_IdAndStatus(
                userId, FriendRequest.FriendRequestStatus.ACCEPTED);

        List<Long> friends = new java.util.ArrayList<>();
        
        // Add receivers from requests where user is sender
        for (FriendRequest request : acceptedAsSender) {
            friends.add(request.getReceiver().getId());
        }
        
        // Add senders from requests where user is receiver
        for (FriendRequest request : acceptedAsReceiver) {
            friends.add(request.getSender().getId());
        }
        
        return friends;
    }

    public boolean hasPendingRequest(Long senderId, Long receiverId) {
        List<FriendRequest> requests = friendRequestRepository.findBySender_IdAndReceiver_IdAndStatus(
                senderId, receiverId, FriendRequest.FriendRequestStatus.PENDING);
        return !requests.isEmpty();
    }

    public boolean areUsersFriends(Long userId1, Long userId2) {
        List<FriendRequest> accepted1 = friendRequestRepository.findBySender_IdAndReceiver_IdAndStatus(
                userId1, userId2, FriendRequest.FriendRequestStatus.ACCEPTED);
        List<FriendRequest> accepted2 = friendRequestRepository.findBySender_IdAndReceiver_IdAndStatus(
                userId2, userId1, FriendRequest.FriendRequestStatus.ACCEPTED);
        return !accepted1.isEmpty() || !accepted2.isEmpty();
    }

    public boolean canAcceptAndCreateChat(Long requestId, Long receiverId) {
        Optional<FriendRequest> requestOpt = friendRequestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            return false;
        }

        FriendRequest request = requestOpt.get();
        
        // Validate receiver is the actual receiver
        if (!request.getReceiver().getId().equals(receiverId)) {
            return false;
        }

        // Validate request is pending
        if (request.getStatus() != FriendRequest.FriendRequestStatus.PENDING) {
            return false;
        }

        // Validate users are not already friends
        if (areUsersFriends(request.getSender().getId(), request.getReceiver().getId())) {
            return false;
        }

        return true;
    }

    private FriendRequestData toFriendRequestData(FriendRequest request) {
        return new FriendRequestData(
                request.getId(),
                request.getSender().getId(),
                request.getSender().getUsername(),
                request.getReceiver().getId(),
                request.getReceiver().getUsername(),
                request.getStatus().name(),
                request.getCreatedAt(),
                request.getUpdatedAt()
        );
    }

    public record FriendRequestData(
            Long id,
            Long senderId,
            String senderUsername,
            Long receiverId,
            String receiverUsername,
            String status,
            java.time.Instant createdAt,
            java.time.Instant updatedAt
    ) {}
}
