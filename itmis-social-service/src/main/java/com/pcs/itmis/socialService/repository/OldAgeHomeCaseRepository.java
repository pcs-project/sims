package com.pcs.itmis.socialService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.socialService.entity.OldAgeHomeCase;

@Repository
public interface OldAgeHomeCaseRepository extends JpaRepository<OldAgeHomeCase, Long>{

	List<OldAgeHomeCase> findByUserOrganization(Long organizationId);

}
