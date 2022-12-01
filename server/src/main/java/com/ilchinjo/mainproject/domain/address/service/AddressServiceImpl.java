package com.ilchinjo.mainproject.domain.address.service;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.address.mapper.AddressMapper;
import com.ilchinjo.mainproject.domain.address.repository.AddressRepository;
import com.ilchinjo.mainproject.global.exception.BusinessLogicException;
import com.ilchinjo.mainproject.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final AddressMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<AddressResponseDto> findAddresses() {
        return mapper.entitiesToResponseDtoList(addressRepository.findAllAddressDistinct());
    }

    @Override
    public Address findVerifiedAddress(Long addressId) {
        return addressRepository.findById(addressId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND)
        );
    }
}
