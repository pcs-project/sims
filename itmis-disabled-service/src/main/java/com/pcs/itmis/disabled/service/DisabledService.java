package com.pcs.itmis.disabled.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.pcs.itmis.disabled.entity.Disabled;
import com.pcs.itmis.disabled.model.Organization;
import com.pcs.itmis.disabled.repository.DisabledRepository;
import com.pcs.itmis.disabled.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DisabledService {

	@Autowired
	private DisabledRepository disabledRepository;

	@Autowired
	private SecurityService securityService;

	public void save(Disabled disabled) {
		disabled.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}

		disabled.getCategoryKa().setDisabled(disabled);
		disabled.getCategoryKha().setDisabled(disabled);
		disabled.getCategoryGa().setDisabled(disabled);
		disabled.getCategoryGha().setDisabled(disabled);
		disabled.setUserOrganization(organization.getOrganizationId());
		disabled.setEntryDate(LocalDate.now());
		disabledRepository.save(disabled);
	}

	public Disabled getDataByFiscalYearAndOrganization(String fiscalYear) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return disabledRepository.getDataByFiscalYearAndOrganization(fiscalYear, organization.getOrganizationId());
	}

	public void update(Disabled nDetails) {
		Disabled oDetails = Optional.ofNullable(disabledRepository.findById(nDetails.getDisabledId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();
		oDetails.setCategoryKa(nDetails.getCategoryKa());
		oDetails.setCategoryKha(nDetails.getCategoryKha());
		oDetails.setCategoryGa(nDetails.getCategoryGa());
		oDetails.setCategoryGha(nDetails.getCategoryGha());
		oDetails.getCategoryKa().setDisabled(oDetails);
		oDetails.getCategoryKha().setDisabled(oDetails);
		oDetails.getCategoryGa().setDisabled(oDetails);
		oDetails.getCategoryGha().setDisabled(oDetails);
		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		// oDetails.setEntryDate(LocalDate.now());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		disabledRepository.save(oDetails);
	}

	public Disabled getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return disabledRepository.getDataByFYQuarterOrganization(fiscalYear, quarter, organization.getOrganizationId());
	}

	public Disabled getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return disabledRepository.getDataByFYQuarterOrganization(fiscalYear, quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Disabled Service");
		return disabledRepository.findMaxSynchronizedDate();
	}

	public List<Disabled> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of Disabled Service");
		return disabledRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
		// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of Disabled Service");

		List<Disabled> allDisabledList = disabledRepository.findAllBetweenFromAndToDate(fromDate, toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			disabledRepository.save(disabledModule);
		});

	}

	public void revertData(Disabled nDetails) {
		Disabled oDetails = disabledRepository.getDataByFiscalYearAndOrganization(nDetails.getFiscalYear(),
				nDetails.getUserOrganization());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		disabledRepository.save(oDetails);

	}

}
