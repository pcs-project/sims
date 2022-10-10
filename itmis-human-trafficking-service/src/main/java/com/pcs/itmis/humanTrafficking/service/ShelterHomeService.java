package com.pcs.itmis.humanTrafficking.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.humanTrafficking.entity.ShelterHome;
import com.pcs.itmis.humanTrafficking.model.Organization;
import com.pcs.itmis.humanTrafficking.repository.ShelterHomeRepository;
import com.pcs.itmis.humanTrafficking.utils.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ShelterHomeService {
	@Autowired
	private ShelterHomeRepository shelterHomeRepository;

	@Autowired
	private SecurityService securityService;

	public void save(ShelterHome shelterHome) {
		shelterHome.setEntryBy(LoggedUserDetails.getLoggedUser());
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		shelterHome.setUserOrganization(organization.getOrganizationId());
		shelterHome.setEntryDate(LocalDate.now());
		shelterHomeRepository.save(shelterHome);
	}

	public ShelterHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return shelterHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter,
				organization.getOrganizationId());
	}

	public void update(ShelterHome nDetails) {
		ShelterHome oDetails = Optional.ofNullable(shelterHomeRepository.findById(nDetails.getShelterHomeId()))
				.orElseThrow(() -> new RuntimeException("Details Not Found")).get();

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		//oDetails.setEntryDate(new Date());
		oDetails.setLastModifiedDate(LocalDate.now());
		oDetails.copyData(nDetails);
		shelterHomeRepository.save(oDetails);
	}

	public ShelterHome getDataByOrganization(String fiscalYear, String quarter, Long organizationId) {
		return shelterHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear, quarter, organizationId);
	}

	public LocalDate getLastSynnchronizedDate() {
		log.info("Inside getLastSynnchronizedDate method of Disabled Service");
		return shelterHomeRepository.findMaxSynchronizedDate();
	}

	public List<ShelterHome> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
		log.info("Inside getAllDataFromTo method of Disabled Service");
		return shelterHomeRepository.findAllBetweenFromAndToDate(fromDate, toDate);
	}

	public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
// TODO Auto-generated method stub
		log.info("Inside updateSynchronizedDate method of Disabled Service");

		List<ShelterHome> allDisabledList = shelterHomeRepository.findAllBetweenFromAndToDate(fromDate,
				toDate);

		allDisabledList.forEach(disabledModule -> {
			disabledModule.setSynchronizedDate(LocalDate.now());
			shelterHomeRepository.save(disabledModule);
		});

	}

	@Transactional
	public void revertData(ShelterHome nDetails) {
		ShelterHome oDetails = shelterHomeRepository.getDataByFiscalYearAndQuarter(
				nDetails.getFiscalYear(), nDetails.getQuarter(), nDetails.getUserOrganization());

		oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
		oDetails.setEntryDate(LocalDate.now());
		oDetails.setStatus("Save");
		oDetails.setRemarks(nDetails.getRemarks());

		shelterHomeRepository.save(oDetails);
	}
}
