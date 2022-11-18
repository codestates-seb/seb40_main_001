package com.ilchinjo.around.domain.address.service;

import com.ilchinjo.around.domain.address.dto.AddressResponseDto;

import java.util.List;

public interface AddressService {
    List<AddressResponseDto> findAddresses();
}
