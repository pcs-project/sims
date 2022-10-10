package com.pcs.itmis.seniorCitizen.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.seniorCitizen.entity.SeniorCitizen;
import com.pcs.itmis.seniorCitizen.model.Organization;
import com.pcs.itmis.seniorCitizen.repository.SeniorCitizenRepository;
import com.pcs.itmis.seniorCitizen.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SeniorCitizenService {

	@Autowired
	private SeniorCitizenRepository seniorCitizenRepository;

	@Autowired
	private SecurityService securityService;

	public void save(SeniorCitizen seniorCitizen) {
		seniorCitizen.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		seniorCitizen.setUserOrganization(organization.getOrganizationId());
		// seniorCitizen.setEntryDate(new Date());
		seniorCitizen.setEntryDate(LocalDate.now());
		seniorCitizenRepository.save(seniorCitizen);
	}

	public SeniorCitizen getDataByFiscalYearAndOrganization(String fiscalYear) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return seniorCitizenRepository.getDataByFiscalYearAndOrganization(fiscalYear, organization.getOrganizationId());
	}

	public SeniorCitizen getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return seniorCitizenRepository.getDataByFYQuarterOrganization(fiscalYear,quarter, organization.getOrganizationId());
	}

	public void update(SeniorCitizen nDetails) {
		SeniorCitizen oDetails = Optional.ofNullable(seniorCitizenRepository.findById(nDetails.getSeniorCitizenId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		seniorCitizenRepository.save(oDetails);
	}

	public SeniorCitizen getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return seniorCitizenRepository.getDataByFYQuarterOrganization(fiscalYear,quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Disabled Service");
		return seniorCitizenRepository.findMaxSynchronizedDate();
	}

	public List<SeniorCitizen> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of SeniorCitizenService ");
		return seniorCitizenRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {

		log.info("Inside updateSynchronizedDate method of SeniorCitizenService ");

		List<SeniorCitizen> allDisabledList = seniorCitizenRepository.findAllBetweenFromAndToDate(fromDate, toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			seniorCitizenRepository.save(disabledModule);
		});

	}

	@Transactional
	public void revertData(SeniorCitizen nDetails) {
		SeniorCitizen oDetails = seniorCitizenRepository.getDataByFiscalYearAndOrganization(nDetails.getFiscalYear(),
				nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		seniorCitizenRepository.save(oDetails);
	}

}
