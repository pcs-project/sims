package com.pcs.itmis.lookupservice.controller;

import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.lookupservice.service.AddressService;
import com.pcs.itmis.lookupservice.utils.ResponseMessage;
import com.pcs.itmis.lookupservice.utils.Success;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("/address")
@Slf4j
public class AddressLookupController {
	
	@Autowired
	private AddressService addressService;
	
	
	//Get All the Provinces
	@GetMapping("/provinces/")
	public ResponseEntity<?> findAllProvinces() {
		log.info("inside findAllProvinces method of AddressLookupController");
		try {
			return ResponseEntity.ok().body(new Success(addressService.findAllProvince()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//Get All Districts from ProvinceId
	@GetMapping("/districts/{provinceCd}")
	public ResponseEntity<?> findAllDistrictByProvinceCd(@PathVariable("provinceCd") int provinceCd) {
		log.info("inside findAllDistrictByProvinceCd method of AddressLookupController");
		try {
			return ResponseEntity.ok().body(new Success(addressService.findAllDistrictByProvinceCd(provinceCd)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//Get All Municipalities from DistrictId
	@GetMapping("/municipalities/{districtId}")
	public ResponseEntity<?> findAllMunicipalitiesByDistrictId(@PathVariable("districtId") int districtId) {
		log.info("inside findAllMunicipalitiesByDistrictId method of AddressLookupController");
		try {
			return ResponseEntity.ok().body(new Success(addressService.findAllMunicipalitiesByDistrictId(districtId)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//Get Province Details from Province Id
	@GetMapping("/province/{provinceId}")
	public ResponseEntity<?> getProvinceById(@PathVariable("provinceId") int provinceId) {
		log.info("inside getProvinceById method of AddressLookupController");
		
		try {
			return ResponseEntity.ok().body(new Success(addressService.getProvinceById(provinceId)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//Get District from ProvinceCd and DistrictCd
	@GetMapping("/districts/{provinceCd}/{districtCd}")
	public ResponseEntity<?> getDistrictBYDistrictCdAndProvinceCd(@PathVariable("provinceCd") int provinceCd,
			@PathVariable("districtCd") int districtCd) {
		log.info("inside getDistrictBYDistrictCdAndProvinceCd method of AddressLookupController");
		
		try {
			return ResponseEntity.ok().body(new Success(addressService.getDistrictBYDistrictCdAndProvinceCd(provinceCd,districtCd)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	// Get full concatenated Address  Eng
	@GetMapping("/full-address-eng/{provinceCd}/{districtCd}/{municipalityCd}/{wardNo}")
	public ResponseEntity<?> getFullAddress(@PathVariable("provinceCd") int provinceCd,@PathVariable("districtCd") int districtCd,
			@PathVariable("municipalityCd") int municipalityCd,@PathVariable("wardNo") int wardNo) {
		log.info("inside getFullAddress method of AddressLookupController");
		
		try {
			return ResponseEntity.ok().body(new Success(addressService.getFullAddress(provinceCd,districtCd,municipalityCd,wardNo)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// Get full concatenated Address  Nep
		@GetMapping("/full-address-nep/{provinceCd}/{districtCd}/{municipalityCd}/{wardNo}")
		public ResponseEntity<?> getFullAddressNep(@PathVariable("provinceCd") int provinceCd,@PathVariable("districtCd") int districtCd,
				@PathVariable("municipalityCd") int municipalityCd,@PathVariable("wardNo") int wardNo) {
			log.info("inside getFullAddressNep method of AddressLookupController");
			
			try {
				return ResponseEntity.ok().body(new Success(addressService.getFullAddressNep(provinceCd,districtCd,municipalityCd,wardNo)));
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<ResponseMessage>(
						new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		
	//Get All Districts
	@GetMapping("/districts/")
	public ResponseEntity<?> findAllDistricts() {
		log.info("inside findAllDistricts method of AddressLookupController");
		
		try {
			return ResponseEntity.ok().body(new Success(addressService.findAllDistricts()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	//Get total No of Wards By MunicipalityId
	@GetMapping("/wards/{municipalityId}")
	public ResponseEntity<?> getTotalWard(@PathVariable("municipalityId") Integer municipalityId) {
		log.info("inside getTotalWard method of AddressLookupController");
		
		try {
			return ResponseEntity.ok().body(new Success(addressService.getTotalWard(municipalityId)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

}
