package com.pcs.itmis.labourMigration.service;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.pcs.itmis.labourMigration.entity.DurationOfStay;
import com.pcs.itmis.labourMigration.entity.LabourMigrationCaseForm;
import com.pcs.itmis.labourMigration.entity.MigrantAddress;
import com.pcs.itmis.labourMigration.repository.LabourMigrationCaseFormRepository;
import com.pcs.itmis.labourMigration.utils.LoggedUserDetails;
import com.pcs.itmis.labourMigration.utils.OptionalConsumer;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LabourMigrationCaseFormService {
	
	@Autowired
	private LabourMigrationCaseFormRepository labourMigrationCaseFormRepository;
	
	public void saveLabourMigrationDetails(LabourMigrationCaseForm labourMigrationCaseForm) {
		log.info("Inside saveLabourMigrationDetails  of LabourMigrationCaseFormService");
		labourMigrationCaseForm.setEntryBy(LoggedUserDetails.getLoggedUser());
		labourMigrationCaseForm.setEntryDate(LocalDate.now());
		labourMigrationCaseForm.getAgentDetails().setLabourMigrationCaseForm(labourMigrationCaseForm);
		labourMigrationCaseForm.getMigrantAddress().setLabourMigrationCaseForm(labourMigrationCaseForm);
		
		labourMigrationCaseForm.getAgentDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
		labourMigrationCaseForm.getAgentDetails().setEntryDate(LocalDate.now());
		labourMigrationCaseForm.getMigrantAddress().setEntryBy(LoggedUserDetails.getLoggedUser());
		labourMigrationCaseForm.getMigrantAddress().setEntryDate(LocalDate.now());
		
		labourMigrationCaseForm.getDurationOfStayList().forEach(durationOfStay ->{
			durationOfStay.setEntryBy(LoggedUserDetails.getLoggedUser());
			durationOfStay.setEntryDate(LocalDate.now());
			durationOfStay.setLabourMigrationCaseForm(labourMigrationCaseForm);
		});
		labourMigrationCaseFormRepository.save(labourMigrationCaseForm);
	}

	public List<LabourMigrationCaseForm> getAllLabourMigrationDetailsList() {
		log.info("Inside getLabourMigrationDetails  of LabourMigrationCaseFormService");
		return labourMigrationCaseFormRepository.findAll();
	}

	public LabourMigrationCaseForm getLabourMigrationDetailsBylabourMigrationCaseFormId(Long labourMigrationCaseFormId) {
		log.info("Inside getLabourMigrationDetails  of LabourMigrationCaseFormService");
		return labourMigrationCaseFormRepository.getById(labourMigrationCaseFormId);
	}

	public void updateLabourMigrationDetails(Long labourMigrationCaseFormId,
		LabourMigrationCaseForm labourMigrationCaseForm) {
		LabourMigrationCaseForm olabourMigrationCaseForm = labourMigrationCaseFormRepository.findByLabourMigrationCaseFormId(labourMigrationCaseFormId);	
		
				
	olabourMigrationCaseForm.copyData(labourMigrationCaseForm);
	
		olabourMigrationCaseForm.getAgentDetails().copyData(labourMigrationCaseForm.getAgentDetails());
		olabourMigrationCaseForm.getMigrantAddress().copyData(labourMigrationCaseForm.getMigrantAddress());
	
		
		for (Iterator<DurationOfStay> iterator = olabourMigrationCaseForm.getDurationOfStayList().iterator(); iterator.hasNext();) {
			DurationOfStay oObject = iterator.next();
			OptionalConsumer.of(labourMigrationCaseForm.getDurationOfStayList().stream()
							.filter(durationOfStay -> durationOfStay.getDurationOfStayId() != null
									? durationOfStay.getDurationOfStayId().equals(oObject.getDurationOfStayId())
									: false)
							.findFirst())
					.ifPresent(durationOfStay -> oObject.copyData(durationOfStay))
					.ifNotPresent(() -> iterator.remove());
		}

		olabourMigrationCaseForm.getDurationOfStayList().addAll(labourMigrationCaseForm.getDurationOfStayList().stream()
				.filter(durationStay -> Objects.isNull(durationStay.getDurationOfStayId())).map(durationStay -> {
					durationStay.setLabourMigrationCaseForm(olabourMigrationCaseForm);
					durationStay.setEntryDate(LocalDate.now());
					
					return durationStay;
				}).collect(Collectors.toList()));
		
		labourMigrationCaseFormRepository.save(olabourMigrationCaseForm);
	
	}
	
	
	 public LocalDate getLastSynnchronizedDate() {
			log.info("Inside getLastSynnchronizedDate method of LabourMigrationCaseFormService Service");
			return labourMigrationCaseFormRepository.findMaxSynchronizedDate();
		}

		public List<LabourMigrationCaseForm> getAllDataFromTo(LocalDate fromDate, LocalDate toDate) {
			log.info("Inside getAllDataFromTo method of LabourMigrationCaseFormService Service");
			return labourMigrationCaseFormRepository.findAllBetweenFromAndToDate(fromDate,toDate);
		}

		public void updateSynchronizedDate(LocalDate fromDate, LocalDate toDate) {
			// TODO Auto-generated method stub
			log.info("Inside updateSynchronizedDate method of LabourMigrationCaseFormService Service");
			
			List<LabourMigrationCaseForm> allDisabledList = labourMigrationCaseFormRepository.findAllBetweenFromAndToDate(fromDate,toDate);
			
			allDisabledList.forEach(disabledModule -> {
				disabledModule.setSynchronizedDate(LocalDate.now());
				labourMigrationCaseFormRepository.save(disabledModule);
			});

		}


}
