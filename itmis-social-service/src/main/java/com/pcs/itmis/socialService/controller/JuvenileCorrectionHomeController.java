package com.pcs.itmis.socialService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.socialService.entity.JuvenileCorrectionHome;
import com.pcs.itmis.socialService.service.JuvenileCorrectionHomeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/social-service/child-correction-home")
@Slf4j
public class JuvenileCorrectionHomeController {

	@Autowired
	private JuvenileCorrectionHomeService juvenileCorrectionHomeService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody JuvenileCorrectionHome details) {
		try {
			juvenileCorrectionHomeService.save(details);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(HttpStatus.OK);
	}

	@GetMapping("/")
	public List<JuvenileCorrectionHome> getAllList() {
		log.info("Inside get all list");
		return juvenileCorrectionHomeService.getAllList();
	}

	@GetMapping("/list-by-organization")
	public List<JuvenileCorrectionHome> getAllListByOrganization() {
		log.info("Inside get all list by organization");
		return juvenileCorrectionHomeService.getAllListByOrganization();
	}

	@GetMapping("/{juvenileCorrectionHomeId}")
	public JuvenileCorrectionHome getById(@PathVariable("juvenileCorrectionHomeId") Long juvenileCorrectionHomeId) {
		log.info("Inside get juvenialCorrectionHomeId details");
		return juvenileCorrectionHomeService.getById(juvenileCorrectionHomeId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody JuvenileCorrectionHome details) {
		log.info("Inside edit JuvenileCorrectionHome details");
		juvenileCorrectionHomeService.update(details);
		return new ResponseEntity<>(HttpStatus.OK);
	}

//  @GetMapping("/synchronized-date")
//  public ResponseEntity<?> getLastSynnchronizedDate(){
//    log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
//	try {
//
//		return ResponseEntity.ok()
//				.body(new ResponseMessage(ResponseMsg.success, juvenileCorrectionHomeService.getLastSynnchronizedDate()));
//	} catch (Exception e) {
//		e.printStackTrace();
//		return new ResponseEntity<ResponseMessage>(
//				new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
//				HttpStatus.INTERNAL_SERVER_ERROR);
//	}
//  }
//  
//  @GetMapping("/synchronized-date/{fromDate}/{toDate}")
//  public ResponseEntity<?> getAllDataFromTo(@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,@PathVariable("toDate")@DateTimeFormat(pattern = "yyyy-MM-dd")  LocalDate toDate ){
//    log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
//	try {
//
//		return ResponseEntity.ok()
//				.body(new ResponseMessage(ResponseMsg.success, juvenileCorrectionHomeService.getAllDataFromTo(fromDate,toDate)));
//	} catch (Exception e) {
//		e.printStackTrace();
//		return new ResponseEntity<ResponseMessage>(
//				new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
//				HttpStatus.INTERNAL_SERVER_ERROR);
//	}
//  }
//
//  
//  @PutMapping("/update/synchronized-date/{fromDate}/{toDate}")
//  public ResponseEntity<?> updateSynchronizedDate(@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate fromDate,@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate toDate) 
//	  { 
//		  log.info("Inside edit Disabled details");
//	 
//	    try {
//	    	juvenileCorrectionHomeService.updateSynchronizedDate(fromDate,toDate);
//	    	
//		} catch (Exception e) {
//			e.printStackTrace();
//			return new ResponseEntity<ResponseMessage>(
//					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
//					HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		
//		
//		return ResponseEntity.ok()
//				.body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
//	  } 
}
