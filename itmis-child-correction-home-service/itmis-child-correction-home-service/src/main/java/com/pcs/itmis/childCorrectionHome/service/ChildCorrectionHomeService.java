package com.pcs.itmis.childCorrectionHome.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.childCorrectionHome.entity.ChildCorrectionHome;
import com.pcs.itmis.childCorrectionHome.model.Organization;
import com.pcs.itmis.childCorrectionHome.repository.ChildCorrectionHomeRepository;
import com.pcs.itmis.childCorrectionHome.utils.LoggedUserDetails;

@Service
public class ChildCorrectionHomeService {

  @Autowired
  private ChildCorrectionHomeRepository childCorrectionHomeRepository;

  @Autowired
  private SecurityService securityService;
  
  public void save(ChildCorrectionHome childCorrectionHome) {
    childCorrectionHome.setEntryBy(LoggedUserDetails.getLoggedUser());
    Organization organization = null;
    try {
      organization = securityService.getOrganizationOfLogInUser();
    } catch (Exception e) {
      e.printStackTrace();
    }
    childCorrectionHome.setUserOrganization(organization.getOrganizationId());
    childCorrectionHome.setEntryDate(new Date());
    childCorrectionHomeRepository.save(childCorrectionHome);
  }

  public ChildCorrectionHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter) {
    Organization organization = null;
    try {
      organization = securityService.getOrganizationOfLogInUser();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return childCorrectionHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear,
        quarter,organization.getOrganizationId());
  }

  public void update(ChildCorrectionHome nDetails) {
    ChildCorrectionHome oDetails = Optional.ofNullable(childCorrectionHomeRepository
        .findById(nDetails.getChildCorrectionHomeId()))
      .orElseThrow(() -> new RuntimeException("Details Not Found")).get();
    
    oDetails.setEntryBy(LoggedUserDetails.getLoggedUser());
    oDetails.setEntryDate(new Date());
    oDetails.copyData(nDetails);
    childCorrectionHomeRepository.save(oDetails);
  }

  public ChildCorrectionHome getDataByOrganization(String fiscalYear, String quarter, Long organization) {
    return childCorrectionHomeRepository.getDataByFiscalYearAndQuarter(fiscalYear,
        quarter,organization);
  }
}
