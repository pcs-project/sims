package com.pcs.itmis.humanTrafficking.controller;

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

import com.pcs.itmis.humanTrafficking.entity.SewaKendra;
import com.pcs.itmis.humanTrafficking.model.ResponseMessage;
import com.pcs.itmis.humanTrafficking.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.humanTrafficking.service.SewaKendraService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/sewa-kendra")
@Slf4j
public class SewaKendraController {

	@Autowired
	private SewaKendraService sewaKendraService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody SewaKendra SewaKendra) {
		log.info("Inside save SewaKendra details");
		sewaKendraService.save(SewaKendra);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{fiscalYear}/{quarter}")
	public SewaKendra getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter) {
		log.info("Inside get SewaKendra details");
		return sewaKendraService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
	}

	@GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
	public SewaKendra getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter, @PathVariable("organizationId") Long organizationId) {
		log.info("Inside get SewaKendra details");
		return sewaKendraService.getDataByOrganization(fiscalYear, quarter, organizationId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody SewaKendra nDetails) {
		log.info("Inside edit SewaKendra details");
		sewaKendraService.update(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, sewaKendraService.getLastSynnchronizedDate()));
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
					new ResponseMessage(ResponseMsg.success, sewaKendraService.getAllDataFromTo(fromDate, toDate)));
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
			sewaKendraService.updateSynchronizedDate(fromDate, toDate);

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
	public ResponseEntity<?> revertData(@RequestBody SewaKendra nDetails) {
		log.info("Inside revert sewaKendraService details");
		sewaKendraService.revertData(nDetails);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
