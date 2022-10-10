package com.pcs.itmis.socialService.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.socialService.entity.OldAgeHomeCase;
import com.pcs.itmis.socialService.model.Organization;
import com.pcs.itmis.socialService.repository.OldAgeHomeCaseRepository;
import com.pcs.itmis.socialService.utils.LoggedUserDetails;

@Service
public class OldAgeHomeCaseService {

	@Autowired
	private OldAgeHomeCaseRepository caseRepository;

	@Autowired
	private SecurityService securityService;

	public void save(OldAgeHomeCase details) {
		details.setEntryBy(LoggedUserDetails.getLoggedUser());
		details.setEntryDate(LocalDate.now());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		details.setUserOrganization(organization.getOrganizationId());
		caseRepository.save(details);
	}

	public List<OldAgeHomeCase> getAllList() {
		return caseRepository.findAll();
	}

	public List<OldAgeHomeCase> getAllListByOrganization() {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return caseRepository.findByUserOrganization(organization.getOrganizationId());
	}

	public OldAgeHomeCase getById(Long oldAgeHomeCaseId) {
		return caseRepository.findById(oldAgeHomeCaseId).get();
	}

	public void update(OldAgeHomeCase nDetails) {
		OldAgeHomeCase oDetails = Optional.ofNullable(caseRepository.findById(nDetails.getOldAgeHomeCaseId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.copyData(nDetails);
		caseRepository.save(oDetails);
	}
}
