package com.pcs.itmis.labourMigration.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.labourMigration.entity.LabourMigrationCaseForm;
import com.pcs.itmis.labourMigration.model.ResponseMessage;
import com.pcs.itmis.labourMigration.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.labourMigration.service.LabourMigrationCaseFormService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/case-form")
@Slf4j
public class LabourMigractionCaseFormController {
	
	@Autowired
	private LabourMigrationCaseFormService labourMigrationCaseFormService;
	
	@PostMapping("/")
	public ResponseEntity<?> saveLabourMigrationDetails(@RequestBody LabourMigrationCaseForm labourMigrationCaseForm){
		log.info("Inside saveVOIPDetails Method of LabourMigractionCaseFormController");
		
		try {
			
			labourMigrationCaseFormService.saveLabourMigrationDetails(labourMigrationCaseForm);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(new ResponseMessage("Submit Successful",HttpStatus.OK));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAllLabourMigrationDetailsList(){
		log.info("Inside getAllLabourMigrationDetailsList Method of LabourMigractionCaseFormController");
		try {

			return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success,labourMigrationCaseFormService.getAllLabourMigrationDetailsList()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping("/{labourMigrationCaseFormId}")
	public ResponseEntity<?> getLabourMigrationDetailsBylabourMigrationCaseFormId(@PathVariable("labourMigrationCaseFormId") Long labourMigrationCaseFormId){
		log.info("Inside getLabourMigrationDetailsBylabourMigrationCaseFormId Method of LabourMigractionCaseFormController");
		try {

			return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success,labourMigrationCaseFormService.getLabourMigrationDetailsBylabourMigrationCaseFormId(labourMigrationCaseFormId)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PutMapping("/{labourMigrationCaseFormId}")
	public ResponseEntity<?> updateLabourMigrationDetails(@PathVariable("labourMigrationCaseFormId") Long labourMigrationCaseFormId ,@RequestBody LabourMigrationCaseForm labourMigrationCaseForm){
		log.info("Inside updateLabourMigrationDetails Method of LabourMigractionCaseFormController");
		
		try {
			
			labourMigrationCaseFormService.updateLabourMigrationDetails(labourMigrationCaseFormId,labourMigrationCaseForm);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
		}
		return ResponseEntity.ok().body(new ResponseMessage("Submit Successful",HttpStatus.OK));
	}
	
	 @GetMapping("/synchronized-date")
	  public ResponseEntity<?> getLastSynnchronizedDate(){
	    log.info("Inside  getLastSynnchronizedDate   of LabourMigrationCaseForm COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, labourMigrationCaseFormService.getLastSynnchronizedDate()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	  }
	  
	  @GetMapping("/synchronized-date/{fromDate}/{toDate}")
	  public ResponseEntity<?> getAllDataFromTo(@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,@PathVariable("toDate")@DateTimeFormat(pattern = "yyyy-MM-dd")  LocalDate toDate ){
	    log.info("Inside  getLastSynnchronizedDate   of LabourMigrationCaseForm COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, labourMigrationCaseFormService.getAllDataFromTo(fromDate,toDate)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	  }

	  
	  @PutMapping("/update/synchronized-date/{fromDate}/{toDate}")
	  public ResponseEntity<?> updateSynchronizedDate(@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate fromDate,@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate toDate) 
		  { 
			  log.info("Inside edit LabourMigrationCaseForm details");
		 
		    try {
		    	labourMigrationCaseFormService.updateSynchronizedDate(fromDate,toDate);
		    	
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<ResponseMessage>(
						new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			
			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
		  } 
		  

}
