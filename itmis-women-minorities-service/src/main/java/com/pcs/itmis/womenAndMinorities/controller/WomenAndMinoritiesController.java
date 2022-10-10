package com.pcs.itmis.womenAndMinorities.controller;

import java.time.LocalDate;

import javax.validation.Valid;

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

import com.pcs.itmis.womenAndMinorities.entity.WomenAndMinorities;
import com.pcs.itmis.womenAndMinorities.model.ResponseMessage;
import com.pcs.itmis.womenAndMinorities.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.womenAndMinorities.service.WomenAndMinoritiesService;
import com.pcs.itmis.womenAndMinorities.utils.Success;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/women-and-minorities")
@Slf4j
public class WomenAndMinoritiesController {

	@Autowired
	private WomenAndMinoritiesService womenAndMinoritiesService;

	// To save women and minorities detail
	@PostMapping("/")
	public ResponseEntity<?> save(@Valid @RequestBody WomenAndMinorities womenAndMinorities) {
		log.info("Inside women and minorities details save  " + womenAndMinorities.getWomenLiteracyRate());
		try {
			womenAndMinoritiesService.save(womenAndMinorities);
			log.info("inside saveUser Controller");
			return ResponseEntity.ok().body(new Success());
		} catch (Exception e) {
			log.info("inside saveUser Controller"+e.getLocalizedMessage());
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// To get women and minorities of particular fiscal year
	@GetMapping("/{fiscalYear}")
	public WomenAndMinorities getDataByFiscalYear(@PathVariable("fiscalYear") String fiscalYear) {
		return womenAndMinoritiesService.getDataByFiscalYearAndOrganization(fiscalYear);
	}

	// To get women and minorities of particular fiscal year and quarter
	@GetMapping("/{fiscalYear}/{quarter}")
	public WomenAndMinorities getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter) {
		log.info("Inside get ChildHome details");
		return womenAndMinoritiesService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
	}

	// To get women and minorities list of particular fiscal year and organization
	// selected
	@GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
	public WomenAndMinorities getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter, @PathVariable("organizationId") Long organizationId) {
		return womenAndMinoritiesService.getDataByOrganization(fiscalYear, quarter, organizationId);
	}

	// To update women and minorities detail
	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody WomenAndMinorities womenAndMinorities) {
		log.info("Inside edit womenAndMinorities details");
		womenAndMinoritiesService.update(womenAndMinorities);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// To revert data
	@PutMapping("/revert")
	public ResponseEntity<?> revertData(@RequestBody WomenAndMinorities womenAndMinorities) {
		log.info("Inside revert womenAndMinorities details");
		womenAndMinoritiesService.revertData(womenAndMinorities);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of Disabled COntroller");
		try {

			return ResponseEntity.ok().body(
					new ResponseMessage(ResponseMsg.success, womenAndMinoritiesService.getLastSynnchronizedDate()));
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

			return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success,
					womenAndMinoritiesService.getAllDataFromTo(fromDate, toDate)));
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
			womenAndMinoritiesService.updateSynchronizedDate(fromDate, toDate);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
	}
}
