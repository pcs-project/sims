package com.pcs.itmis.socialService.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.socialService.entity.ChildHomeCase;
import com.pcs.itmis.socialService.entity.ShelterHomeCase;
import com.pcs.itmis.socialService.model.Organization;
import com.pcs.itmis.socialService.repository.ShelterHomeCaseRepository;
import com.pcs.itmis.socialService.utils.LoggedUserDetails;

@Service
public class ShelterHomeCaseService {

	@Autowired
	private ShelterHomeCaseRepository caseRepository;

	@Autowired
	private SecurityService securityService;

	public void save(ShelterHomeCase details) {
		details.setEntryBy(LoggedUserDetails.getLoggedUser());
		details.setEntryDate(LocalDate.now());

		// if (details.getTipDetails() != null) {
		details.getTipDetails().setShelterHomeCase(details);
		details.getTipDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
		details.getTipDetails().setEntryDate(LocalDate.now());
		// }
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		details.setUserOrganization(organization.getOrganizationId());
		caseRepository.save(details);
	}

	public List<ShelterHomeCase> getAllList() {
		return caseRepository.findAll();
	}

	public List<ShelterHomeCase> getAllListByOrganization() {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return caseRepository.findByUserOrganization(organization.getOrganizationId());
	}

	public ShelterHomeCase getById(Long shelterHomeCaseId) {
		return caseRepository.findById(shelterHomeCaseId).get();
	}

	public void update(ShelterHomeCase nDetails) {
		ShelterHomeCase oDetails = Optional.ofNullable(caseRepository.findById(nDetails.getShelterHomeCaseId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.copyData(nDetails);

		oDetails.setTipDetails(nDetails.getTipDetails());
		oDetails.getTipDetails().setShelterHomeCase(nDetails);

		caseRepository.save(oDetails);
	}
}
