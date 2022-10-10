package com.pcs.itmis.labourMigration.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.labourMigration.entity.LabourMigrationIndicator;
import com.pcs.itmis.labourMigration.model.Organization;
import com.pcs.itmis.labourMigration.repository.LabourMigrationIndicatorRepository;
import com.pcs.itmis.labourMigration.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LabourMigrationIndicatorService {

	@Autowired
	private LabourMigrationIndicatorRepository indicatorRepository;

	@Autowired
	private SecurityService securityService;

	public void save(LabourMigrationIndicator labourMigration) {
		labourMigration.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		labourMigration.setUserOrganization(organization.getOrganizationId());
		labourMigration.setEntryDate(LocalDate.now());
		indicatorRepository.save(labourMigration);
	}

	public LabourMigrationIndicator getDataByFiscalYearAndOrganization(String fiscalYear) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return indicatorRepository.getDataByFiscalYearAndOrganization(fiscalYear, organization.getOrganizationId());
	}

	public LabourMigrationIndicator getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return indicatorRepository.getDataByFYQuarterOrganization(fiscalYear,quarter, organization.getOrganizationId());
	}

	public void update(LabourMigrationIndicator nDetails) {
		LabourMigrationIndicator oDetails = Optional
				.ofNullable(indicatorRepository.findById(nDetails.getLabourMigrationId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.copyData(nDetails);
		indicatorRepository.save(oDetails);
	}

	public LabourMigrationIndicator getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return indicatorRepository.getDataByFYQuarterOrganization(fiscalYear, quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of LabourMigrationIndicatortService Service");
		return indicatorRepository.findMaxSynchronizedDate();
	}

	public List<LabourMigrationIndicator> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of LabourMigrationIndicatortService Service");
		return indicatorRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of LabourMigrationIndicatortService Service");

		List<LabourMigrationIndicator> allDisabledList = indicatorRepository.findAllBetweenFromAndToDate(fromDate,
				toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			indicatorRepository.save(disabledModule);
		});

	}
	
	@Transactional
	public void revertData(LabourMigrationIndicator nDetails) {
		LabourMigrationIndicator oDetails = indicatorRepository.getDataByFiscalYearAndOrganization(nDetails.getFiscalYear(), nDetails.getUserOrganization());
	
		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		indicatorRepository.save(oDetails);
	}

}
