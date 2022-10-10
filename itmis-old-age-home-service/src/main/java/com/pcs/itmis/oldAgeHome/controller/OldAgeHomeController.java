package com.pcs.itmis.oldAgeHome.controller;

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

import com.pcs.itmis.oldAgeHome.entity.OldAgeHome;
import com.pcs.itmis.oldAgeHome.model.ResponseMessage;
import com.pcs.itmis.oldAgeHome.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.oldAgeHome.service.OldAgeHomeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/old-age-home")
@Slf4j
public class OldAgeHomeController {

	@Autowired
	private OldAgeHomeService oldAgeHomeService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody OldAgeHome oldAgeHome) {
		log.info("Inside save OldAgeHome details");
		oldAgeHomeService.save(oldAgeHome);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{fiscalYear}/{quarter}")
	public OldAgeHome getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter) {
		log.info("Inside get OldAgeHome details");
		return oldAgeHomeService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
	}

	@GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
	public OldAgeHome getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter, @PathVariable("organizationId") Long organizationId) {
		log.info("Inside get ChildCorrectionHome details");
		return oldAgeHomeService.getDataByOrganization(fiscalYear, quarter, organizationId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody OldAgeHome nDetails) {
		log.info("Inside edit OldAgeHome details");
		oldAgeHomeService.update(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, oldAgeHomeService.getLastSynnchronizedDate()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/synchronized-date/{fromDate}/{toDate}")
	public ResponseEntity<?> getAllDataFromTo(
			@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
			@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
		log.info("Inside  getLastSynnchronizedDate   of OldAge Home COntroller");
		try {

			return ResponseEntity.ok().body(
					new ResponseMessage(ResponseMsg.success, oldAgeHomeService.getAllDataFromTo(fromDate, toDate)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update/synchronized-date/{fromDate}/{toDate}")
	public ResponseEntity<?> updateSynchronizedDate(
			@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
			@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
		log.info("Inside edit OldAge Home details");

		try {
			oldAgeHomeService.updateSynchronizedDate(fromDate, toDate);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
	}

	//To revert data
	@PutMapping("/revert")
	public ResponseEntity<?> revertData(@RequestBody OldAgeHome nDetails) {
		log.info("Inside revert childCorrectionHomeService details");
		oldAgeHomeService.revertData(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
