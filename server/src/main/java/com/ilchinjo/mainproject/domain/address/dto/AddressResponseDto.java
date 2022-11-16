package com.ilchinjo.mainproject.domain.address.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressResponseDto {
    private Long addressId;
    private String sido;
    private String sigungu;
    private String bname;
}
