package com.pcs.itmis.childCorrectionHome.controller;

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

import com.pcs.itmis.childCorrectionHome.entity.ChildCorrectionHome;
import com.pcs.itmis.childCorrectionHome.model.ResponseMessage;
import com.pcs.itmis.childCorrectionHome.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.childCorrectionHome.service.ChildCorrectionHomeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/child-correction-home")
@Slf4j
public class ChildCorrectionHomeController {

	@Autowired
	private ChildCorrectionHomeService childCorrectionHomeService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody ChildCorrectionHome childCorrectionHome) {
		log.info("Inside save ChildCorrectionHome details");
		childCorrectionHomeService.save(childCorrectionHome);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{fiscalYear}/{quarter}")
	public ChildCorrectionHome getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter) {
		log.info("Inside get ChildCorrectionHome details");
		return childCorrectionHomeService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
	}

	@GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
	public ChildCorrectionHome getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter, @PathVariable("organizationId") Long organizationId) {
		log.info("Inside get ChildCorrectionHome details");
		return childCorrectionHomeService.getDataByOrganization(fiscalYear, quarter, organizationId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody ChildCorrectionHome nDetails) {
		log.info("Inside edit ChildCorrectionHome details");
		childCorrectionHomeService.update(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of ChildCorrectionHome COntroller");
		try {

			return ResponseEntity.ok().body(
					new ResponseMessage(ResponseMsg.success, childCorrectionHomeService.getLastSynnchronizedDate()));
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
		log.info("Inside  getLastSynnchronizedDate   of ChildCorrectionHome COntroller");
		try {

			return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success,
					childCorrectionHomeService.getAllDataFromTo(fromDate, toDate)));
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
		log.info("Inside edit ChildCorrectionHome details");

		try {
			childCorrectionHomeService.updateSynchronizedDate(fromDate, toDate);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
	}

	// To revert data
	@PutMapping("/revert")
	public ResponseEntity<?> revertData(@RequestBody ChildCorrectionHome nDetails) {
		log.info("Inside revert childCorrectionHomeService details");
		childCorrectionHomeService.revertData(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
