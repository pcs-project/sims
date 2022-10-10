package com.pcs.itmis.disabled.controller;

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

import com.pcs.itmis.disabled.entity.Disabled;
import com.pcs.itmis.disabled.model.ResponseMessage;
import com.pcs.itmis.disabled.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.disabled.service.DisabledService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/disabled")
@Slf4j
public class DisabledController {

  @Autowired
  private DisabledService disabledService;
  
  @PostMapping("/")
  public ResponseEntity<?> save(@RequestBody Disabled disabled){
    log.info("Inside save Disabled details");
    disabledService.save(disabled);
    return new ResponseEntity<>(HttpStatus.OK);
  }
  
  @GetMapping("/{fiscalYear}")
  public Disabled getDataByFiscalYear(@PathVariable("fiscalYear") String fiscalYear){
    log.info("Inside get Disabled details");
    return disabledService.getDataByFiscalYearAndOrganization(fiscalYear);
  }
  
  @GetMapping("/{fiscalYear}/{quarter}")
  public Disabled getDataByFiscalYear(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter){
    log.info("Inside get Disabled details");
    return disabledService.getDataByFiscalYearAndQuarter(fiscalYear,quarter);
  }
  
  @GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
  public Disabled getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter,
			@PathVariable("organizationId") Long organizationId) {
    return disabledService.getDataByOrganization(fiscalYear,quarter, organizationId);
  }
  
  @PutMapping("/")
  public ResponseEntity<?> update(@RequestBody Disabled disabled){
    log.info("Inside edit Disabled details");
    disabledService.update(disabled);
    return new ResponseEntity<>(HttpStatus.OK);
  }
  
  
  @GetMapping("/synchronized-date")
  public ResponseEntity<?> getLastSynnchronizedDate(){
    log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
	try {

		return ResponseEntity.ok()
				.body(new ResponseMessage(ResponseMsg.success, disabledService.getLastSynnchronizedDate()));
	} catch (Exception e) {
		e.printStackTrace();
		return new ResponseEntity<ResponseMessage>(
				new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
  }
  
  @GetMapping("/synchronized-date/{fromDate}/{toDate}")
  public ResponseEntity<?> getAllDataFromTo(@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,@PathVariable("toDate")@DateTimeFormat(pattern = "yyyy-MM-dd")  LocalDate toDate ){
    log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
	try {

		return ResponseEntity.ok()
				.body(new ResponseMessage(ResponseMsg.success, disabledService.getAllDataFromTo(fromDate,toDate)));
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
		  log.info("Inside edit Disabled details");
	 
	    try {
	    	 disabledService.updateSynchronizedDate(fromDate,toDate);
	    	
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		return ResponseEntity.ok()
				.body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
	  } 

  
	// To revert data
	@PutMapping("/revert")
	public ResponseEntity<?> revertData(@RequestBody Disabled nDetails) {
		log.info("Inside revert childrenService details");
		disabledService.revertData(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}
  
}
