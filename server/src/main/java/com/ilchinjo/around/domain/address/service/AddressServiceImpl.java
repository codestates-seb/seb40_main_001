package com.ilchinjo.around.domain.address.service;

import com.ilchinjo.around.domain.address.dto.AddressResponseDto;
import com.ilchinjo.around.domain.address.mapper.AddressMapper;
import com.ilchinjo.around.domain.address.repository.AddressRepository;
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
    public List<AddressResponseDto> findAddresses() {
        return mapper.entitiesToResponseDtoList(addressRepository.findAll());
    }
}
