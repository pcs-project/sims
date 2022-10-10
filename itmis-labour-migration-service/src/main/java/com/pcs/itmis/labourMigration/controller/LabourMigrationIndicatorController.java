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

import com.pcs.itmis.labourMigration.entity.LabourMigrationIndicator;
import com.pcs.itmis.labourMigration.model.ResponseMessage;
import com.pcs.itmis.labourMigration.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.labourMigration.service.LabourMigrationIndicatorService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/indicator")
@Slf4j
public class LabourMigrationIndicatorController {

	@Autowired
	private LabourMigrationIndicatorService indicatorService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody LabourMigrationIndicator labourMigration) {
		log.info("Inside save LabourMigrationIndicator details");
		indicatorService.save(labourMigration);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{fiscalYear}")
	public LabourMigrationIndicator getDataByFiscalYear(@PathVariable("fiscalYear") String fiscalYear) {
		log.info("Inside get LabourMigrationIndicator details");
		return indicatorService.getDataByFiscalYearAndOrganization(fiscalYear);
	}

	@GetMapping("/{fiscalYear}/{quarter}")
	public LabourMigrationIndicator getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter) {
		log.info("Inside get ChildHome details");
		return indicatorService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
	}

	@GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
	public LabourMigrationIndicator getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter, @PathVariable("organizationId") Long organizationId) {
		return indicatorService.getDataByOrganization(fiscalYear, quarter, organizationId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody LabourMigrationIndicator labourMigration) {
		log.info("Inside edit LabourMigrationIndicator details");
		indicatorService.update(labourMigration);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of LabourMigrationIndicator COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, indicatorService.getLastSynnchronizedDate()));
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
		log.info("Inside  getLastSynnchronizedDate   of LabourMigrationIndicator COntroller");
		try {

			return ResponseEntity.ok().body(
					new ResponseMessage(ResponseMsg.success, indicatorService.getAllDataFromTo(fromDate, toDate)));
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
		log.info("Inside edit LabourMigrationIndicator details");

		try {
			indicatorService.updateSynchronizedDate(fromDate, toDate);

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
	public ResponseEntity<?> revertData(@RequestBody LabourMigrationIndicator nDetails) {
		log.info("Inside revert childrenService details");
		indicatorService.revertData(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
