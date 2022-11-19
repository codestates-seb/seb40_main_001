package com.ilchinjo.mainproject.domain.address.service;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.address.entity.Address;

import java.util.List;

public interface AddressService {
    List<AddressResponseDto> findAddresses();

    Address findVerifiedAddress(Long addressId);
}
