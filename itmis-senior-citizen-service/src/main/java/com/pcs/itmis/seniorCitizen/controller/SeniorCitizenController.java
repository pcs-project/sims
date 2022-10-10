package com.pcs.itmis.seniorCitizen.controller;

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

import com.pcs.itmis.seniorCitizen.entity.SeniorCitizen;
import com.pcs.itmis.seniorCitizen.model.ResponseMessage;
import com.pcs.itmis.seniorCitizen.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.seniorCitizen.service.SeniorCitizenService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/senior-citizen")
@Slf4j
public class SeniorCitizenController {

	@Autowired
	private SeniorCitizenService seniorCitizenService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody SeniorCitizen seniorCitizen) {
		log.info("Inside save SeniorCitizen details");
		seniorCitizenService.save(seniorCitizen);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{fiscalYear}")
	public SeniorCitizen getDataByFiscalYear(@PathVariable("fiscalYear") String fiscalYear) {
		log.info("Inside get SeniorCitizen details");
		return seniorCitizenService.getDataByFiscalYearAndOrganization(fiscalYear);
	}

	@GetMapping("/{fiscalYear}/{quarter}")
	public SeniorCitizen getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter) {
		log.info("Inside get ChildHome details");
		return seniorCitizenService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
	}

	@GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
	public SeniorCitizen getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter,
			@PathVariable("organizationId") Long organizationId) {
		return seniorCitizenService.getDataByOrganization(fiscalYear,quarter, organizationId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody SeniorCitizen seniorCitizen) {
		log.info("Inside edit SeniorCitizen details");
		seniorCitizenService.update(seniorCitizen);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, seniorCitizenService.getLastSynnchronizedDate()));
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
		log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
		try {

			return ResponseEntity.ok().body(
					new ResponseMessage(ResponseMsg.success, seniorCitizenService.getAllDataFromTo(fromDate, toDate)));
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
		log.info("Inside edit Disabled details");

		try {
			seniorCitizenService.updateSynchronizedDate(fromDate, toDate);

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
	public ResponseEntity<?> revertData(@RequestBody SeniorCitizen nDetails) {
		log.info("Inside revert childrenService details");
		seniorCitizenService.revertData(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
