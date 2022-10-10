package com.pcs.itmis.oldAgeHome.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.oldAgeHome.entity.OldAgeHome;
import com.pcs.itmis.oldAgeHome.model.Organization;
import com.pcs.itmis.oldAgeHome.repository.OldAgeHomeRepository;
import com.pcs.itmis.oldAgeHome.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OldAgeHomeService {
	@Autowired
	private OldAgeHomeRepository oldAgeHomeRepository;

	@Autowired
	private SecurityService securityService;

	public void save(OldAgeHome oldAgeHome) {
		oldAgeHome.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		oldAgeHome.setUserOrganization(organization.getOrganizationId());
		oldAgeHome.setEntryDate(LocalDate.now());
		oldAgeHomeRepository.save(oldAgeHome);
	}

	public OldAgeHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return oldAgeHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organization.getOrganizationId());
	}

	public OldAgeHome getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return oldAgeHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organizationId);
	}
	
	public void update(OldAgeHome nDetails) {
		OldAgeHome oDetails = Optional.ofNullable(oldAgeHomeRepository.findById(nDetails.getOldAgeHomeId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		//oDetails.setEntryDate(new Date());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		oldAgeHomeRepository.save(oDetails);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of OldAge Home Service");
		return oldAgeHomeRepository.findMaxSynchronizedDate();
	}

	public List<OldAgeHome> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of OldAge Home Service");
		List<OldAgeHome> listDetails1  = oldAgeHomeRepository.findAllBetweenFromAndToDate(fromDate, toDate);
		return oldAgeHomeRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of OldAge Home Service");

		List<OldAgeHome> allDisabledList = oldAgeHomeRepository.findAllBetweenFromAndToDate(fromDate,
				toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			oldAgeHomeRepository.save(disabledModule);
		});

	}

	@Transactional
	public void revertData(OldAgeHome nDetails) {
		OldAgeHome oDetails = oldAgeHomeRepository.getDataByFiscalYearAndQuarter(
				nDetails.getFiscalYear(), nDetails.getQuarter(), nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		oldAgeHomeRepository.save(oDetails);
	}
}
