package com.pcs.itmis.report.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportParam {
	private String fiscalYear;
	private String quarter;
	private String provinceId;
	private String districtId;
	private String localLevelId;
	private LocalDate fromDate;
	private LocalDate toDate;
}
