package com.pcs.itmis.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReportEntity {
  @Id
  private Long id;
  private String fiscalYear;
  private String provinceId;
  private String provinceDescEng;
}
