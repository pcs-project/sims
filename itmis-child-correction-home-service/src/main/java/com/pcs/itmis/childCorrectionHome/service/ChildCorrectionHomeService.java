package com.pcs.itmis.childCorrectionHome.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.childCorrectionHome.entity.ChildCorrectionHome;
import com.pcs.itmis.childCorrectionHome.model.Organization;
import com.pcs.itmis.childCorrectionHome.repository.ChildCorrectionHomeRepository;
import com.pcs.itmis.childCorrectionHome.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChildCorrectionHomeService {

	@Autowired
	private ChildCorrectionHomeRepository childCorrectionHomeRepository;

	@Autowired
	private SecurityService securityService;

	public void save(ChildCorrectionHome childCorrectionHome) {
		childCorrectionHome.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		childCorrectionHome.setUserOrganization(organization.getOrganizationId());
		childCorrectionHome.setEntryDate(LocalDate.now());
		childCorrectionHomeRepository.save(childCorrectionHome);
	}

	public ChildCorrectionHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return childCorrectionHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter,
				organization.getOrganizationId());
	}

	public void update(ChildCorrectionHome nDetails) {
		ChildCorrectionHome oDetails = Optional
				.ofNullable(childCorrectionHomeRepository.findById(nDetails.getChildCorrectionHomeId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		// oDetails.setEntryDate(LocalDate.now());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		childCorrectionHomeRepository.save(oDetails);
	}

	public ChildCorrectionHome getDataByOrganization(String fiscalYear, String quarter, Long organization) {
		return childCorrectionHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organization);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of ChildCorrection Home Service Service");
		return childCorrectionHomeRepository.findMaxSynchronizedDate();
	}

	public List<ChildCorrectionHome> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of ChildCorrection Home Service Service");
		return childCorrectionHomeRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {

		log.info("Inside updateSynchronizedDate method of ChildCorrection Home Service Service");

		List<ChildCorrectionHome> allDisabledList = childCorrectionHomeRepository.findAllBetweenFromAndToDate(fromDate,
				toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			childCorrectionHomeRepository.save(disabledModule);
		});

	}

	@Transactional
	public void revertData(ChildCorrectionHome nDetails) {
		ChildCorrectionHome oDetails = childCorrectionHomeRepository.getDataByFiscalYearAndQuarter(
				nDetails.getFiscalYear(), nDetails.getQuarter(), nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		childCorrectionHomeRepository.save(oDetails);
	}
}
