package com.pcs.itmis.womenAndMinorities.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.womenAndMinorities.entity.WomenAndMinorities;
import com.pcs.itmis.womenAndMinorities.model.Organization;
import com.pcs.itmis.womenAndMinorities.repository.WomenAndMinoritiesRepository;
import com.pcs.itmis.womenAndMinorities.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WomenAndMinoritiesService {

	@Autowired
	private WomenAndMinoritiesRepository womenAndMinoritiesRepository;

	@Autowired
	private SecurityService securityService;

	public void save(WomenAndMinorities womenAndMinorities) {
		// To get logged in user's organization
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		womenAndMinorities.setUserOrganization(organization.getOrganizationId());
		womenAndMinorities.setEntryBy(LoggedUserDetails.getLoggedUser());
		womenAndMinorities.setEntryDate(LocalDate.now());

		womenAndMinoritiesRepository.save(womenAndMinorities);
	}

	public WomenAndMinorities getDataByFiscalYearAndOrganization(String fiscalYear) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return womenAndMinoritiesRepository.getDataByFiscalYearAndOrganization(fiscalYear,
				organization.getOrganizationId());
	}

	public WomenAndMinorities getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return womenAndMinoritiesRepository.getDataByFYQuarterOrganization(fiscalYear, quarter,
				organization.getOrganizationId());
	}

	public WomenAndMinorities getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return womenAndMinoritiesRepository.getDataByFYQuarterOrganization(fiscalYear, quarter, organizationId);
	}

	@Transactional
	public void update(WomenAndMinorities nDetails) {
		// Get women and minorities detail's id to update the detail
		WomenAndMinorities oDetails = Optional
				.ofNullable(womenAndMinoritiesRepository.findById(nDetails.getWomenAndMinoritiesId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.copyData(nDetails);

		womenAndMinoritiesRepository.save(oDetails);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Disabled Service");
		return womenAndMinoritiesRepository.findMaxSynchronizedDate();
	}

	public List<WomenAndMinorities> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of Disabled Service");
		return womenAndMinoritiesRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of Disabled Service");

		List<WomenAndMinorities> moduleListlist = womenAndMinoritiesRepository.findAllBetweenFromAndToDate(fromDate,
				toDate);

		moduleListlist.forEach(module -> {
			module.setSynchronizedDate(LocalDate.now());
			womenAndMinoritiesRepository.save(module);
		});

	}

	@Transactional
	public void revertData(WomenAndMinorities nDetails) {
		// Get women and minorities detail's id to revert the detail
		WomenAndMinorities oDetails = womenAndMinoritiesRepository.getDataByFiscalYearAndOrganization(
				nDetails.getFiscalYear(), nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		womenAndMinoritiesRepository.save(oDetails);
	}

}
