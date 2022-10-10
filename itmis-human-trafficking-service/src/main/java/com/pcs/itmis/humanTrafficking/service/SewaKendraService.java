package com.pcs.itmis.humanTrafficking.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.humanTrafficking.entity.SewaKendra;
import com.pcs.itmis.humanTrafficking.model.Organization;
import com.pcs.itmis.humanTrafficking.repository.SewaKendraRepository;
import com.pcs.itmis.humanTrafficking.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SewaKendraService {
	@Autowired
	private SewaKendraRepository sewaKendraRepository;

	@Autowired
	private SecurityService securityService;

	public void save(SewaKendra sewaKendra) {
		sewaKendra.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		sewaKendra.setUserOrganization(organization.getOrganizationId());
		sewaKendra.setEntryDate(LocalDate.now());
		sewaKendraRepository.save(sewaKendra);
	}

	public SewaKendra getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sewaKendraRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter,
				organization.getOrganizationId());
	}

	public void update(SewaKendra nDetails) {
		SewaKendra oDetails = Optional.ofNullable(sewaKendraRepository.findById(nDetails.getSewaKendraId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		// oDetails.setEntryDate(new Date());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		sewaKendraRepository.save(oDetails);
	}

	public SewaKendra getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return sewaKendraRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Disabled Service");
		return sewaKendraRepository.findMaxSynchronizedDate();
	}

	public List<SewaKendra> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of Disabled Service");
		return sewaKendraRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside updateSynchronizedDate method of Disabled Service");

		List<SewaKendra> allDisabledList = sewaKendraRepository.findAllBetweenFromAndToDate(fromDate, toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			sewaKendraRepository.save(disabledModule);
		});

	}

	@Transactional
	public void revertData(SewaKendra nDetails) {
		SewaKendra oDetails = sewaKendraRepository.getDataByFiscalYearAndQuarter(nDetails.getFiscalYear(),
				nDetails.getQuarter(), nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		sewaKendraRepository.save(oDetails);
	}
}
