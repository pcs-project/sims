package com.pcs.itmis.socialService.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.socialService.entity.ChildHomeCase;
import com.pcs.itmis.socialService.model.Organization;
import com.pcs.itmis.socialService.repository.ChildHomeCaseRepository;
import com.pcs.itmis.socialService.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChildHomeCaseService {

	@Autowired
	private ChildHomeCaseRepository caseRepository;

	@Autowired
	private SecurityService securityService;

	public void save(ChildHomeCase details) {
		details.setEntryBy(LoggedUserDetails.getLoggedUser());
		details.setEntryDate(LocalDate.now());

		// if (details.getTipDetails() != null) {
		details.getTipDetails().setChildHomeCase(details);
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

	public List<ChildHomeCase> getAllList() {
		return caseRepository.findAll();
	}

	public List<ChildHomeCase> getAllListByOrganization() {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return caseRepository.findByUserOrganization(organization.getOrganizationId());
	}

	public ChildHomeCase getById(Long childHomeCaseId) {
		return caseRepository.findById(childHomeCaseId).get();
	}

	public void update(ChildHomeCase nDetails) {
		ChildHomeCase oDetails = Optional.ofNullable(caseRepository.findById(nDetails.getChildHomeCaseId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.copyData(nDetails);

		oDetails.setTipDetails(nDetails.getTipDetails());
		oDetails.getTipDetails().setChildHomeCase(nDetails);

		caseRepository.save(oDetails);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of ChildHomeCase Service");
		return caseRepository.findMaxSynchronizedDate();
	}

	public List<ChildHomeCase> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of ChildHomeCase Service");
		return caseRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of ChildHomeCase Service");

		List<ChildHomeCase> allDisabledList = caseRepository.findAllBetweenFromAndToDate(fromDate, toDate);

		allDisabledList.forEach(caseHome -> {
			caseHome.setSynchronizedDate(LocalDate.now());
			caseRepository.save(caseHome);
		});

	}
}
