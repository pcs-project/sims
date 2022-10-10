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

import com.pcs.itmis.socialService.entity.OldAgeHomeCase;
import com.pcs.itmis.socialService.entity.ShelterHomeCase;
import com.pcs.itmis.socialService.service.ShelterHomeCaseService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/social-service/shelter-home")
@Slf4j
public class ShelterHomeCaseController {

	@Autowired
	private ShelterHomeCaseService shelterHomeCaseService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody ShelterHomeCase details) {
		try {
			shelterHomeCaseService.save(details);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(HttpStatus.OK);
	}

	@GetMapping("/")
	public List<ShelterHomeCase> getAllList() {
		log.info("Inside get all list");
		return shelterHomeCaseService.getAllList();
	}

	@GetMapping("/list-by-organization")
	public List<ShelterHomeCase> getAllListByOrganization() {
		log.info("Inside get all list by organization");
		return shelterHomeCaseService.getAllListByOrganization();
	}

	@GetMapping("/{shelterHomeCaseId}")
	public ShelterHomeCase getById(@PathVariable("shelterHomeCaseId") Long shelterHomeCaseId) {
		log.info("Inside get ShelterHomeCaseId details");
		return shelterHomeCaseService.getById(shelterHomeCaseId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody ShelterHomeCase details) {
		log.info("Inside edit ShelterHomeCase details");
		shelterHomeCaseService.update(details);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
