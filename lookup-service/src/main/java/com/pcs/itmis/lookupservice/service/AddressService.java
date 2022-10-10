package com.pcs.itmis.lookupservice.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.lookupservice.entity.LookupDistrict;
import com.pcs.itmis.lookupservice.entity.LookupMunicipality;
import com.pcs.itmis.lookupservice.entity.LookupProvince;
import com.pcs.itmis.lookupservice.repository.DistrictRepository;
import com.pcs.itmis.lookupservice.repository.MunicipalityRepository;
import com.pcs.itmis.lookupservice.repository.ProvinceRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AddressService {
	
	@Autowired
	private ProvinceRepository provinceRepository;
	
	@Autowired
	private DistrictRepository districtRepository;
	
	@Autowired
	private MunicipalityRepository  municipalityRepository;

	public List<LookupProvince> findAllProvince() {
		log.info("inside findAllProvince method of AddressService");
		return provinceRepository.findAll();
	}

	public List<LookupDistrict> findAllDistrictByProvinceCd(int provinceCd) {
		log.info("inside findAllDistrictByProvinceCd method of AddressService");
		return districtRepository.findByProvinceId(provinceCd);
	}

	public List<LookupMunicipality> findAllMunicipalitiesByDistrictId(int districtId) {
		log.info("inside findAllMunicipalitiesByDistrictId method of AddressService");
		return municipalityRepository.findByDistrictId(districtId);
	}

	public LookupProvince getProvinceById(int provinceId) {
		log.info("inside getProvinceById method of AddressService");
		return provinceRepository.findById(provinceId);
	}

	public LookupDistrict getDistrictBYDistrictCdAndProvinceCd(int provinceCd, int districtCd) {
		log.info("inside getDistrictBYDistrictCdAndProvinceCd method of AddressService");
		return districtRepository.findByIdAndProvinceId(districtCd, provinceCd);
	}

	public String getAddress(String province,String district, String municipality, String ward) {
		log.info("inside getAddress method of AddressService");
		String fullAddress = districtRepository.findByIdAndProvinceId(Integer.valueOf(district), Integer.valueOf(province)).getDistrictDescEng().
				concat(","+municipalityRepository.findByIdAndDistrictId(Integer.valueOf(municipality),Integer.valueOf(district)).getMunicipalityDescEng() + "-" +ward);
		
		return fullAddress;
	}

	public String getFullAddress(int provinceCd,int districtCd, int municipalityCd, int wardNo) {
		log.info("inside getAddress method of AddressService");
		// String fullAddress = wardNo + "-" + 
		String fullAddress =
		municipalityRepository.findByIdAndDistrictId(Integer.valueOf(municipalityCd),Integer.valueOf(districtCd)).getMunicipalityDescEng().
		concat(", " + districtRepository.findByIdAndProvinceId(Integer.valueOf(districtCd), Integer.valueOf(provinceCd)).getDistrictDescEng() + ", " +
		provinceRepository.findById(provinceCd).getProvinceDescEng());
		
		return fullAddress;
	}
	
	public String getFullAddressNep(int provinceCd,int districtCd, int municipalityCd, int wardNo) {
		log.info("inside getFullAddressNep method of AddressService");
		// String fullAddress = wardNo + "-" + 
		String fullAddress =
		municipalityRepository.findByIdAndDistrictId(Integer.valueOf(municipalityCd),Integer.valueOf(districtCd)).getMunicipalityDescNep().
		concat(", " + districtRepository.findByIdAndProvinceId(Integer.valueOf(districtCd), Integer.valueOf(provinceCd)).getDistrictDescNep() + ", " +
		provinceRepository.findById(provinceCd).getProvinceDescNep());
		
		return fullAddress;
	}


	public List<LookupDistrict> findAllDistricts() {
		log.info("inside findAllDistricts method of AddressService");
		return districtRepository.findAll();
	}

	public Integer getTotalWard(Integer municipalityId) {
		log.info("inside getTotalWard method of AddressService");
		return municipalityRepository.getTotalWard(municipalityId);
	}

}
