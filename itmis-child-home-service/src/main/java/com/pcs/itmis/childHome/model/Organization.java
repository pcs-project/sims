package com.pcs.itmis.childHome.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Organization {
  private Long organizationId;

  private String dpId;

  private String name;

  private String address;

  private Long parentId;

  private String status;

  private Boolean hasBranch;

  private LocalDateTime entryDate;

  private String entryBy;

  private String organizationType;
}
