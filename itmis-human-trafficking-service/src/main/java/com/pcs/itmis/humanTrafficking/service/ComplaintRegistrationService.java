package com.pcs.itmis.humanTrafficking.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.humanTrafficking.entity.ComplaintRegistration;
import com.pcs.itmis.humanTrafficking.model.Organization;
import com.pcs.itmis.humanTrafficking.repository.ComplaintRegistrationRepository;
import com.pcs.itmis.humanTrafficking.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ComplaintRegistrationService {
	@Autowired
	private ComplaintRegistrationRepository complaintRegistrationRepository;

	@Autowired
	private SecurityService securityService;

	public void save(ComplaintRegistration complaintRegistration) {
		complaintRegistration.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		complaintRegistration.setUserOrganization(organization.getOrganizationId());
		complaintRegistration.setEntryDate(LocalDate.now());
		complaintRegistrationRepository.save(complaintRegistration);
	}

	public ComplaintRegistration getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return complaintRegistrationRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter,
				organization.getOrganizationId());
	}

	public void update(ComplaintRegistration nDetails) {
		ComplaintRegistration oDetails = Optional
				.ofNullable(complaintRegistrationRepository.findById(nDetails.getComplaintRegistrationId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		//oDetails.setEntryDate(LocalDate.now());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		complaintRegistrationRepository.save(oDetails);
	}

	public ComplaintRegistration getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return complaintRegistrationRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Disabled Service");
		return complaintRegistrationRepository.findMaxSynchronizedDate();
	}

	public List<ComplaintRegistration> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of Disabled Service");
		return complaintRegistrationRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of Disabled Service");

		List<ComplaintRegistration> allDisabledList = complaintRegistrationRepository.findAllBetweenFromAndToDate(fromDate,
				toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			complaintRegistrationRepository.save(disabledModule);
		});

	}

	@Transactional
	public void revertData(ComplaintRegistration nDetails) {
		ComplaintRegistration oDetails = complaintRegistrationRepository.getDataByFiscalYearAndQuarter(
				nDetails.getFiscalYear(), nDetails.getQuarter(), nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		complaintRegistrationRepository.save(oDetails);
	}
}
