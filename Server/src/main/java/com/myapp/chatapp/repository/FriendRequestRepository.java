package com.myapp.chatapp.repository;

import com.myapp.chatapp.domain.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    List<FriendRequest> findBySender_Id(Long senderId);

    List<FriendRequest> findByReceiver_Id(Long receiverId);

    Optional<FriendRequest> findBySender_IdAndReceiver_Id(Long senderId, Long receiverId);

    List<FriendRequest> findByStatus(FriendRequest.FriendRequestStatus status);

    List<FriendRequest> findBySender_IdAndReceiver_IdAndStatus(Long senderId, Long receiverId, FriendRequest.FriendRequestStatus status);

    List<FriendRequest> findByReceiver_IdAndStatus(Long receiverId, FriendRequest.FriendRequestStatus status);

    List<FriendRequest> findBySender_IdAndStatus(Long senderId, FriendRequest.FriendRequestStatus status);
}

