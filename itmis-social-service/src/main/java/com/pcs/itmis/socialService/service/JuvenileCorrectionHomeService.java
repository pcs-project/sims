package com.pcs.itmis.socialService.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.socialService.entity.JuvenileCorrectionHome;
import com.pcs.itmis.socialService.model.Organization;
import com.pcs.itmis.socialService.repository.JuvenileCorrectionHomeRepository;
import com.pcs.itmis.socialService.utils.LoggedUserDetails;

@Service
public class JuvenileCorrectionHomeService {

	@Autowired
	private JuvenileCorrectionHomeRepository caseRepository;

	@Autowired
	private SecurityService securityService;

	public void save(JuvenileCorrectionHome details) {
		details.setEntryBy(LoggedUserDetails.getLoggedUser());
		details.setEntryDate(LocalDate.now());

		// if (details.getTipDetails() != null) {
		details.getTipDetails().setJuvenileCorrectionHome(details);
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

	public List<JuvenileCorrectionHome> getAllList() {
		return caseRepository.findAll();
	}

	public List<JuvenileCorrectionHome> getAllListByOrganization() {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return caseRepository.findByUserOrganization(organization.getOrganizationId());
	}

	public JuvenileCorrectionHome getById(Long juvenileCorrectionHomeId) {
		return caseRepository.findById(juvenileCorrectionHomeId).get();
	}

	public void update(JuvenileCorrectionHome nDetails) {
		JuvenileCorrectionHome oDetails = Optional
				.ofNullable(caseRepository.findById(nDetails.getJuvenileCorrectionHomeId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.copyData(nDetails);

		oDetails.setTipDetails(nDetails.getTipDetails());
		oDetails.getTipDetails().setJuvenileCorrectionHome(nDetails);

		caseRepository.save(oDetails);
	}

}
