package com.myapp.chatapp.repository;

import com.myapp.chatapp.domain.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {

    List<ProfilePicture> findByUser_Id(Long userId);

    List<ProfilePicture> findByGroup_Id(Long groupId);
}

