package com.ilchinjo.mainproject.domain.address.mapper;

import com.ilchinjo.mainproject.domain.address.dto.AddressResponseDto;
import com.ilchinjo.mainproject.domain.address.entity.Address;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    List<AddressResponseDto> entitiesToResponseDtoList(List<Address> addresses);
}
