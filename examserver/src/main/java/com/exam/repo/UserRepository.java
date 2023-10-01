package com.exam.repo;

import com.exam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

//JpaRepository:  It contains the full API of CrudRepository and PagingAndSortingRepository.
public interface UserRepository extends JpaRepository<User, Long> {
                                                    //entity, type
    public User findByUsername(String username);
}
