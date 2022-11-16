package com.ilchinjo.mainproject.domain.address.service;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.address.entity.Address;
import com.ilchinjo.mainproject.domain.address.mapper.AddressMapper;
import com.ilchinjo.mainproject.domain.address.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
    private final AddressRepository addressRepository;
    private final AddressMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<AddressResponseDto> findAllAddress() {
        return mapper.entitiesToResponseDtoList(addressRepository.findAll());
    }
}
