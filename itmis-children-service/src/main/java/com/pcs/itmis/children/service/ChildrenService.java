package com.pcs.itmis.children.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.children.entity.Children;
import com.pcs.itmis.children.model.Organization;
import com.pcs.itmis.children.repository.ChildrenRepository;
import com.pcs.itmis.children.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChildrenService {

	@Autowired
	private ChildrenRepository childrenRepository;

	@Autowired
	private SecurityService securityService;

	public void save(Children children) {
		children.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		children.setUserOrganization(organization.getOrganizationId());
		children.setEntryDate(LocalDate.now());
		childrenRepository.save(children);
	}

	public Children getDataByFiscalYearAndOrganization(String fiscalYear) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return childrenRepository.getDataByFiscalYearAndOrganization(fiscalYear, organization.getOrganizationId());
	}
	
	public Children getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return childrenRepository.getDataByFYQuarterOrganization(fiscalYear, quarter, organization.getOrganizationId());
	}

	public void update(Children nDetails) {
		Children oDetails = Optional.ofNullable(childrenRepository.findById(nDetails.getChildrenId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		// oDetails.setEntryDate(new Date());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		childrenRepository.save(oDetails);
	}

	public Children getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return childrenRepository.getDataByFYQuarterOrganization(fiscalYear, quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Children Service");
		return childrenRepository.findMaxSynchronizedDate();
	}

	public List<Children> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of Children Service");
		return childrenRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
		// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of Children Service");

		List<Children> allDisabledList = childrenRepository.findAllBetweenFromAndToDate(fromDate, toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			childrenRepository.save(disabledModule);
		});

	}

	public void revertData(Children nDetails) {
		Children oDetails = childrenRepository.getDataByFiscalYearAndOrganization(nDetails.getFiscalYear(), nDetails.getUserOrganization());
	
		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		childrenRepository.save(oDetails);
	}

}
