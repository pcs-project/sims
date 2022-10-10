package com.pcs.itmis.childHome.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.childHome.entity.ChildHome;
import com.pcs.itmis.childHome.model.Organization;
import com.pcs.itmis.childHome.repository.ChildHomeRepository;
import com.pcs.itmis.childHome.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChildHomeService {

	@Autowired
	private ChildHomeRepository childHomeRepository;

	@Autowired
	private SecurityService securityService;

	public void save(ChildHome childHome) {
		childHome.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		childHome.setUserOrganization(organization.getOrganizationId());
		childHome.setEntryDate(LocalDate.now());
		childHomeRepository.save(childHome);
	}

	public ChildHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return childHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organization.getOrganizationId());
	}

	public void update(ChildHome nDetails) {
		ChildHome oDetails = Optional.ofNullable(childHomeRepository.findById(nDetails.getChildHomeId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		childHomeRepository.save(oDetails);
	}

	public ChildHome getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return childHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Child Home Service");
		return childHomeRepository.findMaxSynchronizedDate();
	}

	public List<ChildHome> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of Child Home Service");
		return childHomeRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
		// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of Child Home Service");

		List<ChildHome> allDisabledList = childHomeRepository.findAllBetweenFromAndToDate(fromDate, toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			childHomeRepository.save(disabledModule);
		});

	}

	@Transactional
	public void revertData(ChildHome nDetails) {
		ChildHome oDetails = childHomeRepository.getDataByFiscalYearAndQuarter(nDetails.getFiscalYear(),
				nDetails.getQuarter(), nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		childHomeRepository.save(oDetails);
	}
}
